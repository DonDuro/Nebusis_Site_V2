import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, Clock, Star, Users, Search, 
  Filter, ShoppingCart, Play, Award, BookOpen,
  CheckCircle, ArrowRight, Download, Calendar,
  HelpCircle, Building2, X, Rocket, Cog, BarChart3,
  Bot, Handshake, Cloud, Shield, TrendingUp, Link2,
  Zap, UserCheck, Lightbulb, FileCheck, Truck,
  Package, Database, Info
} from "lucide-react";
import { Certification } from "@/lib/types";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

interface TrainingService {
  id: number;
  productId: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  duration: number;
  level: string;
  category: string;
  thumbnailUrl: string;
  modules: any[];
  requirements: string[];
  learningOutcomes: string[];
  isActive: boolean;
  createdAt: Date;
}

export default function Certifications() {
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [previewProgram, setPreviewProgram] = useState<Certification | null>(null);

  // Handle URL parameters to set active tab
  useEffect(() => {
    // No URL handling needed for simplified layout
  }, [location]);

  const { data: certifications = [], isLoading: certLoading, error: certError } = useQuery<Certification[]>({
    queryKey: ["/api/certifications"],
  });

  const handlePurchaseProgram = (cert: Certification) => {
    // Navigate to checkout with certification details
    const checkoutUrl = `/checkout?type=certification&id=${cert.id}&price=${cert.price}&title=${encodeURIComponent(cert.title)}`;
    window.location.href = checkoutUrl;
  };

  const handlePreview = (cert: Certification) => {
    setPreviewProgram(cert);
  };

  // Program icon mapping
  const getProgramIcon = (title: string) => {
    const iconMap: { [key: string]: any } = {
      'Digital Transformation': Rocket,
      'Business Process': Cog,
      'Performance': BarChart3,
      'AI Assessor': Bot,
      'Client Engagement': Handshake,
      'SaaS Operations': Cloud,
      'Cybersecurity': Shield,
      'Quality Management': CheckCircle,
      'Data Analytics': TrendingUp,
      'Supply Chain': Link2,
      'Prompt Engineering': Zap,
      'Leadership': UserCheck,
      'ISO Compliance': FileCheck,
      'Digital Supply Chain': Truck,
      'Inventory Innovation': Package,
      'Data Analyst': Database
    };
    
    for (const [key, icon] of Object.entries(iconMap)) {
      if (title.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }
    return GraduationCap; // Default icon
  };

  // Filter certifications
  const filteredCertifications = certifications.filter((cert) => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || cert.level === levelFilter;
    const matchesCategory = categoryFilter === "all" || cert.category === categoryFilter;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  // Group certifications by category for organized display
  const certificationsByCategory = filteredCertifications.reduce((acc, cert) => {
    if (!acc[cert.category]) {
      acc[cert.category] = [];
    }
    acc[cert.category].push(cert);
    return acc;
  }, {} as Record<string, Certification[]>);

  const categoryLabels: Record<string, string> = {
    'digital-transformation': 'Digital Transformation',
    'automation': 'Business Process Automation',
    'performance': 'Performance Management',
    'ai': 'Artificial Intelligence',
    'ai-technology': 'AI Technology',
    'ai-assessment': 'AI Assessment',
    'customer-engagement': 'Customer Engagement',
    'client-management': 'Client Management',
    'saas': 'SaaS Operations',
    'saas-management': 'SaaS Management',
    'quality': 'Quality Management',
    'data-analytics': 'Data Analytics',
    'analytics': 'Analytics',
    'supply-chain': 'Supply Chain Management',
    'cybersecurity': 'Cybersecurity',
    'prompt-engineering': 'AI & Prompt Engineering',
    'leadership': 'Leadership & Management',
    'compliance': 'ISO Compliance',
    'inventory': 'Inventory Management',
    'sustainability': 'Sustainability',
    'iot': 'IoT Integration',
    'blockchain': 'Blockchain Technology',
    'digital-marketing': 'Digital Marketing',
    'management': 'Management & Leadership'
  };

  const levelColors = {
    'intermediate': 'bg-blue-100 text-blue-800',
    'advanced': 'bg-purple-100 text-purple-800',
    'beginner': 'bg-green-100 text-green-800'
  };

  const allCategories = Array.from(new Set(certifications.map(cert => cert.category)));
  const levels = ["beginner", "intermediate", "advanced"];

  if (certLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="loading-skeleton h-32 rounded-xl mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="loading-skeleton h-64 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (certError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4 text-xl">Error loading certifications</div>
          <p className="text-gray-600 mb-4">Please try again later</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nebusis-primary to-nebusis-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <GraduationCap className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">Professional Education</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Nebusis®</span> <span className="text-yellow-400">Academy</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4 max-w-4xl leading-relaxed">
              <span className="text-yellow-400 font-semibold">Professional Certification Programs</span>
            </p>
            <p className="text-blue-100 text-lg mb-8 max-w-4xl">
              ISO/IEC 17024 Compliant • Industry-Recognized • Career Advancement
            </p>
            <div className="mb-12">
              <button 
                onClick={() => {
                  document.querySelector('#compliance-info')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-yellow-300 hover:text-yellow-200 text-sm underline underline-offset-4 transition-colors"
              >
                Learn about our compliance standards
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl border border-white border-opacity-20">
                <Award className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">ISO/IEC 17024 Compliant</h3>
                <p className="text-blue-100 leading-relaxed">
                  All programs follow international standards for personnel competence certification
                </p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl border border-white border-opacity-20">
                <BookOpen className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Industry Recognition</h3>
                <p className="text-blue-100 leading-relaxed">
                  Certificates valued by employers across government, finance, healthcare, and technology sectors
                </p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl border border-white border-opacity-20">
                <Users className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Comprehensive Training</h3>
                <p className="text-blue-100 leading-relaxed">
                  Complete programs include training course and competence certification examination
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search certification programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex items-center gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {categoryLabels[category] || category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Listing */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.keys(certificationsByCategory).length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(certificationsByCategory).map(([category, certs]) => (
                <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                      {categoryLabels[category] || category}
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {certs.map((cert) => (
                        <div key={cert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer" onClick={() => handlePreview(cert)}>
                          <div className="flex-1">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                {(() => {
                                  const IconComponent = getProgramIcon(cert.title);
                                  return <IconComponent className="h-8 w-8 text-nebusis-primary mt-1" />;
                                })()}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                                  <Badge className={`${levelColors[cert.level]} text-xs`}>
                                    {cert.level.charAt(0).toUpperCase() + cert.level.slice(1)}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{cert.description}</p>
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{cert.duration}h training</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Award className="h-4 w-4" />
                                    <span>2h exam</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    <span>ISO/IEC 17024</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 ml-6">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-nebusis-primary">${cert.price}</div>
                              <div className="text-xs text-gray-500">Complete program</div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handlePreview(cert)}
                                className="whitespace-nowrap"
                              >
                                Program Details
                              </Button>
                              <Button 
                                onClick={() => handlePurchaseProgram(cert)}
                                size="sm"
                                className="bg-nebusis-primary hover:bg-nebusis-primary/90 whitespace-nowrap"
                              >
                                Purchase
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Preview Dialog */}
      <Dialog open={!!previewProgram} onOpenChange={() => setPreviewProgram(null)}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {previewProgram?.title}
            </DialogTitle>
          </DialogHeader>
          {previewProgram && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                {(() => {
                  const IconComponent = getProgramIcon(previewProgram.title);
                  return <IconComponent className="h-10 w-10 text-nebusis-primary" />;
                })()}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`${levelColors[previewProgram.level]} font-medium`}>
                      {previewProgram.level.charAt(0).toUpperCase() + previewProgram.level.slice(1)}
                    </Badge>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{previewProgram.duration}h training + 2h exam</span>
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-nebusis-primary">
                  ${previewProgram.price}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Program Overview</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">{previewProgram.description}</p>
                      
                      {previewProgram.learningOutcomes && previewProgram.learningOutcomes.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Learning Outcomes</h4>
                          <ul className="space-y-1">
                            {previewProgram.learningOutcomes.map((outcome: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {previewProgram.requirements && previewProgram.requirements.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Prerequisites</h4>
                          <ul className="space-y-1">
                            {previewProgram.requirements.map((requirement: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Course Curriculum</h3>
                      <div className="space-y-3">
                        {previewProgram.modules && previewProgram.modules.length > 0 ? (
                          previewProgram.modules.map((module: any, index: number) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-gray-900">
                                  Module {index + 1}: {module.title}
                                </h4>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="h-3 w-3" />
                                  <span>{module.duration}h</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                              {module.topics && module.topics.length > 0 && (
                                <div>
                                  <div className="text-xs font-medium text-gray-700 mb-2">Learning Topics:</div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                    {module.topics.map((topic: string, topicIndex: number) => (
                                      <div key={topicIndex} className="flex items-center gap-2 text-xs text-gray-600">
                                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                        <span>{topic}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-600">
                            <BookOpen className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p>Curriculum details will be available soon</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4 sticky top-4">
                    <h3 className="font-semibold text-gray-900">Program Fees</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Training Duration:</span>
                        <span className="font-medium">{previewProgram.duration} hours</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Exam Duration:</span>
                        <span className="font-medium">2 hours</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Format:</span>
                        <span className="font-medium">Online</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Language:</span>
                        <span className="font-medium">English</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Certificate:</span>
                        <span className="font-medium">ISO/IEC 17024</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Training Course</span>
                          <span>$195</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Certification Exam</span>
                          <span>$100</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
                          <span>Total Program</span>
                          <span className="text-nebusis-primary">${previewProgram.price}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handlePurchaseProgram(previewProgram)}
                        className="w-full bg-nebusis-primary hover:bg-nebusis-primary/90 mb-3"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Purchase Program
                      </Button>
                      <Button variant="outline" onClick={() => setPreviewProgram(null)} className="w-full">
                        Close Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Subtle Compliance Information Footer */}
      <section id="compliance-info" className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Award className="h-4 w-4" />
              <span>ISO/IEC 17024 Compliant Certification Programs</span>
            </div>
            <p className="text-sm text-gray-500 max-w-4xl mx-auto leading-relaxed">
              All Nebusis® Academy certification programs follow international standards for personnel competence certification, 
              ensuring impartiality, competence-based evaluation, and global recognition.
            </p>
            <Link 
              href="/iso-compliance"
              className="inline-block text-nebusis-primary hover:text-nebusis-dark text-sm underline mt-2"
            >
              Learn more about our ISO/IEC 17024 compliance policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
