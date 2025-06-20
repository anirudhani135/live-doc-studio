
interface ErrorLog {
  error: Error;
  context: string;
  userId?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  additionalData?: any;
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errorQueue: ErrorLog[] = [];
  private isOnline = navigator.onLine;

  private constructor() {
    this.setupGlobalErrorHandlers();
    this.setupOnlineStatusListener();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalErrorHandlers() {
    // Handle unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError(new Error(event.message), 'global_error', {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError(
        new Error(event.reason?.message || 'Unhandled Promise Rejection'),
        'unhandled_promise_rejection',
        { reason: event.reason }
      );
    });
  }

  private setupOnlineStatusListener() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushErrorQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  public async logError(
    error: Error,
    context: string,
    additionalData?: any,
    userId?: string
  ) {
    const errorLog: ErrorLog = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      } as Error,
      context,
      userId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      additionalData
    };

    // Log to console for development
    console.error(`[${context}]`, error, additionalData);

    // Queue error for sending to server
    this.errorQueue.push(errorLog);

    // Try to send immediately if online
    if (this.isOnline) {
      await this.flushErrorQueue();
    }
  }

  private async flushErrorQueue() {
    if (this.errorQueue.length === 0) return;

    try {
      // Send errors to Supabase Edge Function for logging
      const response = await fetch('/api/log-errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ errors: this.errorQueue })
      });

      if (response.ok) {
        this.errorQueue = [];
      }
    } catch (error) {
      console.error('Failed to send error logs:', error);
    }
  }

  public async logPerformanceMetric(name: string, value: number, context?: string) {
    try {
      // Log performance metrics
      const perfLog = {
        metric_name: name,
        value,
        context,
        timestamp: new Date().toISOString(),
        url: window.location.href
      };

      console.log(`[Performance] ${name}: ${value}ms`, context);
      
      // Send to analytics
      if (this.isOnline) {
        await fetch('/api/log-performance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(perfLog)
        });
      }
    } catch (error) {
      console.error('Failed to log performance metric:', error);
    }
  }

  public createErrorBoundary() {
    return (error: Error, errorInfo: any) => {
      this.logError(error, 'react_error_boundary', errorInfo);
    };
  }
}

export const errorHandler = ErrorHandler.getInstance();

// Utility functions for common error scenarios
export const handleAPIError = (error: any, context: string) => {
  errorHandler.logError(
    error instanceof Error ? error : new Error(String(error)),
    `api_error_${context}`,
    {
      status: error?.status,
      statusText: error?.statusText,
      response: error?.response
    }
  );
};

export const handleFormError = (error: any, formName: string, formData?: any) => {
  errorHandler.logError(
    error instanceof Error ? error : new Error(String(error)),
    `form_error_${formName}`,
    { formData }
  );
};

export const measurePerformance = async <T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> => {
  const startTime = performance.now();
  try {
    const result = await operation();
    const endTime = performance.now();
    errorHandler.logPerformanceMetric(operationName, endTime - startTime);
    return result;
  } catch (error) {
    const endTime = performance.now();
    errorHandler.logPerformanceMetric(`${operationName}_failed`, endTime - startTime);
    throw error;
  }
};
