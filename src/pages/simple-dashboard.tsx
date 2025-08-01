import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';

export default function SimpleDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  console.log('SimpleDashboard - user:', user, 'isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Please wait while we load your dashboard.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not Authenticated</h1>
          <Button onClick={() => setLocation('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Nebusis® Dashboard</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome, {user?.username || 'User'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You are successfully logged in as: {user?.username}
            </p>
            <p className="text-gray-600">
              Role: {user?.role}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Access your business applications</p>
              <Button onClick={() => setLocation('/portal')}>
                Open Portal
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage system settings</p>
              <Button onClick={() => setLocation('/admin')}>
                Open Admin
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employee Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Access employee resources</p>
              <Button onClick={() => setLocation('/employee')}>
                Open Employee Portal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}