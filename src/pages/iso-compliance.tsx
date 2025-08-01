import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Award, BookOpen, FileCheck, CheckCircle, Info, 
  ArrowLeft, ExternalLink, Shield, Users, Clock,
  Building2, GraduationCap
} from "lucide-react";

export default function ISOCompliance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nebusis-primary via-blue-700 to-blue-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Award className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">ISO/IEC 17024 Compliance</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Training and Certification</span> <span className="text-yellow-400">Structure</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-4xl leading-relaxed">
              <span className="text-yellow-400 font-semibold">at Nebusis Cloud Services, LLC</span>
            </p>
            
            <div className="mb-12">
              <Button asChild variant="outline" className="bg-white bg-opacity-10 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-20">
                <Link href="/certifications">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Certifications
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview */}
          <div className="mb-12">
            <Card className="border-nebusis-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-nebusis-primary" />
                  ISO/IEC 17024 Compliance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  At Nebusis Cloud Services, LLC, all professional certification programs are designed to fully comply with ISO/IEC 17024, ensuring impartiality, competence-based evaluation, and international credibility.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Two Components */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
              Certification Program Structure
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-8 text-left">
              Each certification program consists of two clearly distinct components:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Training Component */}
              <Card className="border-nebusis-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-nebusis-primary p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    Online Training Course
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Participants begin with a structured, online training course designed to build foundational and applied knowledge in a specific area of practice—such as digital transformation, information security, or quality management.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">These training courses are delivered asynchronously.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Participation in training is open and educational in nature.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Successful completion of the training portion is required before attempting the certification exam.</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certification Component */}
              <Card className="border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                      <FileCheck className="h-5 w-5 text-white" />
                    </div>
                    Optional Certification Exam
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Learners who wish to obtain formal recognition of their competence may register separately for a certification exam. These exams are:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Conducted independently of the training process</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Administered online under secure, proctored conditions</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Evaluated objectively by qualified personnel not involved in training delivery</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Compliance Statement */}
          <div className="mb-12">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-blue-600" />
                  Compliance with ISO/IEC 17024:2012
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  This structure ensures compliance with ISO/IEC 17024:2012, particularly regarding the required separation between training and certification activities (Clause 5.4.3) and the need to avoid conflicts of interest in assessment and certification decisions.
                </p>
                <div className="flex items-start gap-3">
                  <ExternalLink className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <a 
                    href="https://www.iso.org/standard/52993.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Learn more about ISO/IEC 17024:2012 standard
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Note */}
          <div className="mb-12">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-green-600" />
                  Important Note
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-green-800 leading-relaxed text-lg">
                    <strong>Importantly, certification is entirely optional.</strong> Individuals may complete the training course for professional development purposes without pursuing certification. Those who do wish to certify must do so through a separate registration and evaluation process, which is managed under impartiality safeguards.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Commitment Statement */}
          <div className="mb-12">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-gray-600" />
                  Our Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg italic">
                  By maintaining this separation, Nebusis Cloud Services, LLC upholds the integrity, objectivity, and international recognition of its certification programs while offering flexible, career-relevant learning opportunities to professionals across industries.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Key Benefits */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">
              Benefits of ISO/IEC 17024 Compliance
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <Shield className="h-12 w-12 text-nebusis-primary mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Impartiality</h4>
                <p className="text-gray-600 text-sm">
                  Independent evaluation processes ensure fair and unbiased certification decisions.
                </p>
              </Card>
              <Card className="text-center p-6">
                <Users className="h-12 w-12 text-nebusis-primary mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Global Recognition</h4>
                <p className="text-gray-600 text-sm">
                  Internationally recognized standard ensures your certification is valued worldwide.
                </p>
              </Card>
              <Card className="text-center p-6">
                <GraduationCap className="h-12 w-12 text-nebusis-primary mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Competence-Based</h4>
                <p className="text-gray-600 text-sm">
                  Focus on practical skills and knowledge application in real-world scenarios.
                </p>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-left">
            <Card className="bg-nebusis-primary/5 border-nebusis-primary/20 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-left">
                Ready to Start Your Certification Journey?
              </h3>
              <p className="text-gray-700 mb-6 text-lg text-left">
                Explore our comprehensive catalog of ISO/IEC 17024 compliant certification programs.
              </p>
              <div className="text-left">
                <Button asChild size="lg" className="bg-nebusis-primary hover:bg-nebusis-primary/90">
                  <Link href="/certifications">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    View All Certifications
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}