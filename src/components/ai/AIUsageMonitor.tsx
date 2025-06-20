
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Bot, TrendingUp, Zap } from 'lucide-react';

interface AIUsageMonitorProps {
  tokensUsed: number;
  tokenLimit: number;
  requestsToday: number;
  requestLimit: number;
}

const AIUsageMonitor: React.FC<AIUsageMonitorProps> = ({
  tokensUsed,
  tokenLimit,
  requestsToday,
  requestLimit
}) => {
  const [efficiency, setEfficiency] = useState(0);

  useEffect(() => {
    // Calculate efficiency based on token usage vs requests
    if (requestsToday > 0) {
      const avgTokensPerRequest = tokensUsed / requestsToday;
      const baselineTokens = 1500; // Average expected tokens per request
      const efficiencyScore = Math.max(0, 100 - ((avgTokensPerRequest - baselineTokens) / baselineTokens) * 100);
      setEfficiency(Math.min(100, efficiencyScore));
    }
  }, [tokensUsed, requestsToday]);

  const tokenUsagePercentage = (tokensUsed / tokenLimit) * 100;
  const requestUsagePercentage = (requestsToday / requestLimit) * 100;

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Usage Monitor
        </CardTitle>
        <CardDescription>
          Track your AI usage and optimize efficiency
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Tokens Used Today</span>
            <Badge variant="outline" className={getUsageColor(tokenUsagePercentage)}>
              {tokensUsed.toLocaleString()} / {tokenLimit.toLocaleString()}
            </Badge>
          </div>
          <Progress value={tokenUsagePercentage} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {tokenUsagePercentage.toFixed(1)}% of daily limit
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Requests Today</span>
            <Badge variant="outline" className={getUsageColor(requestUsagePercentage)}>
              {requestsToday} / {requestLimit}
            </Badge>
          </div>
          <Progress value={requestUsagePercentage} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {requestUsagePercentage.toFixed(1)}% of daily limit
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Efficiency Score
            </span>
            <Badge variant={efficiency >= 70 ? 'default' : 'secondary'}>
              {efficiency.toFixed(0)}%
            </Badge>
          </div>
          <Progress value={efficiency} className="h-2" />
          <div className="text-xs text-muted-foreground">
            Based on tokens per request ratio
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {Math.max(0, tokenLimit - tokensUsed).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Tokens Remaining</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {tokensUsed > 0 ? Math.round(tokensUsed / requestsToday) : 0}
              </div>
              <div className="text-xs text-muted-foreground">Avg Tokens/Request</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIUsageMonitor;
