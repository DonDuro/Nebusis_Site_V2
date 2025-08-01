import { useQuery } from "@tanstack/react-query";
import AppCard from "./app-card";
import { Application } from "@/lib/types";

export default function AppGrid() {
  const { data: applications = [], isLoading, error } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="loading-skeleton h-64 rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-2">Error loading applications</div>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {applications.map((app) => (
        <AppCard key={app.id} application={app} />
      ))}
    </div>
  );
}
