import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Zap, Code, BarChart3, Shield, Cloud, Server, 
  ArrowRight, CheckCircle, Building2, Users, School, Heart, Factory
} from 'lucide-react';
import { Link } from 'wouter';
import DigitalTransformationQuoteForm from "@/components/forms/digital-transformation-quote-form";

const DIGITAL_TRANSFORMATION_SERVICES = [
  {
    id: 1,
    productId: "NEB-DT-001",
    name: "Digital Transformation Services",
    slug: "digital-transformation",
    icon: Zap,
    color: "blue",
    description: "We guide organizations through full or phased digital transformation—modernizing legacy systems, integrating data and workflows, and enabling technology-driven decision-making using AI, IoT, and automation.",
    features: [
      "Legacy System Modernization",
      "Data & Workflow Integration", 
      "Technology-Driven Decision Making",
      "AI, IoT, and Automation Implementation",
      "Phased Transformation Planning"
    ],
    category: "Transformation",
    targetIndustries: ["Government", "Healthcare", "Manufacturing", "Financial Services"]
  },
  {
    id: 2,
    productId: "NEB-DT-002", 
    name: "Special Projects",
    slug: "special-projects",
    icon: Code,
    color: "gray",
    description: "Tailored consulting, development, and integration projects across sectors, including smart city initiatives, public sector reform, industrial automation, and emerging market enablement.",
    features: [
      "Smart City Initiatives",
      "Public Sector Reform", 
      "Industrial Automation",
      "Emerging Market Enablement",
      "Full Project Management"
    ],
    category: "Consulting",
    targetIndustries: ["Smart Cities", "Public Sector", "Industrial", "Emerging Markets"]
  },
  {
    id: 3,
    productId: "NEB-DT-003",
    name: "Project Management Office",
    slug: "pmo", 
    icon: BarChart3,
    color: "slate",
    description: "Get expert-led design, planning, and implementation support for complex digital initiatives. Our PMO ensures projects meet scope, time, cost, and quality goals—with ISO-compliant methods.",
    features: [
      "Expert-Led Design & Planning",
      "Complex Digital Initiative Support",
      "Scope, Time, Cost Management", 
      "Quality Assurance",
      "ISO-Compliant Methods"
    ],
    category: "Management",
    targetIndustries: ["Enterprise", "Government", "Healthcare", "Education"]
  },
  {
    id: 4,
    productId: "NEB-DT-004",
    name: "Blockchain Solutions", 
    slug: "blockchain",
    icon: Shield,
    color: "blue",
    description: "Deploy custom-built or modular blockchain applications for compliance, traceability, secure transactions, and decentralized data integrity—ideal for finance, supply chain, and public governance.",
    features: [
      "Compliance & Traceability",
      "Secure Transactions",
      "Decentralized Data Integrity",
      "Finance Applications", 
      "Supply Chain & Public Governance"
    ],
    category: "Blockchain",
    targetIndustries: ["Finance", "Supply Chain", "Government", "Healthcare"]
  },
  {
    id: 5,
    productId: "NEB-DT-005",
    name: "IoT Integration",
    slug: "iot-integration",
    icon: Cloud,
    color: "gray",
    description: "Harness Internet of Things (IoT) data to improve operations, safety, and performance. We deploy smart sensors and connect them to Nebusis® apps for automated alerts, reporting, and predictive maintenance.",
    features: [
      "Smart Sensor Deployment",
      "Operations & Safety Improvement",
      "Performance Enhancement",
      "Automated Alerts & Reporting",
      "Predictive Maintenance"
    ],
    category: "IoT", 
    targetIndustries: ["Manufacturing", "Healthcare", "Smart Cities", "Energy"]
  },
  {
    id: 6,
    productId: "NEB-DT-006",
    name: "Artificial Intelligence Services",
    slug: "ai-services", 
    icon: Server,
    color: "slate",
    description: "Embed AI into your business operations—from intelligent process automation and predictive analytics to natural language processing and conversational bots. Aligned with ethical and secure AI practices.",
    features: [
      "Intelligent Process Automation",
      "Predictive Analytics",
      "Natural Language Processing",
      "Conversational Bots",
      "Ethical & Secure AI Practices"
    ],
    category: "AI",
    targetIndustries: ["Healthcare", "Finance", "Government", "Education"]
  },
  {
    id: 7,
    productId: "NEB-DT-007",
    name: "Web & App Development",
    slug: "web-app-development",
    icon: Code,
    color: "blue", 
    description: "Custom development services tailored to your Nebusis® environment. We create specialized integrations, advanced reporting dashboards, workflow automation tools, and data connectors.",
    features: [
      "Nebusis® App Extensions & Integrations",
      "Custom Data Connectors & APIs", 
      "Specialized Reporting Dashboards",
      "Workflow Automation Tools",
      "Third-Party System Bridges"
    ],
    category: "Development",
    targetIndustries: ["Enterprise", "Healthcare", "Government", "Education"]
  }
];

export default function DigitalTransformation() {
  const [selectedService, setSelectedService] = useState<typeof DIGITAL_TRANSFORMATION_SERVICES[0] | null>(null);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          gradient: 'from-[hsl(210,45%,40%)] to-[hsl(210,45%,32%)]',
          border: 'border-[hsl(210,45%,40%)]',
          text: 'text-[hsl(210,45%,40%)]',
          bg: 'bg-[hsl(210,45%,40%)]'
        };
      case 'gray':
        return {
          gradient: 'from-gray-600 to-gray-700',
          border: 'border-gray-600', 
          text: 'text-gray-600',
          bg: 'bg-gray-600'
        };
      case 'slate':
        return {
          gradient: 'from-slate-600 to-slate-700',
          border: 'border-slate-600',
          text: 'text-slate-600', 
          bg: 'bg-slate-600'
        };
      default:
        return {
          gradient: 'from-[hsl(210,45%,40%)] to-[hsl(210,45%,32%)]',
          border: 'border-[hsl(210,45%,40%)]',
          text: 'text-[hsl(210,45%,40%)]',
          bg: 'bg-[hsl(210,45%,40%)]'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(210,45%,40%)] to-[hsl(210,45%,32%)] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-white bg-opacity-15 rounded-xl flex items-center justify-center backdrop-blur-sm border border-yellow-400 border-opacity-30">
                <div className="relative">
                  <div className="w-12 h-8 bg-yellow-400 bg-opacity-95 rounded-sm flex items-center justify-center">
                    <Zap className="h-6 w-6 text-[hsl(210,45%,40%)]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 border-2 border-yellow-400 rounded-full opacity-80"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full opacity-60"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Nebusis®</span> <span className="text-yellow-400">Digital Transformation</span>
            </h1>
            <p className="text-xl mb-4 max-w-4xl">
              <span className="text-yellow-400 font-semibold">Comprehensive technology solutions to modernize your organization</span>
            </p>
            <p className="text-blue-100 text-lg mb-8 max-w-4xl">
              From AI and blockchain to IoT integration and custom development—we deliver complete digital transformation services tailored to your industry needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <Zap className="h-10 w-10 mb-4 text-yellow-400" />
                <h3 className="font-bold text-lg mb-2">Legacy Modernization</h3>
                <p className="text-sm opacity-90">Transform outdated systems with cutting-edge technology</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <Code className="h-10 w-10 mb-4 text-yellow-400" />
                <h3 className="font-bold text-lg mb-2">Custom Development</h3>
                <p className="text-sm opacity-90">Tailored solutions for your unique business needs</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <BarChart3 className="h-10 w-10 mb-4 text-yellow-400" />
                <h3 className="font-bold text-lg mb-2">Strategic Consulting</h3>
                <p className="text-sm opacity-90">Expert guidance for digital transformation success</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Decorative Background Elements */}
        <div className="absolute top-20 right-10 w-8 h-8 border border-yellow-400 border-opacity-30 rounded-lg transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 left-16 w-6 h-6 bg-yellow-400 bg-opacity-40 rounded-full shadow-lg"></div>
        <div className="absolute top-1/2 left-8 w-4 h-4 border border-yellow-400 border-opacity-60 rounded-sm transform -rotate-45"></div>
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-yellow-400 bg-opacity-30 rounded-full"></div>
        <div className="absolute top-32 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute bottom-48 right-1/3 w-3 h-8 border-l border-yellow-400 border-opacity-20 transform rotate-45"></div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 relative">
              Our Digital Transformation Services
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-yellow-400 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Comprehensive technology solutions designed to modernize your operations, enhance efficiency, and drive innovation across your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DIGITAL_TRANSFORMATION_SERVICES.map((service) => {
              const colorClasses = getColorClasses(service.color);
              const Icon = service.icon;
              
              return (
                <Card 
                  key={service.id} 
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:scale-105 cursor-pointer hover:border-yellow-400 hover:border-opacity-30 relative overflow-hidden"
                  onClick={() => setSelectedService(service)}
                >
                  <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-400 bg-opacity-10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 ${colorClasses.bg} rounded-xl flex items-center justify-center relative`}>
                        <Icon className="h-8 w-8 text-white" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <Badge variant="secondary" className="text-xs relative">
                        {service.category}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity"></div>
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl mb-2 group-hover:text-[hsl(210,45%,40%)] transition-colors relative">
                      Nebusis® {service.name}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-8 transition-all duration-300"></div>
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-3">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">Key Features:</h4>
                        <div className="space-y-1">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                          {service.features.length > 3 && (
                            <div className="text-sm text-gray-500 italic">
                              +{service.features.length - 3} more features
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">Target Industries:</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.targetIndustries.slice(0, 3).map((industry, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                          {service.targetIndustries.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{service.targetIndustries.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                          Custom Quote Required
                        </span>
                        <div className="relative">
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[hsl(210,45%,40%)] transition-colors" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-6">
              <div className="flex items-center mb-4">
                <div className={`w-16 h-16 ${getColorClasses(selectedService.color).bg} rounded-xl flex items-center justify-center mr-4`}>
                  <selectedService.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl">
                    Nebusis® {selectedService.name}
                  </DialogTitle>
                  <Badge variant="secondary" className="mt-1">
                    {selectedService.category} • {selectedService.productId}
                  </Badge>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Service Overview</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedService.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features & Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedService.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Target Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedService.targetIndustries.map((industry, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-[hsl(210,45%,40%)] text-white hover:bg-[hsl(210,45%,32%)] hover:shadow-lg hover:shadow-yellow-400/20 flex-1 relative group">
                        Request Quote
                        <div className="absolute inset-0 border border-yellow-400 border-opacity-0 group-hover:border-opacity-30 rounded-md transition-all"></div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Request Quote - {selectedService.name}</DialogTitle>
                      </DialogHeader>
                      <DigitalTransformationQuoteForm 
                        serviceType={selectedService.slug}
                        serviceName={selectedService.name}
                      />
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" className="flex-1 border-[hsl(210,45%,40%)] text-[hsl(210,45%,40%)] hover:bg-[hsl(210,45%,40%)] hover:text-white" asChild>
                    <Link href="/contact">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 relative">
            Ready to Transform Your Organization?
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our expert team is ready to guide you through your digital transformation journey. Get started with a consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-[hsl(210,45%,40%)] text-white hover:bg-[hsl(210,45%,32%)] hover:shadow-lg hover:shadow-yellow-400/30 relative group">
                  <Zap className="h-5 w-5 mr-2" />
                  Get Started Today
                  <div className="absolute inset-0 border border-yellow-400 border-opacity-0 group-hover:border-opacity-40 rounded-md transition-all"></div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Digital Transformation Consultation</DialogTitle>
                </DialogHeader>
                <DigitalTransformationQuoteForm 
                  serviceType="digital-transformation"
                  serviceName="Digital Transformation Consultation"
                />
              </DialogContent>
            </Dialog>
            
            <Button asChild size="lg" variant="outline" className="border-[hsl(210,45%,40%)] text-[hsl(210,45%,40%)] hover:bg-[hsl(210,45%,40%)] hover:text-white">
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}