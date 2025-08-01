import { ReactNode } from "react";
import { useAuth, usePortalAccess } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

interface PortalGuardProps {
  portalName: string;
  children: ReactNode;
}

export function PortalGuard({ portalName, children }: PortalGuardProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { hasAccess, isLoading: accessLoading } = usePortalAccess(portalName);
  const [, setLocation] = useLocation();

  if (authLoading || accessLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600 dark:text-gray-400">Verifying access...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <CardTitle className="text-xl">Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              You need to sign in to access this portal.
            </p>
            <Button onClick={() => setLocation("/login")} className="w-full">
              <ArrowRight className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto text-red-600 mb-4" />
            <CardTitle className="text-xl">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              You don't have permission to access this portal.
            </p>
            <Button onClick={() => setLocation("/dashboard")} variant="outline" className="w-full">
              <ArrowRight className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}