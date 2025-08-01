import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  PerformanceTrackerUser, 
  PerformanceAnalytics, 
  TeamDashboard,
  PerformanceNotification,
  PerformanceTrackerResponse 
} from '@shared/performanceTracker';

// Custom hook for PerformanceTracker API integration
export function usePerformanceTracker() {
  const queryClient = useQueryClient();

  // Get current user profile from PerformanceTracker
  const useCurrentUser = () => {
    return useQuery<PerformanceTrackerResponse<PerformanceTrackerUser>>({
      queryKey: ['/api/performance-tracker/auth/user'],
      retry: false,
    });
  };

  // Get user performance analytics
  const useUserPerformance = (userId: string, enabled: boolean = true) => {
    return useQuery<PerformanceTrackerResponse<PerformanceAnalytics>>({
      queryKey: ['/api/performance-tracker/users', userId, 'performance'],
      enabled: !!userId && enabled,
      retry: false,
    });
  };

  // Get team dashboard for supervisors
  const useTeamDashboard = (supervisorId: string, enabled: boolean = true) => {
    return useQuery<PerformanceTrackerResponse<TeamDashboard>>({
      queryKey: ['/api/performance-tracker/teams', supervisorId, 'dashboard'],
      enabled: !!supervisorId && enabled,
      retry: false,
    });
  };

  // Get user notifications
  const useNotifications = (userId: string, enabled: boolean = true) => {
    return useQuery<PerformanceTrackerResponse<PerformanceNotification[]>>({
      queryKey: ['/api/performance-tracker/notifications', userId],
      enabled: !!userId && enabled,
      retry: false,
    });
  };

  // Health check for PerformanceTracker service
  const useHealthCheck = () => {
    return useQuery<PerformanceTrackerResponse<{ status: string; version: string }>>({
      queryKey: ['/api/performance-tracker/health'],
      retry: false,
    });
  };

  // Sync user data mutation
  const syncUserData = useMutation({
    mutationFn: async (userData: Partial<PerformanceTrackerUser>) => {
      return apiRequest('POST', '/api/performance-tracker/auth/sync', userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/performance-tracker/auth/user'] });
    },
  });

  // Mark notification as read
  const markNotificationRead = useMutation({
    mutationFn: async (notificationId: string) => {
      return apiRequest('PUT', `/api/performance-tracker/notifications/${notificationId}/read`);
    },
    onSuccess: (_, notificationId) => {
      queryClient.invalidateQueries({ queryKey: ['/api/performance-tracker/notifications'] });
    },
  });

  // Test connection to PerformanceTracker
  const testConnection = useMutation({
    mutationFn: async () => {
      return apiRequest('GET', '/api/performance-tracker/health');
    },
  });

  return {
    // Queries
    useCurrentUser,
    useUserPerformance,
    useTeamDashboard,
    useNotifications,
    useHealthCheck,
    
    // Mutations
    syncUserData,
    markNotificationRead,
    testConnection,
  };
}

// Hook specifically for collaborator portal integration
export function useCollaboratorPerformance(collaboratorId: string) {
  const { useUserPerformance, useNotifications, syncUserData } = usePerformanceTracker();
  
  const performance = useUserPerformance(collaboratorId);
  const notifications = useNotifications(collaboratorId);
  
  return {
    performance: performance.data?.data,
    notifications: notifications.data?.data || [],
    isLoading: performance.isLoading || notifications.isLoading,
    error: performance.error || notifications.error,
    syncUserData,
    refetch: () => {
      performance.refetch();
      notifications.refetch();
    }
  };
}

// Hook for PeopleCore portal (HR management view)
export function usePeopleCorePerformance() {
  const { useTeamDashboard, useHealthCheck } = usePerformanceTracker();
  
  const healthCheck = useHealthCheck();
  
  // For PeopleCore, we might need to fetch multiple team dashboards
  const getTeamDashboard = (supervisorId: string) => {
    return useTeamDashboard(supervisorId);
  };
  
  return {
    healthCheck: healthCheck.data?.data,
    isConnected: healthCheck.data?.success && healthCheck.data?.data?.status === 'ok',
    connectionError: healthCheck.error,
    getTeamDashboard,
    refetchHealth: healthCheck.refetch
  };
}