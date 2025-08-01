import { useAuth, PortalAccess } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building, 
  TrendingUp, 
  Briefcase, 
  UserCheck, 
  Settings,
  ChevronRight,
  Shield,
  ExternalLink
} from 'lucide-react';

interface PortalCard {
  name: string;
  description: string;
  route: string;
  icon: any;
  color: string;
  accessKey: keyof PortalAccess;
  badge?: string;
}

export default function CommandDeckNavigation() {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const allPortals: PortalCard[] = [
    {
      name: "Customer Portal",
      description: "Manage your licensed applications and business services",
      route: "/portal",
      icon: Users,
      color: "bg-blue-500",
      accessKey: "canAccessCustomer",
      badge: user.email?.includes("@nebusis.com") ? "Self-Customer" : undefined
    },
    {
      name: "Partner Portal", 
      description: "Channel partner management and collaboration tools",
      route: "/partner",
      icon: Building,
      color: "bg-green-500",
      accessKey: "canAccessPartner"
    },
    {
      name: "Investor Portal",
      description: "Financial insights, reports, and growth metrics",
      route: "/investor", 
      icon: TrendingUp,
      color: "bg-purple-500",
      accessKey: "canAccessInvestor",
      badge: user.email === "calvarado@nebusis.com" ? "Owner-Investor" : undefined
    },
    {
      name: "Employee Portal",
      description: "Internal collaboration and assignment management",
      route: "/employee",
      icon: Briefcase,
      color: "bg-orange-500", 
      accessKey: "canAccessEmployee"
    },
    {
      name: "PeopleCore",
      description: "Comprehensive HR and personnel management platform",
      route: "/peoplecore",
      icon: UserCheck,
      color: "bg-teal-500",
      accessKey: "canAccessPeopleCore"
    },
    {
      name: "Admin Dashboard",
      description: "Platform administration and system management",
      route: "/admin",
      icon: Settings,
      color: "bg-red-500",
      accessKey: "canAccessAdmin",
      badge: user.role === "president" ? "Full Access" : undefined
    }
  ];

  // Filter portals based on user access - simplified access control
  const accessiblePortals = allPortals.filter(portal => {
    // For super admin or president role, allow access to all portals
    if (user.role === 'super_admin' || user.role === 'President & CEO') {
      return true;
    }
    // Check if user permissions include the portal access
    return user.permissions?.includes('all_portals') || user.permissions?.includes(portal.accessKey);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Command Deck
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Access your authorized portals and management tools
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {accessiblePortals.length} Portal{accessiblePortals.length !== 1 ? 's' : ''} Available
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessiblePortals.map((portal) => {
          const IconComponent = portal.icon;
          return (
            <Card 
              key={portal.name} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 group"
              onClick={() => window.location.href = portal.route}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg ${portal.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  {portal.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {portal.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                  {portal.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {portal.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-blue-50 group-hover:border-blue-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = portal.route;
                  }}
                >
                  Access Portal
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info for President/Owner */}
      {user.role === "president" && (
        <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-lg">Presidential Access</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              As President of Nebusis®, you have full access to all portals and administrative functions. 
              This includes customer access (as Nebusis is a customer of its own software) and investor access.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                Customer (Self-Service)
              </Badge>
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Investor (Owner)
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Settings className="h-3 w-3 mr-1" />
                Full Admin Rights
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions for Non-Admin Users */}
      {user.role !== "president" && user.role !== "super_admin" && (
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={() => window.open('/', '_blank')}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Main Website
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.open('/contact', '_blank')}>
            Contact Support
          </Button>
        </div>
      )}
    </div>
  );
}