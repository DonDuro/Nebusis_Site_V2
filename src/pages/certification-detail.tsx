import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  GraduationCap, Clock, Users, Award, BookOpen,
  CheckCircle, ArrowRight, Download, Calendar,
  Video, FileText, HelpCircle, Target, Brain,
  Eye, ShoppingCart, ExternalLink
} from "lucide-react";
import { Certification } from "@/lib/types";

export default function CertificationDetail() {
  const [match, params] = useRoute("/certifications/:slug");
  const slug = params?.slug;

  const { data: certification, isLoading, error } = useQuery({
    queryKey: ["/api/certifications", slug],
    enabled: !!slug,
  });

  const cert = certification as Certification;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certification details...</p>
        </div>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Certification Not Found</h1>
          <p className="text-gray-600 mb-8">The certification you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/training-and-certification">Back to Certifications</a>
          </Button>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    const url = `/checkout?type=certification&id=${cert.id}&price=${cert.price}&title=${encodeURIComponent(cert.title)}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-8 w-8" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {cert.category.replace("-", " ").toUpperCase()}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {cert.title}
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {cert.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-blue-100">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {cert.duration} hours
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                {cert.modules.length} modules
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {cert.level.charAt(0).toUpperCase() + cert.level.slice(1)} Level
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                ISO/IEC 17024 Compliant
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Course Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {cert.description}
                </p>
              </CardContent>
            </Card>

            {/* Learning Outcomes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Learning Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {cert.learningOutcomes.map((outcome: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{outcome}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Curriculum Modules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Curriculum & Body of Knowledge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cert.modules.map((module: any, index: number) => (
                    <div key={module.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Module {index + 1}: {module.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {module.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {index < 2 ? "Video + Quiz" : index < 4 ? "Workshop" : "Assignment"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-1" />
                          Video Lecture
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          Materials
                        </div>
                        <div className="flex items-center">
                          <HelpCircle className="h-4 w-4 mr-1" />
                          Quiz/Assessment
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assessment & Certification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Assessment & Certification Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Certificate of Completion</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Complete the course modules and receive a certificate of completion.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Complete all video lectures
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Finish workshops and assignments
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Pass module quizzes
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <h3 className="font-semibold text-gray-900 mb-2">Professional Competence Certification</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Take the optional exam for ISO/IEC 17024 competence certification.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        90-minute comprehensive exam
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        80% passing score required
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Digital badge + registry listing
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Prerequisites & Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {cert.requirements.map((requirement: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Enrollment</span>
                  <div className="text-3xl font-bold text-blue-600">
                    ${cert.price}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handlePurchase}
                  className="w-full"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Enroll Now
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Secure payment • Instant access • 30-day guarantee
                </p>
                
                <Separator />
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">Self-Paced Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{cert.duration} Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{cert.level.charAt(0).toUpperCase() + cert.level.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Access:</span>
                    <span className="font-medium">Lifetime</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certificate:</span>
                    <span className="font-medium">Included</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Video className="h-4 w-4 text-blue-500 mr-3" />
                  HD Video Lectures
                </div>
                <div className="flex items-center text-sm">
                  <FileText className="h-4 w-4 text-blue-500 mr-3" />
                  Downloadable Resources
                </div>
                <div className="flex items-center text-sm">
                  <HelpCircle className="h-4 w-4 text-blue-500 mr-3" />
                  Interactive Quizzes
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-blue-500 mr-3" />
                  Flexible Scheduling
                </div>
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 text-blue-500 mr-3" />
                  Professional Certificate
                </div>
                <div className="flex items-center text-sm">
                  <ExternalLink className="h-4 w-4 text-blue-500 mr-3" />
                  Industry Recognition
                </div>
              </CardContent>
            </Card>

            {/* Support Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about this certification program?
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/contact">Contact Support</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}