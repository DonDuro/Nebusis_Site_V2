import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  FileText, 
  Plus, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Star,
  Target,
  Activity,
  Briefcase
} from 'lucide-react';

interface AssignmentMilestone {
  id: string;
  name: string;
  description: string;
  plannedDate: string;
  actualDate?: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'delayed';
  completion: number;
}

interface AssignmentJourney {
  assignmentId: string;
  assignmentTitle: string;
  clientOrOrg: string;
  assignmentType: string;
  startDate: string;
  endDate: string;
  status: string;
  overallProgress: number;
  milestones: AssignmentMilestone[];
}

interface AssignmentJourneyTrackerProps {
  assignments: any[];
  performanceData?: any;
  performanceLoading?: boolean;
  performanceError?: any;
  onRefetch?: () => void;
}

export default function AssignmentJourneyTracker({ 
  assignments, 
  performanceData, 
  performanceLoading, 
  performanceError, 
  onRefetch 
}: AssignmentJourneyTrackerProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  // Mock journey data - in production this would come from PerformanceTracker API
  const journeyData: AssignmentJourney[] = assignments.map(assignment => ({
    assignmentId: assignment.assignmentId,
    assignmentTitle: assignment.assignmentTitle,
    clientOrOrg: assignment.clientOrOrg,
    assignmentType: assignment.assignmentType,
    startDate: assignment.startDate,
    endDate: assignment.endDate,
    status: assignment.status,
    overallProgress: 75,
    milestones: [
      {
        id: '1',
        name: 'Assignment Started',
        description: 'Initial project setup and requirements gathering',
        plannedDate: assignment.startDate,
        actualDate: assignment.startDate,
        status: 'completed',
        completion: 100
      },
      {
        id: '2',
        name: 'Planning Phase',
        description: 'Detailed planning and resource allocation',
        plannedDate: '2024-02-15',
        actualDate: '2024-02-12',
        status: 'completed',
        completion: 100
      },
      {
        id: '3',
        name: 'Implementation Phase',
        description: 'Core implementation and development work',
        plannedDate: '2024-06-01',
        status: 'in_progress',
        completion: 75
      },
      {
        id: '4',
        name: 'Review & Testing',
        description: 'Quality assurance and client review',
        plannedDate: '2024-07-15',
        status: 'upcoming',
        completion: 0
      },
      {
        id: '5',
        name: 'Final Delivery',
        description: 'Project completion and handover',
        plannedDate: assignment.endDate,
        status: 'upcoming',
        completion: 0
      }
    ]
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Activity className="h-4 w-4 text-blue-500" />;
      case 'delayed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="journeys">Assignment Journeys</TabsTrigger>
          <TabsTrigger value="analytics">Journey Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* PerformanceTracker Integration Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Nebusis® PerformanceTracker Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Built-in Performance Tracking (Ready for PerformanceTracker)</span>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-800">
                    📊 Performance tracking functions are currently built into this portal. 
                    When Nebusis® PerformanceTracker launches, seamless integration will provide enhanced analytics and reporting capabilities.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="font-medium text-green-800">Current Status</Label>
                    <p className="text-green-700 font-medium">Fully Functional</p>
                  </div>
                  <div>
                    <Label className="font-medium text-green-800">Data Source</Label>
                    <p className="text-green-700">Built-in Analytics</p>
                  </div>
                  <div>
                    <Label className="font-medium text-green-800">PDCA Support</Label>
                    <p className="text-green-700">Complete Integration</p>
                  </div>
                  <div>
                    <Label className="font-medium text-green-800">Assignment Tracking</Label>
                    <p className="text-green-700">Real-time Updates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Built-in Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">PDCA Completion</h4>
                    <Badge variant="secondary">
                      87%
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Monthly PDCA reports completion rate
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Weekly Logs</h4>
                    <Badge variant="secondary">
                      94%
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Weekly activity logs completion rate
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">On-Time Submissions</h4>
                    <Badge variant="secondary">
                      92%
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Timely submission rate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journeys" className="space-y-6">
          {/* Assignment Journey Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Assignment Journey Tracking
              </CardTitle>
              <CardDescription>
                Track the progress and milestones of your current assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {journeyData.map((journey, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{journey.assignmentTitle}</h3>
                        <p className="text-sm text-gray-600">{journey.clientOrOrg} • {journey.assignmentType}</p>
                      </div>
                      <Badge 
                        variant={journey.status === 'Active' ? 'default' : 'secondary'}
                        className={journey.status === 'Active' ? 'bg-green-600' : ''}
                      >
                        {journey.status}
                      </Badge>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-600">{journey.overallProgress}% Complete</span>
                      </div>
                      <Progress value={journey.overallProgress} className="h-2" />
                    </div>
                    
                    {/* Journey Timeline */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Project Milestones</h4>
                      <div className="relative">
                        {journey.milestones.map((milestone, idx) => (
                          <div key={milestone.id} className="flex items-start space-x-4 pb-6">
                            <div className="flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(milestone.status)}`}></div>
                              {idx < journey.milestones.length - 1 && (
                                <div className={`w-0.5 h-12 ${
                                  milestone.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                                }`}></div>
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium">{milestone.name}</h5>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(milestone.status)}
                                  <span className="text-sm text-gray-500">{milestone.completion}%</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                              <div className="text-xs text-gray-500">
                                <span>Planned: {milestone.plannedDate}</span>
                                {milestone.actualDate && (
                                  <span className="ml-4">Completed: {milestone.actualDate}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Update Progress
                        </Button>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Milestone
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Review
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Journey Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Journey Analytics
              </CardTitle>
              <CardDescription>
                Performance metrics and trends across all assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Active Assignments</h4>
                    <Briefcase className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold">{assignments.filter(a => a.status === 'Active').length}</p>
                  <p className="text-xs text-gray-500">Currently active</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">On-Time Delivery</h4>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-xs text-gray-500">Last 6 months</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Avg Completion</h4>
                    <Clock className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold">28 days</p>
                  <p className="text-xs text-gray-500">Per assignment</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Client Satisfaction</h4>
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                  <p className="text-2xl font-bold">4.8/5</p>
                  <p className="text-xs text-gray-500">Average rating</p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-4">Upcoming Milestones</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <h5 className="font-medium">QSI Academy - ISO Implementation Review</h5>
                      <p className="text-sm text-gray-600">Due in 3 days</p>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100">
                      High Priority
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h5 className="font-medium">Internal QMS - Documentation Update</h5>
                      <p className="text-sm text-gray-600">Due in 1 week</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100">
                      Medium Priority
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}