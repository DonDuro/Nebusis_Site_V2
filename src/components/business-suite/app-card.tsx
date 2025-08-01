import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Application } from "@/lib/types";
import { NEBUSIS_APPLICATIONS } from "@/lib/constants";
import { Shield } from "lucide-react";

interface AppCardProps {
  application: Application;
  showRequestAccess?: boolean;
}

export default function AppCard({ application, showRequestAccess }: AppCardProps) {
  const appConfig = NEBUSIS_APPLICATIONS.find(app => app.slug === application.slug);
  const IconComponent = appConfig?.icon || Shield;

  const getStatusBadge = () => {
    switch (application.status) {
      case "live":
        return <Badge className="bg-green-100 text-green-800">✅ Live Now</Badge>;
      case "beta":
        return <Badge className="bg-nebusis-bg text-nebusis-primary">🚀 Beta</Badge>;
      default:
        return <Badge className="bg-orange-100 text-orange-800">🛠️ Coming Soon</Badge>;
    }
  };

  const getButtonText = () => {
    switch (application.status) {
      case "live":
        return "Explore Features";
      case "beta":
        return "Join Beta Program";
      default:
        return "Request Early Access";
    }
  };

  const getPromotionalText = () => {
    switch (application.status) {
      case "live":
        return "Ready to transform your business operations";
      case "beta":
        return "Be among the first to experience next-gen features";
      default:
        return "Join the waitlist for exclusive early access";
    }
  };

  const getProductNameParts = () => {
    // Split "Nebusis® ProductName" into "Nebusis®" and "ProductName"
    const nameParts = application.name.split(' ');
    if (nameParts.length >= 2 && nameParts[0] === 'Nebusis®') {
      return {
        brand: nameParts[0],
        product: nameParts.slice(1).join(' ')
      };
    }
    // Fallback for names that don't follow the pattern
    return {
      brand: 'Nebusis®',
      product: application.name.replace('Nebusis® ', '')
    };
  };

  const getIconColor = () => {
    if (!appConfig) return "text-nebusis-primary";
    
    const colorMap: Record<string, string> = {
      blue: "text-nebusis-primary",
      green: "text-green-500",
      purple: "text-purple-500",
      emerald: "text-emerald-500",
      indigo: "text-indigo-500",
      red: "text-red-500",
      pink: "text-pink-500",
      orange: "text-orange-500",
      amber: "text-amber-500",
      gray: "text-gray-500",
      slate: "text-slate-500",
      yellow: "text-yellow-500",
      violet: "text-violet-500",
      sky: "text-sky-500",
      teal: "text-teal-500",
      cyan: "text-cyan-500"
    };
    
    return colorMap[appConfig.color] || "text-nebusis-primary";
  };

  return (
    <Card className="card-hover border-nebusis group h-80 flex flex-col w-full">
      <CardHeader className="flex-1 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div></div>
          {getStatusBadge()}
        </div>
        <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">
          <div className="flex items-center mb-1">
            {IconComponent && (
              <IconComponent className={`h-5 w-5 mr-2 ${getIconColor()}`} />
            )}
            <span>{getProductNameParts().brand}</span>
            <span className="text-gray-600 font-medium text-base ml-1">
              {getProductNameParts().product}
            </span>
          </div>
        </CardTitle>
        <CardDescription className="line-clamp-3 min-h-[4.5rem]">
          {application.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-shrink-0 pt-2">
        <div className="space-y-3">
          <p className="text-sm text-gray-600 text-center font-medium min-h-[2.5rem] flex items-center justify-center">
            {getPromotionalText()}
          </p>
          <Button 
            asChild 
            className="w-full bg-nebusis-primary text-white hover:bg-nebusis-dark"
          >
            <Link href={`/business-suite/${application.slug}`}>
              {getButtonText()}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
