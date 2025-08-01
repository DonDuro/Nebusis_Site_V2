import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth, useLogout } from "@/hooks/useAuth";
import { User, LogOut, Settings, Shield, Users, FolderOpen, TrendingUp, Building } from "lucide-react";
import { useLocation } from "wouter";

export function AdminNav() {
  const { user, portals } = useAuth();
  const logout = useLogout();
  const [, setLocation] = useLocation();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-4">
      {/* Portal Navigation - Only show if user has access to multiple portals or at least one other portal */}
      {(portals && (portals.canAccessAdmin || portals.canAccessEmployee || portals.canAccessPeopleCore || portals.canAccessPartner || portals.canAccessInvestor)) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <FolderOpen className="mr-2 h-4 w-4" />
              Access Portals
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {portals?.canAccessAdmin && (
              <DropdownMenuItem onClick={() => setLocation("/admin")}>
                <Shield className="mr-2 h-4 w-4" />
                Admin Dashboard
              </DropdownMenuItem>
            )}
            {portals?.canAccessCustomer && (
              <DropdownMenuItem onClick={() => setLocation("/portal")}>
                <Users className="mr-2 h-4 w-4" />
                Customer Portal
              </DropdownMenuItem>
            )}
            {portals?.canAccessEmployee && (
              <DropdownMenuItem onClick={() => setLocation("/employee")}>
                <User className="mr-2 h-4 w-4" />
                Employee Portal
              </DropdownMenuItem>
            )}
            {portals?.canAccessPeopleCore && (
              <DropdownMenuItem onClick={() => setLocation("/peoplecore")}>
                <Users className="mr-2 h-4 w-4" />
                PeopleCore Portal
              </DropdownMenuItem>
            )}
            {portals?.canAccessPartner && (
              <DropdownMenuItem onClick={() => setLocation("/partner")}>
                <Building className="mr-2 h-4 w-4" />
                Partner Portal
              </DropdownMenuItem>
            )}
            {portals?.canAccessInvestor && (
              <DropdownMenuItem onClick={() => setLocation("/investor")}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Investor Portal
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLocation("/")}>
              <Settings className="mr-2 h-4 w-4" />
              Main Website
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {/* If user only has customer access, show direct link to main website */}
      {portals && portals.canAccessCustomer && !portals.canAccessAdmin && !portals.canAccessEmployee && !portals.canAccessPeopleCore && !portals.canAccessPartner && !portals.canAccessInvestor && (
        <Button variant="outline" size="sm" onClick={() => setLocation("/")}>
          <Settings className="mr-2 h-4 w-4" />
          Main Website
        </Button>
      )}

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <User className="mr-2 h-4 w-4" />
            {user.username}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5 text-sm">
            <div className="font-medium">{user.username}</div>
            <div className="text-gray-500 text-xs">{user.email}</div>
            <div className="text-gray-400 text-xs capitalize">{user.role.replace('_', ' ')}</div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout.mutate()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}