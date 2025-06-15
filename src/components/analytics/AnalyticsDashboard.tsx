
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  FileText, 
  Code, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Download
} from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { useDocuments } from '@/hooks/useDocuments';

const AnalyticsDashboard = () => {
  const { projects } = useProjects();
  const { documents } = useDocuments();
  const [timeRange, setTimeRange] = useState('30');
  const [analytics, setAnalytics] = useState({
    timeSaved: 0,
    tokensUsed: 0,
    projectsCompleted: 0,
    documentsCovered: 0,
    teamProductivity: 0,
    aiAccuracy: 0
  });

  // Mock data for charts
  const productivityData = [
    { name: 'Week 1', projects: 4, documents: 12, time_saved: 8 },
    { name: 'Week 2', projects: 6, documents: 18, time_saved: 12 },
    { name: 'Week 3', projects: 8, documents: 24, time_saved: 16 },
    { name: 'Week 4', projects: 10, documents: 30, time_saved: 20 },
  ];

  const aiUsageData = [
    { name: 'GPT-4', value: 45, color: '#8884d8' },
    { name: 'Claude', value: 30, color: '#82ca9d' },
    { name: 'Gemini', value: 25, color: '#ffc658' },
  ];

  const documentTypeData = [
    { name: 'Specifications', count: 15 },
    { name: 'API Docs', count: 8 },
    { name: 'User Guides', count: 12 },
    { name: 'Architecture', count: 6 },
  ];

  useEffect(() => {
    // Calculate analytics based on real data
    const calculateAnalytics = () => {
      const completedProjects = projects.filter(p => p.status === 'completed').length;
      const totalDocuments = documents.length;
      
      // Mock calculations - in real app these would come from usage tracking
      setAnalytics({
        timeSaved: projects.length * 8.5, // Estimated 8.5 hours saved per project
        tokensUsed: projects.length * 15000, // Estimated tokens per project
        projectsCompleted: completedProjects,
        documentsCovered: totalDocuments,
        teamProductivity: Math.min(95, 60 + (projects.length * 2)), // Productivity score
        aiAccuracy: 98.2 // Mock AI accuracy score
      });
    };

    calculateAnalytics();
  }, [projects, documents]);

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue" }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-lg bg-${color}-100`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        </div>
        {trend && (
          <div className="mt-3 flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">{trend}</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your team's productivity and AI usage metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Time Saved"
          value={`${analytics.timeSaved.toFixed(1)}h`}
          subtitle="This month"
          icon={Clock}
          trend="+12%"
          color="green"
        />
        <MetricCard
          title="AI Tokens Used"
          value={analytics.tokensUsed.toLocaleString()}
          subtitle="Across all projects"
          icon={Zap}
          trend="+8%"
          color="blue"
        />
        <MetricCard
          title="Projects Completed"
          value={analytics.projectsCompleted}
          subtitle={`${projects.length} total projects`}
          icon={CheckCircle}
          trend="+15%"
          color="purple"
        />
        <MetricCard
          title="Documentation Coverage"
          value={`${Math.min(100, (analytics.documentsCovered / Math.max(1, projects.length) * 100)).toFixed(1)}%`}
          subtitle={`${analytics.documentsCovered} documents`}
          icon={FileText}
          trend="+5%"
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="time_saved" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Hours Saved"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Model Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={aiUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {aiUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={documentTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Team Productivity</span>
              <Badge variant="default">{analytics.teamProductivity}%</Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${analytics.teamProductivity}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Accuracy</span>
              <Badge variant="default">{analytics.aiAccuracy}%</Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${analytics.aiAccuracy}%` }}
              />
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>All systems operational</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span>2 pending reviews</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Productivity Boost</span>
              </div>
              <p className="text-sm text-blue-700">
                Your team is 23% more productive this month. Consider expanding AI usage to more projects.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 mb-2">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Quality Improvement</span>
              </div>
              <p className="text-sm text-green-700">
                Documentation quality scores are up 15%. Keep using AI assistance for content review.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800 mb-2">
                <Zap className="h-4 w-4" />
                <span className="font-medium">Optimization Opportunity</span>
              </div>
              <p className="text-sm text-yellow-700">
                Switch to GPT-4 for complex projects to improve accuracy and reduce revision time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
