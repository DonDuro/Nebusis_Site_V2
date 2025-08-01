import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calculator, Building, GraduationCap, Zap, Code, Shield, Cloud, BarChart3, Server, Heart, School, Factory, Users } from "lucide-react";
import { Link } from "wouter";
import { Application } from "@/lib/types";

// Service categories for pricing directory
const SERVICE_CATEGORIES = [
  {
    id: 'business-applications',
    title: 'Business Applications',
    description: 'Intelligent SaaS solutions for modern enterprises',
    icon: Building,
    color: 'bg-blue-500',
    items: []
  },
  {
    id: 'training-certification',
    title: 'Training & Certification',
    description: 'Professional development and certification programs',
    icon: GraduationCap,
    color: 'bg-green-500',
    items: []
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation Services',
    description: 'Custom solutions and specialized services',
    icon: Zap,
    color: 'bg-purple-500',
    items: [
      { name: 'Digital Transformation', slug: 'digital-transformation' },
      { name: 'Special Projects', slug: 'special-projects' },
      { name: 'Project Management Office', slug: 'pmo' },
      { name: 'Blockchain Solutions', slug: 'blockchain-solutions' },
      { name: 'IoT Integration', slug: 'iot-integration' },
      { name: 'AI Services', slug: 'ai-services' },
      { name: 'Web & App Development', slug: 'web-app-development' }
    ]
  }
];

// Other services for quick access
const OTHER_SERVICES = [
  { name: 'Support Services', icon: Heart, route: '/support' },
  { name: 'Video Gallery', icon: Server, route: '/video-gallery' },
  { name: 'Blog & Resources', icon: School, route: '/blog' },
  { name: 'Industries', icon: Factory, route: '/industries' }
];

export default function Pricing() {
  const { data: applications = [] } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const { data: certifications = [] } = useQuery({
    queryKey: ["/api/certifications"],
  });

  // Update service categories with dynamic data
  const serviceCategories = SERVICE_CATEGORIES.map(category => {
    if (category.id === 'business-applications') {
      return { ...category, items: applications };
    } else if (category.id === 'training-certification') {
      return { ...category, items: certifications };
    }
    return category;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pricing Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find pricing information for all our services. Each section includes detailed pricing with built-in calculators to help you estimate costs.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for a service or application..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nebusis focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5">
                <Calculator className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="space-y-8">
          {serviceCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${category.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {category.items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.items.map((item: any) => (
                        <div key={item.id || item.slug} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">
                              {item.name || item.title}
                            </h3>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {item.description || 'Professional service with tailored pricing'}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {category.id === 'business-applications' && 'App Pricing'}
                              {category.id === 'training-certification' && 'Training Pricing'}
                              {category.id === 'digital-transformation' && 'Custom Quote'}
                            </Badge>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={
                                category.id === 'business-applications' 
                                  ? `/business-suite/${item.slug}` 
                                  : category.id === 'training-certification'
                                  ? `/certifications`
                                  : `/other-services/${item.slug}`
                              }>
                                View Pricing
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500">
                        {category.id === 'digital-transformation' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.items.map((item: any) => (
                              <div key={item.slug} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="font-semibold text-gray-900">
                                    Nebusis® {item.name}
                                  </h3>
                                  <ArrowRight className="h-4 w-4 text-gray-400" />
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                  Custom solutions tailored to your requirements
                                </p>
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs">
                                    Custom Quote
                                  </Badge>
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/other-services/${item.slug}`}>
                                      Get Quote
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>Services in this category are being loaded...</p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Other Services */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Other Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OTHER_SERVICES.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.name} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <IconComponent className="h-12 w-12 text-nebusis mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{service.name}</h3>
                    <Button variant="outline" asChild className="mt-4">
                      <Link href={service.route}>
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Visit Section
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-nebusis to-blue-600 text-white">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
              <p className="text-lg mb-6 opacity-90">
                Our team can help you find the perfect solution for your needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-nebusis" asChild>
                  <Link href="/demos">Schedule Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}