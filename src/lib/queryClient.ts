import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { staticDataProvider } from "./staticData";

// Static mode API request handler - routes to static data instead of backend
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  console.log(`[Static Mode] ${method} ${url}`, data);
  
  // Mock successful response for form submissions
  const mockResponse = (success: boolean, message: string, data?: any) => {
    return new Response(JSON.stringify({ success, message, ...data }), {
      status: success ? 200 : 400,
      headers: { 'Content-Type': 'application/json' }
    });
  };

  // Route API calls to static data
  try {
    if (url.includes('/api/demo-requests') && method === 'POST') {
      await staticDataProvider.submitDemoRequest(data);
      return mockResponse(true, 'Demo request submitted successfully');
    }
    
    if (url.includes('/api/newsletter') && method === 'POST') {
      await staticDataProvider.subscribeNewsletter((data as any)?.email);
      return mockResponse(true, 'Newsletter subscription successful');
    }
    
    if (url.includes('/api/support') && method === 'POST') {
      await staticDataProvider.submitSupportTicket(data);
      return mockResponse(true, 'Support ticket submitted successfully');
    }
    
    if (url.includes('/api/auth/login') && method === 'POST') {
      return mockResponse(false, 'Authentication is disabled in static mode');
    }
    
    if (url.includes('/api/stripe/create-checkout-session') && method === 'POST') {
      return mockResponse(false, 'Payment processing is temporarily disabled - coming soon');
    }
    
    // For any other POST/PUT/DELETE requests, return success
    if (method !== 'GET') {
      return mockResponse(true, 'Request processed successfully (static mode)');
    }
    
    // For GET requests, fall through to static data provider
    return mockResponse(false, 'Data not available in static mode');
  } catch (error) {
    return mockResponse(false, (error as Error).message);
  }
}

// Static data query function - routes to static data provider
export const getStaticQueryFn: <T>(options: {
  on401: "returnNull" | "throw";
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    console.log(`[Static Mode] Fetching ${url}`);

    try {
      // Route different API endpoints to static data
      if (url.includes('/api/applications')) {
        if (url.includes('/api/applications/') && url.split('/').length > 3) {
          const id = url.split('/').pop();
          return await staticDataProvider.getApplication(id!);
        }
        return await staticDataProvider.getApplications();
      }
      
      if (url.includes('/api/certifications')) {
        if (url.includes('/api/certifications/') && url.split('/').length > 3) {
          const id = url.split('/').pop();
          return await staticDataProvider.getCertification(id!);
        }
        return await staticDataProvider.getCertifications();
      }
      
      if (url.includes('/api/videos')) {
        return await staticDataProvider.getVideos();
      }
      
      if (url.includes('/api/blog')) {
        return await staticDataProvider.getBlogPosts();
      }
      
      if (url.includes('/api/auth/me')) {
        if (unauthorizedBehavior === "returnNull") {
          return null;
        }
        throw new Error('401: Authentication disabled in static mode');
      }
      
      // For any other endpoints, return empty array or null
      if (unauthorizedBehavior === "returnNull") {
        return null;
      }
      
      return [];
    } catch (error) {
      if (unauthorizedBehavior === "returnNull") {
        return null;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getStaticQueryFn({ on401: "returnNull" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
