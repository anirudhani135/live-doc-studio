
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, Zap, Users } from 'lucide-react';

interface MetricsCardsProps {
  metrics: {
    totalProjects: number;
    aiInteractions: number;
    timeSaved: number;
    tokensUsed: number;
  };
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Total Projects',
      value: metrics.totalProjects,
      description: 'Projects created',
      icon: Users,
      trend: '+12%'
    },
    {
      title: 'AI Interactions',
      value: metrics.aiInteractions,
      description: 'AI requests processed',
      icon: Zap,
      trend: '+8%'
    },
    {
      title: 'Time Saved',
      value: `${metrics.timeSaved.toFixed(1)}h`,
      description: 'Development time saved',
      icon: Clock,
      trend: '+15%'
    },
    {
      title: 'Tokens Used',
      value: metrics.tokensUsed.toLocaleString(),
      description: 'AI tokens consumed',
      icon: TrendingUp,
      trend: '+5%'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{card.trend}</span> from last month
            </p>
            <CardDescription className="text-xs mt-1">
              {card.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
