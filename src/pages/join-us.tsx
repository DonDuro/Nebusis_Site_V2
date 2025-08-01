import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Briefcase, Heart, Globe, 
  UserPlus, MapPin, Building, GraduationCap,
  Lightbulb, Target, Handshake, ArrowRight
} from "lucide-react";
import { Link } from "wouter";

export default function JoinUs() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const opportunities = [
    {
      category: "Staff Positions",
      icon: Briefcase,
      description: "Join our core team as a full-time Nebusis® staff member",
      positions: [
        // Business Development Functional Area
        {
          title: "Business Development Director",
          department: "Business Development",
          type: "Full-time",
          location: "Remote",
          skills: ["Strategic Planning", "Market Analysis", "Partnership Development", "Revenue Growth"],
          description: "Lead strategic business development initiatives and market expansion efforts."
        },
        {
          title: "Sales Group Leader",
          department: "Business Development",
          type: "Full-time",
          location: "Remote",
          skills: ["Sales Management", "Team Leadership", "Client Relations", "CRM Systems"],
          description: "Manage sales teams and drive revenue growth across market segments."
        },
        {
          title: "Marketing Coordinator",
          department: "Business Development",
          type: "Full-time",
          location: "Remote",
          skills: ["Digital Marketing", "Content Strategy", "Brand Management", "Analytics"],
          description: "Coordinate marketing campaigns and brand development initiatives."
        },
        {
          title: "Business Analyst",
          department: "Business Development",
          type: "Full-time",
          location: "Remote",
          skills: ["Market Research", "Data Analysis", "Business Intelligence", "Reporting"],
          description: "Analyze market trends and business performance to support strategic decisions."
        },

        // Service Operations Functional Area
        {
          title: "Service Operations Director",
          department: "Service Operations",
          type: "Full-time",
          location: "Remote",
          skills: ["Operations Management", "Service Delivery", "Process Optimization", "Quality Assurance"],
          description: "Oversee service delivery operations and ensure client satisfaction."
        },
        {
          title: "Implementation Group Leader",
          department: "Service Operations",
          type: "Full-time",
          location: "Remote",
          skills: ["Project Management", "Team Leadership", "Technical Implementation", "Client Management"],
          description: "Lead implementation teams for client projects and service deployments."
        },
        {
          title: "Client Success Coordinator",
          department: "Service Operations",
          type: "Full-time",
          location: "Remote",
          skills: ["Customer Success", "Support Management", "Training Delivery", "Relationship Management"],
          description: "Coordinate client onboarding, training, and ongoing success initiatives."
        },
        {
          title: "Technical Support Analyst",
          department: "Service Operations",
          type: "Full-time",
          location: "Remote",
          skills: ["Technical Support", "Problem Solving", "Documentation", "Client Communication"],
          description: "Provide technical support and troubleshooting for client implementations."
        },

        // Resource Administration Functional Area
        {
          title: "Resource Administration Director",
          department: "Resource Administration",
          type: "Full-time",
          location: "Remote",
          skills: ["Human Resources", "Finance Management", "Operations Planning", "Compliance"],
          description: "Oversee human resources, finance, and administrative operations."
        },
        {
          title: "HR Group Leader",
          department: "Resource Administration",
          type: "Full-time",
          location: "Remote",
          skills: ["Human Resources", "Talent Management", "Employee Relations", "Organizational Development"],
          description: "Lead human resources initiatives including recruitment, development, and retention."
        },
        {
          title: "Finance Coordinator",
          department: "Resource Administration",
          type: "Full-time",
          location: "Remote",
          skills: ["Financial Management", "Accounting", "Budget Planning", "Financial Reporting"],
          description: "Coordinate financial operations, budgeting, and reporting activities."
        },
        {
          title: "Administrative Assistant",
          department: "Resource Administration",
          type: "Full-time",
          location: "Remote",
          skills: ["Administrative Support", "Documentation", "Communication", "Organization"],
          description: "Provide administrative support across all functional areas and operations."
        },
        {
          title: "Business Development Intern",
          department: "Business Development",
          type: "Internship",
          location: "Remote",
          skills: ["Research", "Communication", "Analytics", "Learning Agility"],
          description: "Support business development activities and gain hands-on experience in enterprise SaaS."
        },
        {
          title: "Operations Intern",
          department: "Service Operations",
          type: "Internship",
          location: "Remote",
          skills: ["Process Documentation", "Data Entry", "Customer Support", "Project Coordination"],
          description: "Assist with service operations and gain exposure to client implementation processes."
        }
      ]
    },
    {
      category: "Subcontracted Specialists",
      icon: UserPlus,
      description: "Work with us as an independent specialist on project-based engagements",
      positions: [
        {
          title: "ISO Compliance Consultant",
          department: "Compliance Services",
          type: "Contract",
          location: "Remote/Global",
          skills: ["ISO 9001", "ISO/IEC 27001", "ISO/IEC 42001", "Audit Experience"],
          description: "Provide specialized compliance expertise for client implementations."
        },
        {
          title: "Industry Domain Expert",
          department: "Sector Solutions",
          type: "Contract",
          location: "Remote",
          skills: ["Healthcare", "Manufacturing", "Finance", "Government"],
          description: "Deliver sector-specific knowledge for specialized industry solutions."
        },
        {
          title: "AI/ML Implementation Specialist",
          department: "Technical Services",
          type: "Contract",
          location: "Remote",
          skills: ["Machine Learning", "Python", "TensorFlow", "Implementation"],
          description: "Lead AI implementation projects for enterprise clients."
        },
        {
          title: "Training & Certification Instructor",
          department: "Education Services",
          type: "Contract",
          location: "Remote/Hybrid",
          skills: ["Training Development", "Adult Education", "Technical Writing"],
          description: "Develop and deliver professional certification programs."
        }
      ]
    },
    {
      category: "Business Partners",
      icon: Handshake,
      description: "Partner with Nebusis® to expand our ecosystem and market reach",
      positions: [
        {
          title: "Technology Integration Partner",
          department: "Strategic Partnerships",
          type: "Partnership",
          location: "Global",
          skills: ["API Integration", "Enterprise Software", "Cloud Services"],
          description: "Integrate your technology solutions with our platform ecosystem."
        },
        {
          title: "Regional Business Partner",
          department: "Market Expansion",
          type: "Partnership",
          location: "Regional",
          skills: ["Sales", "Local Market Knowledge", "Business Development"],
          description: "Represent Nebusis® solutions in your regional market."
        },
        {
          title: "Implementation Services Partner",
          department: "Professional Services",
          type: "Partnership",
          location: "Global",
          skills: ["Project Management", "Change Management", "Client Services"],
          description: "Deliver implementation and consulting services to our clients."
        }
      ]
    }
  ];

  const companyValues = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI-powered enterprise solutions."
    },
    {
      icon: Users,
      title: "Collaborative Excellence",
      description: "We believe the best solutions come from diverse teams working together."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "We focus on delivering measurable value to our clients and partners."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Our solutions help organizations worldwide transform and thrive."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-nebusis-primary to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Nebusis<span className="text-yellow-400">®</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              Join our ecosystem as staff, subcontracted specialist, or business partner to transform 
              how organizations approach digital transformation, compliance, and AI-powered enterprise solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-nebusis-primary hover:bg-gray-100 font-bold px-8 py-4">
                <UserPlus className="mr-2 h-5 w-5" />
                Explore Opportunities
              </Button>
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-nebusis-primary font-bold px-8 py-4">
                <Link href="/contact" className="flex items-center">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join Nebusis<span className="text-yellow-400">®</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building the future of enterprise technology with a team of passionate innovators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-nebusis-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Opportunities to Join Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're seeking a staff position, interested in specialist contracting opportunities, 
              or looking to establish a business partnership, we have multiple ways to join our ecosystem.
            </p>
          </div>

          <Tabs defaultValue="staff" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="staff">Staff Positions</TabsTrigger>
              <TabsTrigger value="subcontracted">Specialists</TabsTrigger>
              <TabsTrigger value="business">Partners</TabsTrigger>
            </TabsList>

            {opportunities.map((category, categoryIndex) => (
              <TabsContent key={categoryIndex} value={
                category.category === "Staff Positions" ? "staff" : 
                category.category === "Subcontracted Specialists" ? "subcontracted" : 
                "business"
              }>
                <div className="mb-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-nebusis-primary rounded-2xl p-3">
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.category}</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.positions.map((position, positionIndex) => (
                    <Card key={positionIndex} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedRole(position.title)}>
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-lg">{position.title}</CardTitle>
                          <Badge variant="outline">{position.type}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            {position.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 text-sm">{position.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {position.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-nebusis-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Shape the Future?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join our ecosystem as staff, specialist, or partner to transform how organizations leverage technology for growth and compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-nebusis-primary hover:bg-gray-100 font-bold px-8 py-4">
              <a href="https://app.nebusis.com/contexto/solicitud_colaborador.php?hash=NmFYdkY0T2JjZkk2N08vbWw3K1QwUT09" target="_blank" rel="noopener noreferrer">
                Apply for a Position
              </a>
            </Button>
            <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-nebusis-primary font-bold px-8 py-4">
              <Link href="/contact?type=partnership">
                Discuss Partnership
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}