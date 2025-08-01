import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppCard from "@/components/business-suite/app-card";
import { Grid3X3 } from "lucide-react";
import { Application } from "@/lib/types";
import { applications as staticApplications } from "@/lib/staticData";

export default function BusinessSuite() {
  // Use static data instead of API calls
  const applications = staticApplications;

  // Find ComplianceOne application
  const complianceOne = applications.find(app => app.name.includes('ComplianceCore') || app.name.includes('ComplianceOne'));
  const otherApps = applications.filter(app => !app.name.includes('ComplianceCore') && !app.name.includes('ComplianceOne'));

  // Organize applications by functional groups in desired order
  const applicationGroups = [
    {
      title: "Document & Data Management",
      icon: "📊", 
      description: "Document management, data analytics, and information systems",
      apps: otherApps.filter(app => 
        app.name.includes('PowerDocs') || 
        app.name.includes('CrunchWiz') || 
        app.name.includes('ZappFormZ')
      )
    },
    {
      title: "Human Resources & Personnel",
      icon: "👥",
      description: "Workforce management, performance tracking, and personnel development",
      apps: otherApps.filter(app => 
        app.name.includes('PeopleCore') || 
        app.name.includes('PerformanceTracker') || 
        app.name.includes('KnowledgeCheck')
      ).sort((a, b) => {
        // Put PeopleCore first in Human Resources category
        if (a.name.includes('PeopleCore')) return -1;
        if (b.name.includes('PeopleCore')) return 1;
        return 0;
      })
    },
    {
      title: "Customer & Marketing",  
      icon: "🎯",
      description: "Customer relationship management, marketing automation, and engagement",
      apps: otherApps.filter(app => 
        app.name.includes('Engage') || 
        app.name.includes('MemberCore')
      )
    },
    {
      title: "Finance & Operations",
      icon: "💰",
      description: "Financial management, supply chain, and operational excellence",
      apps: otherApps.filter(app => 
        app.name.includes('SmartBooks') || 
        app.name.includes('Supply Chain Wizard') || 
        app.name.includes('Inventory')
      )
    },
    {
      title: "Sustainability & Specialized",
      icon: "🌱",
      description: "Environmental management, specialized industry solutions, and innovation",
      apps: otherApps.filter(app => 
        app.name.includes('ESG GreenCore') || 
        app.name.includes('EmissionsFlow') || 
        app.name.includes('Multiomics Engine') || 
        app.name.includes('SelfCertPro')
      )
    }
  ];

  const renderApplicationGroups = () => {
    return (
      <div className="space-y-16">
        {applicationGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-16">
            {/* Group Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">{group.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900">
                  <span className="relative">
                    {group.title}
                    <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-yellow-500"></div>
                  </span>
                </h3>
              </div>
              <p className="text-gray-600">{group.description}</p>
            </div>
            
            {/* Group Applications Grid - Left-aligned */}
            <div className="flex justify-start w-full">
              <div className={`grid gap-6 ${
                group.apps.length === 1 ? 'grid-cols-1' :
                group.apps.length === 2 ? 'grid-cols-2' :
                group.apps.length === 3 ? 'grid-cols-3' :
                'grid-cols-4'
              } max-w-6xl`}>
              {group.apps.map((app) => (
                <AppCard 
                  key={app.id}
                  application={app} 
                  showRequestAccess={true}
                />
              ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // No loading/error states needed with static data

  return (
    <div className="min-h-screen bg-gradient-to-br from-nebusis-bg via-nebusis-light to-gray-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-br from-nebusis-primary via-nebusis-dark to-nebusis-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-white bg-opacity-5 rounded-full"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Grid3X3 className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">Intelligent Business Applications</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Nebusis® <span className="text-yellow-300">Business Suite</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-4xl leading-relaxed">
              Comprehensive business applications designed for compliance, automation, and strategic growth powered by AI-enhanced workflows
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <Badge className="h-10 w-10 mx-auto mb-4 bg-green-500 text-white rounded-full flex items-center justify-center border-0">
                  1
                </Badge>
                <h3 className="font-bold text-lg mb-2">Live Platform</h3>
                <p className="text-sm opacity-90">ComplianceOne flagship application available now</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <Badge className="h-10 w-10 mx-auto mb-4 bg-yellow-600 text-white rounded-full flex items-center justify-center border-0">
                  22+
                </Badge>
                <h3 className="font-bold text-lg mb-2">In Development</h3>
                <p className="text-sm opacity-90">Comprehensive suite launching progressively</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <Grid3X3 className="h-10 w-10 mx-auto mb-4 text-nebusis-light" />
                <h3 className="font-bold text-lg mb-2">AI-Enhanced</h3>
                <p className="text-sm opacity-90">Intelligent automation and wizard-driven workflows</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Featured ComplianceOne Section */}
        {complianceOne && (
          <div className="mb-16">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full opacity-50 -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-100 rounded-full opacity-30 -ml-12 -mb-12"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Badge className="bg-green-500 text-white px-4 py-2 text-sm font-semibold">
                    Available Now
                  </Badge>
                  <span className="text-green-700 font-medium">Flagship Application</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {complianceOne.name}
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Nebusis® ComplianceOne is the flagship application of the Nebusis® platform. 
                      It is powered by the Nebusis® Management System Wizards, enabling full digital 
                      compliance with standards like ISO 9001 (Quality), ISO/IEC 27001 (Cybersecurity), 
                      ISO/IEC 42001 (AI Management), ISO 37001 (Anti-Bribery), and ISO 50001 (Energy Management).
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button asChild size="lg" className="bg-nebusis-primary hover:bg-nebusis-dark">
                        <Link href={`/business-suite/${complianceOne.slug}`}>
                          Explore Features
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="border-nebusis-primary text-nebusis-primary hover:bg-nebusis-primary hover:text-white">
                        <Link href="/demos">
                          Request a Demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="aspect-video bg-gradient-to-br from-nebusis-primary/10 to-nebusis-dark/5 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Management System Wizards</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <Badge className="bg-nebusis-primary text-white hover:bg-nebusis-dark">ISO 9001</Badge>
                          <Badge className="bg-nebusis-primary text-white hover:bg-nebusis-dark">ISO/IEC 27001</Badge>
                          <Badge className="bg-nebusis-primary text-white hover:bg-nebusis-dark">ISO/IEC 42001</Badge>
                          <Badge className="bg-nebusis-primary text-white hover:bg-nebusis-dark">ISO 37001</Badge>
                          <Badge className="bg-nebusis-primary text-white hover:bg-nebusis-dark">ISO 50001</Badge>
                          <Badge className="bg-nebusis-primary text-white hover:bg-nebusis-dark">+ More</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Suite Coming Soon Section */}
        <div className="mb-16">
          {/* Enhanced section divider with yellow accent */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-8 border-l-4 border-yellow-400 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full opacity-30 -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-200 rounded-full opacity-20 -ml-12 -mb-12"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                  Coming Soon
                </div>
                <span className="text-yellow-600 font-semibold">Development Pipeline</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nebusis® Business Suite – Coming Soon
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl leading-relaxed">
                Over 22 intelligent apps to support compliance, operations, and digital transformation. 
                These apps are currently in development and organized by functional group.
              </p>
              
              {/* Development status indicators */}
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">22 Apps in Development</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">1 Live Application</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Organized by Function</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organized Applications by Function */}
        {renderApplicationGroups()}
      </div>
    </div>
  );
}