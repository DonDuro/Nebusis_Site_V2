import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link, useRoute } from "wouter";
import { 
  Shield, 
  Cloud, 
  BarChart3, 
  Zap, 
  Code, 
  Server, 
  GraduationCap, 
  HeadphonesIcon,
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  School,
  Heart,
  Factory
} from "lucide-react";
import DigitalTransformationQuoteForm from "@/components/forms/digital-transformation-quote-form";

const OTHER_SERVICES = [
  {
    productId: "NEB-DT-001",
    title: "Nebusis® Digital Transformation Services",
    description: "We guide organizations through full or phased digital transformation—modernizing legacy systems, integrating data and workflows, and enabling technology-driven decision-making using AI, IoT, and automation.",
    icon: Zap,
    features: [
      "Legacy System Modernization",
      "Data & Workflow Integration",
      "Technology-Driven Decision Making",
      "AI, IoT, and Automation Implementation",
      "Phased Transformation Planning"
    ],
    category: "Transformation",
    pricing: "Custom Quote",
    slug: "digital-transformation"
  },
  {
    productId: "NEB-DT-002",
    title: "Nebusis® Special Projects",
    description: "Tailored consulting, development, and integration projects across sectors, including smart city initiatives, public sector reform, industrial automation, and emerging market enablement. Fully project-managed by Nebusis® experts.",
    icon: Code,
    features: [
      "Smart City Initiatives",
      "Public Sector Reform",
      "Industrial Automation",
      "Emerging Market Enablement",
      "Full Project Management"
    ],
    category: "Consulting",
    pricing: "Custom Quote",
    slug: "special-projects"
  },
  {
    productId: "NEB-DT-003",
    title: "Nebusis® Project Management Office (PMO)",
    description: "Get expert-led design, planning, and implementation support for complex digital initiatives. Our PMO ensures projects meet scope, time, cost, and quality goals—with ISO-compliant methods.",
    icon: BarChart3,
    features: [
      "Expert-Led Design & Planning",
      "Complex Digital Initiative Support",
      "Scope, Time, Cost Management",
      "Quality Assurance",
      "ISO-Compliant Methods"
    ],
    category: "Management",
    pricing: "Custom Quote",
    slug: "pmo"
  },
  {
    productId: "NEB-DT-004",
    title: "Nebusis® Blockchain Solutions",
    description: "Deploy custom-built or modular blockchain applications for compliance, traceability, secure transactions, and decentralized data integrity—ideal for finance, supply chain, and public governance.",
    icon: Shield,
    features: [
      "Compliance & Traceability",
      "Secure Transactions",
      "Decentralized Data Integrity",
      "Finance Applications",
      "Supply Chain & Public Governance"
    ],
    category: "Blockchain",
    pricing: "Custom Quote",
    slug: "blockchain"
  },
  {
    productId: "NEB-DT-005",
    title: "Nebusis® IoT Integration",
    description: "Harness Internet of Things (IoT) data to improve operations, safety, and performance. We deploy smart sensors and connect them to Nebusis® apps for automated alerts, reporting, and predictive maintenance.",
    icon: Cloud,
    features: [
      "Smart Sensor Deployment",
      "Operations & Safety Improvement",
      "Performance Enhancement",
      "Automated Alerts & Reporting",
      "Predictive Maintenance"
    ],
    category: "IoT",
    pricing: "Custom Quote",
    slug: "iot-integration"
  },
  {
    productId: "NEB-DT-006",
    title: "Nebusis® Artificial Intelligence Services",
    description: "Embed AI into your business operations—from intelligent process automation and predictive analytics to natural language processing and conversational bots. Aligned with ethical and secure AI practices.",
    icon: Server,
    features: [
      "Intelligent Process Automation",
      "Predictive Analytics",
      "Natural Language Processing",
      "Conversational Bots",
      "Ethical & Secure AI Practices"
    ],
    category: "AI",
    pricing: "Custom Quote",
    slug: "ai-services"
  },
  {
    productId: "NEB-DT-007",
    title: "Nebusis® Web & App Development",
    description: "Custom development services tailored to your Nebusis® environment. We create specialized integrations, advanced reporting dashboards, workflow automation tools, and data connectors that work seamlessly with your existing Nebusis® Business Suite to unlock additional operational capabilities.",
    icon: Code,
    features: [
      "Nebusis® App Extensions & Integrations",
      "Custom Data Connectors & APIs",
      "Specialized Reporting Dashboards",
      "Workflow Automation Tools",
      "Third-Party System Bridges"
    ],
    category: "Integration",
    pricing: "Custom Quote",
    slug: "web-app-development"
  }
];

const INDUSTRIES = [
  {
    title: "Government & Public Sector",
    description: "Comprehensive digital transformation solutions for government agencies, municipalities, and public sector organizations. We specialize in modernizing legacy systems, implementing secure cloud infrastructure, and ensuring regulatory compliance.",
    icon: Building2,
    features: [
      "Digital Government Services",
      "Citizen Engagement Platforms",
      "Secure Data Management",
      "Regulatory Compliance",
      "Legacy System Modernization"
    ],
    category: "Public Sector",
    pricing: "Custom Quote",
    slug: "government"
  },
  {
    title: "Small & Medium Enterprises (SMEs)",
    description: "Tailored technology solutions designed for growing businesses. From CRM systems to automated workflows, we help SMEs leverage technology to compete effectively in their markets.",
    icon: Users,
    features: [
      "Business Process Automation",
      "Customer Relationship Management",
      "Financial Management Systems",
      "E-commerce Solutions",
      "Cloud Migration Services"
    ],
    category: "Business",
    pricing: "From $2,500/month",
    slug: "smes"
  },
  {
    title: "Education & Training",
    description: "Modern educational technology solutions for schools, universities, and training organizations. We create engaging learning platforms, student management systems, and certification programs.",
    icon: School,
    features: [
      "Learning Management Systems",
      "Student Information Systems",
      "Online Certification Platforms",
      "Virtual Classroom Solutions",
      "Educational Content Management"
    ],
    category: "Education",
    pricing: "From $1,500/month",
    slug: "education"
  },
  {
    title: "Healthcare & Medical",
    description: "HIPAA-compliant healthcare technology solutions including electronic health records, telemedicine platforms, and medical practice management systems.",
    icon: Heart,
    features: [
      "Electronic Health Records",
      "Telemedicine Platforms",
      "Medical Practice Management",
      "Patient Portal Systems",
      "Healthcare Analytics"
    ],
    category: "Healthcare",
    pricing: "From $3,000/month",
    slug: "health"
  },
  {
    title: "Manufacturing & Industrial",
    description: "Industrial IoT solutions, supply chain management, and manufacturing execution systems. We help manufacturers optimize operations and embrace Industry 4.0 technologies.",
    icon: Factory,
    features: [
      "Industrial IoT Integration",
      "Supply Chain Management",
      "Manufacturing Execution Systems",
      "Quality Management Systems",
      "Predictive Maintenance"
    ],
    category: "Industrial",
    pricing: "From $5,000/month",
    slug: "manufacturing"
  },
  {
    title: "Other Industries",
    description: "Custom solutions for specialized industries including retail, hospitality, logistics, and emerging sectors. We adapt our technology expertise to meet unique industry requirements.",
    icon: BarChart3,
    features: [
      "Retail Management Systems",
      "Hospitality Solutions",
      "Logistics Optimization",
      "Custom Industry Solutions",
      "Specialized Integrations"
    ],
    category: "Custom",
    pricing: "Custom Quote",
    slug: "others"
  }
];

const SERVICE_CATEGORIES = [
  { name: "Transformation", color: "bg-nebusis-bg text-nebusis-primary" },
  { name: "Consulting", color: "bg-gray-100 text-gray-800" },
  { name: "Management", color: "bg-slate-100 text-slate-800" },
  { name: "Blockchain", color: "bg-gray-100 text-gray-800" },
  { name: "IoT", color: "bg-slate-100 text-slate-800" },
  { name: "AI", color: "bg-gray-100 text-gray-800" },
  { name: "Development", color: "bg-slate-100 text-slate-800" },
  { name: "Public Sector", color: "bg-gray-100 text-gray-800" },
  { name: "Business", color: "bg-slate-100 text-slate-800" },
  { name: "Education", color: "bg-gray-100 text-gray-800" },
  { name: "Healthcare", color: "bg-slate-100 text-slate-800" },
  { name: "Industrial", color: "bg-[var(--subtle-amber)] text-gray-800" },
  { name: "Custom", color: "bg-gray-100 text-gray-800" }
];

export default function OtherServices() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [match, params] = useRoute("/other-services/:service");
  const [industryMatch, industryParams] = useRoute("/industries/:industry");
  const [isIndustryPage] = useRoute("/industries");
  
  // Determine what content to show
  const isSpecificService = match && params?.service;
  const isSpecificIndustry = industryMatch && industryParams?.industry;
  const isMainIndustryPage = isIndustryPage && !isSpecificIndustry;
  
  // Find specific service or industry
  const currentService = isSpecificService ? OTHER_SERVICES.find(s => s.slug === params?.service) : null;
  const currentIndustry = isSpecificIndustry ? INDUSTRIES.find(i => i.slug === industryParams?.industry) : null;
  
  // Handle specific service page
  if (currentService) {
    const Icon = currentService.icon;
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Service Hero */}
        <section className="bg-gradient-to-r from-[hsl(210,45%,40%)] to-[hsl(210,45%,30%)] text-white py-20 relative overflow-hidden">
          {/* Floating decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/15 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-yellow-400/30 rounded-full animate-float"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              {/* Enhanced icon with connection nodes */}
              <div className="relative inline-block mb-6">
                <Icon className="h-16 w-16 mx-auto text-white relative z-10" />
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-white/80 rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-1/2 -left-6 w-2 h-2 bg-yellow-400/70 rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-1/2 -right-6 w-2 h-2 bg-white/60 rounded-full animate-pulse delay-700"></div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {currentService.title.split(' ').map((word, index) => 
                  word === 'Digital' || word === 'Transformation' || word === 'AI' || word === 'IoT' || word === 'PMO' || word === 'Blockchain' ? (
                    <span key={index} className="text-yellow-400">{word} </span>
                  ) : (
                    <span key={index}>{word} </span>
                  )
                )}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                {currentService.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 hover:text-black font-semibold" asChild>
                  <Link href="/contact">
                    Get Started
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-[hsl(210,45%,40%)] transition-all duration-300" asChild>
                  <Link href="/demos">
                    Schedule Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                <ul className="space-y-4">
                  {currentService.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-[hsl(210,45%,40%)] mr-3 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Pricing</h2>
                <p className="text-2xl font-semibold text-[hsl(210,45%,40%)] mb-4">{currentService.pricing}</p>
                <p className="text-gray-600 mb-6">
                  Our pricing is tailored to your specific needs and requirements. 
                  Contact us for a detailed quote based on your project scope.
                </p>
                {currentService.pricing === "Custom Quote" ? (
                  <Dialog open={isQuoteFormOpen} onOpenChange={setIsQuoteFormOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[hsl(210,45%,40%)] hover:bg-[hsl(210,45%,30%)] text-white">Get Custom Quote</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Request Quote for {currentService.title}</DialogTitle>
                      </DialogHeader>
                      <DigitalTransformationQuoteForm
                        serviceType={currentService.slug}
                        serviceName={currentService.title}
                        onSuccess={() => setIsQuoteFormOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button className="bg-[hsl(210,45%,40%)] hover:bg-[hsl(210,45%,30%)] text-white" asChild>
                    <Link href="/pricing">
                      Get Instant Quote
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  // Handle specific industry page
  if (currentIndustry) {
    const Icon = currentIndustry.icon;
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Industry Hero */}
        <section className="bg-gradient-to-r from-[hsl(210,45%,40%)] to-[hsl(210,45%,30%)] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Icon className="h-16 w-16 mx-auto mb-6 text-white" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {currentIndustry.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {currentIndustry.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Get Started
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-[hsl(210,45%,40%)] bg-white hover:bg-[hsl(210,45%,40%)] hover:text-white" asChild>
                  <Link href="/demos">
                    Schedule Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Industry Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Industry Solutions</h2>
                <ul className="space-y-4">
                  {currentIndustry.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-[hsl(210,45%,40%)] mr-3 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Pricing</h2>
                <p className="text-2xl font-semibold text-[hsl(210,45%,40%)] mb-4">{currentIndustry.pricing}</p>
                <p className="text-gray-600 mb-6">
                  Industry-specific solutions designed to meet your unique requirements. 
                  Contact us for a detailed consultation and custom quote.
                </p>
                <Button asChild>
                  <Link href="/pricing">
                    Get Instant Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  // Handle main industries page
  if (isMainIndustryPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Industries Hero */}
        <section className="bg-gradient-to-r from-[hsl(210,45%,40%)] to-[hsl(210,45%,30%)] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Industry Solutions
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Specialized technology solutions tailored for your industry's unique challenges and requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Get Started Today
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-[hsl(210,45%,40%)] bg-white hover:bg-[hsl(210,45%,40%)] hover:text-white" asChild>
                  <Link href="/demos">
                    Schedule Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Industries Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Industries We Serve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide specialized solutions across multiple industries, 
                understanding the unique challenges and requirements of each sector.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INDUSTRIES.map((industry) => {
                const Icon = industry.icon;
                const categoryColor = SERVICE_CATEGORIES.find(
                  cat => cat.name === industry.category
                )?.color || "bg-gray-100 text-gray-800";
                
                return (
                  <Card key={industry.slug} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="h-8 w-8 text-[hsl(210,45%,40%)]" />
                        <Badge className={categoryColor}>
                          {industry.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{industry.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {industry.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Solutions:</h4>
                        <ul className="space-y-1">
                          {industry.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <CheckCircle className="h-4 w-4 text-[hsl(210,45%,40%)] mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Starting from</p>
                          <p className="font-semibold text-[hsl(210,45%,40%)]">{industry.pricing}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/industries/${industry.slug}`}>
                              Learn More
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  // Default: main other services page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(210,45%,40%)] to-[hsl(210,45%,30%)] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Sophisticated Digital Transformation Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-white bg-opacity-15 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-white border-opacity-20">
                <div className="relative">
                  {/* Central Hub */}
                  <div className="w-8 h-8 bg-white bg-opacity-90 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-[hsl(210,45%,40%)] rounded-sm"></div>
                  </div>
                  {/* Connection Lines and Nodes */}
                  <div className="absolute -top-3 -left-3 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -top-3 -right-3 w-3 h-3 bg-white bg-opacity-90 rounded-full"></div>
                  <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-white bg-opacity-90 rounded-full"></div>
                  {/* Connection Lines */}
                  <div className="absolute top-1 left-1 w-6 h-6 border-t border-l border-yellow-400 border-opacity-60 rounded-tl-lg"></div>
                  <div className="absolute top-1 right-1 w-6 h-6 border-t border-r border-white border-opacity-40 rounded-tr-lg"></div>
                  <div className="absolute bottom-1 right-1 w-6 h-6 border-b border-r border-yellow-400 border-opacity-60 rounded-br-lg"></div>
                  <div className="absolute bottom-1 left-1 w-6 h-6 border-b border-l border-white border-opacity-40 rounded-bl-lg"></div>
                </div>
              </div>
              {/* Decorative Tech Elements */}
              <div className="absolute -top-4 -right-4 w-6 h-6 border-2 border-yellow-400 rounded-lg opacity-60 transform rotate-12"></div>
              <div className="absolute -bottom-4 -left-4 w-5 h-5 bg-yellow-400 rounded-sm opacity-40 transform rotate-45"></div>
              <div className="absolute top-2 -right-8 w-3 h-3 border border-white border-opacity-50 rounded-full"></div>
              <div className="absolute bottom-2 -left-8 w-4 h-4 bg-white bg-opacity-20 rounded-lg transform -rotate-12"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Digital Transformation Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              <span className="text-yellow-400 font-semibold">Comprehensive technology solutions</span> and expert consulting services 
              to accelerate your digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Get Started Today
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-[hsl(210,45%,40%)] bg-white hover:bg-[hsl(210,45%,40%)] hover:text-white" asChild>
                <Link href="/demos">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-16 w-8 h-8 border border-white border-opacity-20 rounded-xl transform rotate-12"></div>
        <div className="absolute bottom-24 right-20 w-6 h-6 bg-yellow-400 bg-opacity-30 rounded-lg"></div>
        <div className="absolute top-1/3 right-12 w-4 h-4 border border-yellow-400 border-opacity-40 rounded-full"></div>
        <div className="absolute bottom-40 left-24 w-5 h-5 bg-white bg-opacity-20 rounded-lg transform -rotate-45"></div>
        <div className="absolute top-16 right-1/3 w-3 h-3 bg-yellow-400 bg-opacity-50 rounded-full"></div>
        <div className="absolute bottom-16 left-1/4 w-4 h-4 border border-white border-opacity-30 rounded-sm transform rotate-45"></div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Services Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our <span className="text-yellow-500 font-semibold">expert team</span> provides comprehensive solutions across multiple domains, 
              from cybersecurity to cloud migration and custom development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OTHER_SERVICES.map((service) => {
              const Icon = service.icon;
              const categoryColor = SERVICE_CATEGORIES.find(
                cat => cat.name === service.category
              )?.color || "bg-gray-100 text-gray-800";

              return (
                <Card key={service.slug} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-8 w-8 text-[hsl(210,45%,40%)]" />
                      <Badge className={categoryColor}>
                        {service.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-gray-900">Key Features:</h4>
                        <ul className="space-y-1">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-[hsl(210,45%,40%)] mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-[hsl(210,45%,40%)]">
                            {service.pricing}
                          </span>
                          <Button size="sm" className="bg-[hsl(210,45%,40%)] hover:bg-[hsl(210,45%,30%)]" asChild>
                            <Link href={`/contact?service=${service.slug}`}>
                              Get Quote
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
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

      {/* Call to Action */}
      <section className="bg-[hsl(210,45%,40%)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our <span className="text-yellow-400 font-semibold">experts</span> help you navigate the complexities of modern technology 
            and achieve your business objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-nebusis" asChild>
              <Link href="/demos">
                Schedule Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}