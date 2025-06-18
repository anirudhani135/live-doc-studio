import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, FileText, Users, Sparkles, Plus, ArrowRight, Zap, CheckCircle } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { useDocuments } from '@/hooks/useDocuments';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
const Dashboard = () => {
  const {
    projects
  } = useProjects();
  const {
    documents
  } = useDocuments();
  const stats = {
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalDocuments: documents.length,
    timeSaved: projects.length * 8.5,
    // Estimated hours saved
    aiAccuracy: 98.2,
    teamMembers: 4 // Mock data
  };
  const recentProjects = projects.slice(0, 3);
  const recentDocuments = documents.slice(0, 4);
  return <div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          
          
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">{stats.totalProjects}</p>
                <p className="text-xs text-green-600 font-medium">
                  {stats.completedProjects} completed
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time Saved</p>
                <p className="text-2xl font-bold">{stats.timeSaved.toFixed(1)}h</p>
                <p className="text-xs text-green-600 font-medium">+23% this month</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold">{stats.totalDocuments}</p>
                <p className="text-xs text-blue-600 font-medium">95% coverage</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Accuracy</p>
                <p className="text-2xl font-bold">{stats.aiAccuracy}%</p>
                <p className="text-xs text-green-600 font-medium">Target: 98%+</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest project activity</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.length > 0 ? recentProjects.map(project => <div key={project.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-2">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description?.substring(0, 50)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>) : <div className="text-center py-8">
                <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-4">Create your first AI-powered project</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </div>}
          </CardContent>
        </Card>

        {/* Quick Actions & Recent Documents */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Project Wizard
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generate Docs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Invite Team
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentDocuments.length > 0 ? recentDocuments.map(doc => <div key={doc.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(doc.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>) : <p className="text-sm text-muted-foreground">No documents yet</p>}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>
            Detailed analytics and insights for your team's productivity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnalyticsDashboard />
        </CardContent>
      </Card>
    </div>;
};
export default Dashboard;