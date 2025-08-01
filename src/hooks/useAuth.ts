import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  permissions: string[];
  lastLogin: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface PortalAccess {
  canAccessAdmin: boolean;
  canAccessCustomer: boolean;
  canAccessPartner: boolean;
  canAccessInvestor: boolean;
  canAccessEmployee: boolean;
  canAccessPeopleCore: boolean;
  canAccessAllPortals: boolean;
}

export interface AuthData {
  user: User;
  portals: PortalAccess;
}

export function useAuth() {
  const { data, isLoading, error } = useQuery<AuthData>({
    queryKey: ["/api/auth/me"],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    queryFn: async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/auth/me", {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) {
          throw new Error("Not authenticated");
        }
        return response.json();
      } catch (error) {
        throw error;
      }
    }
  });

  return {
    user: data?.user,
    portals: data?.portals,
    isLoading,
    isAuthenticated: !!data?.user,
    error,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Store token in localStorage for future requests
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
      }
      queryClient.setQueryData(["/api/auth/me"], data);
      toast({
        title: "Welcome to Nebusis®",
        description: "You are now signed in. Redirecting to dashboard...",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Logout failed");
      }
      
      return response.json();
    },
    onSuccess: () => {
      localStorage.removeItem("auth_token"); // Remove token from localStorage
      queryClient.setQueryData(["/api/auth/me"], null);
      queryClient.clear(); // Clear all cached data
      toast({
        title: "Success", 
        description: "Logged out successfully",
      });
      // Stay on main website after logout
      window.location.href = "/";
    },
    onError: (error: any) => {
      localStorage.removeItem("auth_token"); // Remove token even on error
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function usePortalAccess(portalName: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/auth/portal", portalName],
    retry: false,
    enabled: !!portalName,
    queryFn: async () => {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`/api/auth/portal/${portalName}`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      
      if (!response.ok) {
        return { hasAccess: false, user: null };
      }
      
      return response.json();
    }
  });

  return {
    hasAccess: data?.hasAccess || false,
    user: data?.user,
    isLoading,
  };
}