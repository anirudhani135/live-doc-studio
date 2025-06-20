
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface SecurityStatusProps {
  riskLevel: 'low' | 'medium' | 'high';
  lastSecurityCheck: string;
  violations: string[];
}

const SecurityStatus: React.FC<SecurityStatusProps> = ({
  riskLevel,
  lastSecurityCheck,
  violations
}) => {
  const getStatusColor = (level: string) => {
    switch (level) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <Shield className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Status
        </CardTitle>
        <CardDescription>
          Current security assessment for your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Risk Level</span>
          <Badge variant={getStatusColor(riskLevel)} className="flex items-center gap-1">
            {getStatusIcon(riskLevel)}
            {riskLevel.toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Last Check</span>
          <span className="text-sm text-muted-foreground">{lastSecurityCheck}</span>
        </div>

        {violations.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Security Issues</span>
            <div className="space-y-1">
              {violations.map((violation, index) => (
                <div key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  {violation}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityStatus;
