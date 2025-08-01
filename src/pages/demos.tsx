import DemoRequestForm from "@/components/forms/demo-request-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, CheckCircle, Clock, Users, Shield, 
  Calendar, Video, Headphones, FileText,
  ArrowRight, Star, Globe
} from "lucide-react";
import { Link } from "wouter";

export default function Demos() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nebusis-primary to-nebusis-dark text-white py-16 relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute top-32 right-16 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nebusis® <span className="text-yellow-400">Request a Demo</span>
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl">
              Experience a comprehensive demonstration designed specifically for qualified enterprise prospects. Our detailed qualification process ensures you receive the most relevant and valuable demo content.
            </p>
            
            {/* 3-Box Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Focused</h3>
                </div>
                <p className="text-blue-100">Targeted content specifically designed for your industry and business requirements</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Detailed</h3>
                </div>
                <p className="text-blue-100">Comprehensive demonstration covering all relevant features and capabilities</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Custom</h3>
                </div>
                <p className="text-blue-100">Tailored presentation addressing your specific challenges and use cases</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="request" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="request">Request Demo</TabsTrigger>
              <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            </TabsList>

            <TabsContent value="request">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Demo Request Form */}
                <div>
                  <DemoRequestForm />
                </div>

                {/* Why Request a Demo */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Why Request a Demo?</CardTitle>
                      <CardDescription>
                        See the power of Nebusis® in action with a personalized demonstration
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Tailored to Your Needs</h4>
                          <p className="text-gray-600 text-sm">We customize the demo to show features most relevant to your industry and use case.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Expert Consultation</h4>
                          <p className="text-gray-600 text-sm">Get detailed answers about implementation, pricing, and features from our experts.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">ROI Assessment</h4>
                          <p className="text-gray-600 text-sm">Learn how Nebusis® can improve efficiency and reduce costs in your organization.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Implementation Roadmap</h4>
                          <p className="text-gray-600 text-sm">Get a clear plan for deploying Nebusis® applications in your environment.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Demo Process */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Demo Process</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FileText className="h-5 w-5 text-nebusis-primary" />
                        <div>
                          <span className="font-medium">Qualification Review</span>
                          <p className="text-sm text-gray-600">We review your requirements to customize content</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Video className="h-5 w-5 text-nebusis-primary" />
                        <div>
                          <span className="font-medium">Comprehensive Demo</span>
                          <p className="text-sm text-gray-600">Detailed demonstration of relevant features</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="h-5 w-5 text-nebusis-primary" />
                        <div>
                          <span className="font-medium">24-Hour Response</span>
                          <p className="text-sm text-gray-600">Quick turnaround for qualified prospects</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Success Stories */}
                  <Card>
                    <CardHeader>
                      <CardTitle>What Our Customers Say</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-nebusis-primary pl-4">
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            "The demo was incredibly helpful. Within 30 minutes, we understood exactly how Nebusis® would integrate with our existing systems."
                          </p>
                          <div className="text-sm text-gray-500">
                            - Sarah Johnson, IT Director at TechCorp
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="how-it-works">
              <div className="max-w-4xl mx-auto">
                {/* Process Overview */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>How Our Demo Process Works</CardTitle>
                    <CardDescription>
                      A simple, efficient process designed to give you maximum value in minimum time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-nebusis-primary rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <h3 className="font-semibold mb-2">Submit Request</h3>
                        <p className="text-gray-600 text-sm">Fill out the demo request form with your specific needs and preferences</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-nebusis-primary rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <h3 className="font-semibold mb-2">Qualification Review</h3>
                        <p className="text-gray-600 text-sm">We review your requirements to customize the demonstration content</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-nebusis-primary rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <h3 className="font-semibold mb-2">Comprehensive Demo</h3>
                        <p className="text-gray-600 text-sm">Detailed demonstration of relevant features tailored to your industry</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-nebusis-primary rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <h3 className="font-semibold mb-2">Follow-up</h3>
                        <p className="text-gray-600 text-sm">Receive resources, pricing, and next steps for implementation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Demo Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-nebusis-primary" />
                        Demo Duration & Format
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Typical Duration:</span>
                        <span className="font-medium">30-45 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span className="font-medium">Video Demonstration</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery:</span>
                        <span className="font-medium">Secure Digital Access</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Time:</span>
                        <span className="font-medium">Within 24 hours</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-nebusis-primary" />
                        Security & Privacy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">No software installation required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Your data stays confidential</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">GDPR & SOC 2 compliant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">NDA available if required</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* What You'll See */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>What You'll See in the Demo</CardTitle>
                    <CardDescription>
                      A comprehensive overview of Nebusis® capabilities relevant to your needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Core Functionality</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-[hsl(221,83%,53%)]" />
                            Application interface and navigation
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-[hsl(221,83%,53%)]" />
                            Key features and workflows
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-[hsl(221,83%,53%)]" />
                            Reporting and analytics
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-[hsl(221,83%,53%)]" />
                            Integration capabilities
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">Implementation Insights</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-[hsl(221,83%,53%)]" />
                            Deployment options and timeline
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-[hsl(221,83%,53%)]" />
                            Training and onboarding process
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-[hsl(221,83%,53%)]" />
                            Support and maintenance
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-[hsl(221,83%,53%)]" />
                            Pricing and licensing options
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to See Nebusis® in Action?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Join hundreds of organizations who have discovered the power of our Business Suite
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-[hsl(221,83%,53%)] text-white hover:bg-[hsl(221,83%,45%)]">
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule Demo Now
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/video-gallery">
                        <Play className="h-5 w-5 mr-2" />
                        Watch Sample Videos
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
