import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, Heart, Shield, Leaf, ShoppingCart, Users, 
  GraduationCap, Building, Landmark, Monitor,
  ArrowRight, CheckCircle, Star
} from 'lucide-react';
import { Link } from 'wouter';

const SECTOR_SUITES = [
  {
    id: 1,
    productId: "NEB-SS-001",
    name: "Semiconductors & Advanced Manufacturing",
    slug: "semiconductors-manufacturing",
    icon: Cpu,
    color: "blue",
    description: "Designed to meet ISO 9001, ISO 56002, ISO 27001. Ensures end-to-end visibility, risk management, and production oversight for precision-based industries.",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® CyberWatch", 
      "Nebusis® SmartBooks",
      "Nebusis® Supply Chain Wizard",
      "Nebusis® Inventory Wizard",
      "Nebusis® Performance Tracker",
      "Nebusis® Workflow Engine"
    ],
    standards: ["ISO 9001", "ISO 56002", "ISO 27001"],
    targetIndustries: ["Semiconductor Manufacturing", "Advanced Manufacturing", "Precision Industries", "Electronics"]
  },
  {
    id: 2,
    productId: "NEB-SS-002",
    name: "Healthcare & Life Sciences",
    slug: "healthcare-life-sciences",
    icon: Heart,
    color: "gray",
    description: "Complies with ISO 15189, ISO 20387, HIPAA, and GDPR. Ideal for hospitals, pharmaceutical companies, and biotech organizations.",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® Multiomics Wizard",
      "Nebusis® e-Learning Wizard",
      "Nebusis® LegalFlow",
      "Nebusis® CyberWatch",
      "Nebusis® PowerDocs",
      "Nebusis® SmartBooks"
    ],
    standards: ["ISO 15189", "ISO 20387", "HIPAA", "GDPR"],
    targetIndustries: ["Hospitals", "Pharmaceutical", "Biotech", "Medical Research"]
  },
  {
    id: 3,
    productId: "NEB-SS-003",
    name: "Energy & Utilities",
    slug: "energy-utilities",
    icon: Leaf,
    color: "slate",
    description: "Supports power generation, renewable energy, and utility operations with ISO 50001 compliance and smart grid management.",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® ESG GreenCore",
      "Nebusis® SmartBooks",
      "Nebusis® CyberWatch",
      "Nebusis® Workflow Engine",
      "Nebusis® Performance Tracker"
    ],
    standards: ["ISO 50001", "Environmental Standards", "Utility Regulations"],
    targetIndustries: ["Power Generation", "Renewable Energy", "Utility Companies", "Smart Grid"]
  },
  {
    id: 4,
    productId: "NEB-SS-004",
    name: "Financial Services",
    slug: "financial-services",
    icon: Building,
    color: "gray",
    description: "For banks, insurance companies, and fintech firms. Supports ISO 27001, risk governance, and regulatory compliance.",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® LegalFlow",
      "Nebusis® SmartBooks",
      "Nebusis® PowerDocs",
      "Nebusis® CyberWatch",
      "Nebusis® Client360",
      "Nebusis® Engage",
      "Nebusis® Performance Tracker"
    ],
    standards: ["ISO 27001", "Financial Regulations", "Risk Management", "SOX Compliance"],
    targetIndustries: ["Banks", "Insurance", "Fintech", "Investment Firms"]
  },
  {
    id: 5,
    productId: "NEB-SS-005",
    name: "Security & Defense",
    slug: "security-defense",
    icon: Shield,
    color: "slate",
    description: "Supports defense contractors, cybersecurity firms, and security operations with ISO 18788 compliance and threat management.",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® CyberWatch",
      "Nebusis® LegalFlow",
      "Nebusis® Performance Tracker",
      "Nebusis® PowerDocs"
    ],
    standards: ["ISO 18788", "Defense Standards", "Security Compliance"],
    targetIndustries: ["Cybersecurity", "Defense Contractors", "Security Operations", "Military"]
  },
  {
    id: 6,
    productId: "NEB-SS-006",
    name: "Government & Public Sector",
    slug: "government-public-sector",
    icon: Landmark,
    color: "blue",
    description: "Supports federal, state, and local government agencies with digital governance, compliance, and public service delivery.",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® Workflow Engine",
      "Nebusis® CyberWatch",
      "Nebusis® LegalFlow",
      "Nebusis® SmartBooks",
      "Nebusis® PowerDocs",
      "Nebusis® Performance Tracker"
    ],
    standards: ["Government Standards", "Public Sector Compliance", "Digital Governance"],
    targetIndustries: ["Federal", "State", "Local Government", "Public Agencies"]
  },
  {
    id: 7,
    productId: "NEB-SS-007",
    name: "Manufacturing & Industrial",
    slug: "manufacturing-industrial",
    icon: Building,
    color: "gray",
    description: "Supports heavy industry, automotive, and manufacturing operations with ISO 9001 compliance and operational excellence.",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® Inventory Wizard",
      "Nebusis® Workflow Engine",
      "Nebusis® Performance Tracker",
      "Nebusis® CyberWatch",
      "Nebusis® SmartBooks"
    ],
    standards: ["ISO 9001", "Manufacturing Standards", "Safety Compliance"],
    targetIndustries: ["Heavy Industry", "Automotive", "Manufacturing", "Industrial Operations"]
  },
  {
    id: 8,
    productId: "NEB-SS-008",
    name: "Education & Research",
    slug: "education-research",
    icon: GraduationCap,
    color: "yellow",
    description: "Supports universities, research institutions, and academic organizations with compliance, research management, and educational excellence.",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® e-Learning Wizard",
      "Nebusis® PowerDocs",
      "Nebusis® PeopleCore",
      "Nebusis® Performance Tracker"
    ],
    standards: ["Educational Standards", "Research Compliance", "Academic Quality"],
    targetIndustries: ["Universities", "Research Institutions", "Academic Organizations", "Educational Networks"]
  },
  {
    id: 9,
    productId: "NEB-SS-009",
    name: "Transportation & Logistics",
    slug: "transportation-logistics",
    icon: Monitor,
    color: "slate",
    description: "Supports shipping, freight, aviation, and logistics operations with supply chain visibility and compliance management.",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® Inventory Wizard",
      "Nebusis® Workflow Engine",
      "Nebusis® Performance Tracker",
      "Nebusis® CyberWatch",
      "Nebusis® SmartBooks"
    ],
    standards: ["Transportation Standards", "Logistics Compliance", "Supply Chain Management"],
    targetIndustries: ["Shipping", "Freight", "Aviation", "Logistics Providers"]
  },
  {
    id: 10,
    productId: "NEB-SS-010",
    name: "Retail & E-commerce",
    slug: "retail-ecommerce",
    icon: ShoppingCart,
    color: "gray",
    description: "Supports online retail, consumer goods, and e-commerce operations with inventory management, customer engagement, and sales optimization.",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® Inventory Wizard",
      "Nebusis® Engage",
      "Nebusis® Client360",
      "Nebusis® SmartBooks"
    ],
    standards: ["Retail Compliance", "Consumer Protection", "E-commerce Standards"],
    targetIndustries: ["Online Retail", "Consumer Goods", "E-commerce Platforms", "Retail Chains"]
  },
  {
    id: 11,
    productId: "NEB-SS-011",
    name: "BodegaMonster",
    slug: "bodegamonster",
    icon: ShoppingCart,
    color: "blue",
    description: "A powerful, all-in-one platform to digitize and streamline your store operations for small and medium-sized retail food businesses.",
    apps: [
      "Nebusis® SmartBooks",
      "Nebusis® Inventory Wizard", 
      "Nebusis® Engage",
      "Nebusis® PeopleCore",
      "Nebusis® Workflow Engine"
    ],
    standards: ["Food Safety Compliance", "Labor Standards", "POS Integration"],
    targetIndustries: ["Convenience Stores", "Neighborhood Markets", "Bodegas", "Independent Supermarkets"]
  }
];

export default function SectorSuites() {
  const [selectedSuite, setSelectedSuite] = useState<number | null>(null);

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
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">Industry-Tailored Solutions</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Nebusis® <span className="text-yellow-300">Sector Suites</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-4xl leading-relaxed">
              Transform your industry with pre-configured application bundles designed for 
              compliance, efficiency, and strategic growth
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <CheckCircle className="h-10 w-10 mx-auto mb-4 text-green-300" />
                <h3 className="font-bold text-lg mb-2">ISO-Compliant</h3>
                <p className="text-sm opacity-90">Built-in compliance frameworks and automated reporting</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <Star className="h-10 w-10 mx-auto mb-4 text-yellow-300" />
                <h3 className="font-bold text-lg mb-2">Industry-Specific</h3>
                <p className="text-sm opacity-90">Tailored applications for your sector's unique needs</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <ArrowRight className="h-10 w-10 mx-auto mb-4 text-nebusis-light" />
                <h3 className="font-bold text-lg mb-2">Complete Solution</h3>
                <p className="text-sm opacity-90">Training, support, and seamless integration included</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Benefits Section */}
        <div className="mb-12">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose Sector Suites?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="w-16 h-16 bg-nebusis-bg rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-nebusis-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Industry-Specific</h3>
                  <p className="text-gray-600">Pre-configured for your sector's unique compliance and operational needs</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cost-Effective</h3>
                  <p className="text-gray-600">Bundled pricing offers significant savings compared to individual apps</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <ArrowRight className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Faster Implementation</h3>
                  <p className="text-gray-600">Pre-integrated solutions mean quicker deployment and time-to-value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sector Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SECTOR_SUITES.map((suite) => {
            const IconComponent = suite.icon;
            return (
              <Card 
                key={suite.id} 
                className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer bg-white border-0 shadow-lg overflow-hidden"
                onClick={() => setSelectedSuite(suite.id)}
              >
                {/* Gradient Header */}
                <div className={`h-24 bg-gradient-to-r ${
                  suite.color === 'blue' ? 'from-nebusis-primary to-nebusis-dark' :
                  suite.color === 'gray' ? 'from-gray-500 to-gray-600' :
                  suite.color === 'slate' ? 'from-slate-500 to-slate-600' :
                  'from-yellow-500 to-yellow-600'
                } relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
                      {suite.apps.length} Apps
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-nebusis-primary transition-colors">
                    {suite.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {suite.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 space-y-4">
                  {/* Key Standards */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Standards</h4>
                    <div className="flex flex-wrap gap-1">
                      {suite.standards.slice(0, 3).map((standard) => (
                        <Badge key={standard} variant="outline" className="text-xs bg-white">
                          {standard}
                        </Badge>
                      ))}
                      {suite.standards.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-white">
                          +{suite.standards.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Featured Apps */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Featured Applications</h4>
                    <div className="space-y-1">
                      {suite.apps.slice(0, 3).map((app, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-nebusis-primary rounded-full"></div>
                          {app.replace('Nebusis® ', '')}
                        </div>
                      ))}
                      {suite.apps.length > 3 && (
                        <div className="text-sm text-gray-500 italic">
                          +{suite.apps.length - 3} additional applications
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Industry Visual */}
                  <div className={`relative overflow-hidden rounded-lg p-6 text-center bg-gradient-to-br ${
                    suite.color === 'blue' ? 'from-nebusis-bg to-nebusis-light' :
                    suite.color === 'gray' ? 'from-gray-100 to-gray-200' :
                    suite.color === 'slate' ? 'from-slate-100 to-slate-200' :
                    'from-yellow-100 to-yellow-200'
                  }`}>
                    <div className="relative">
                      <div className="text-4xl mb-3 opacity-80">
                        {suite.id === 1 && '🔬'} {/* Semiconductors & Advanced Manufacturing */}
                        {suite.id === 2 && '🏥'} {/* Healthcare & Life Sciences */}
                        {suite.id === 3 && '⚡'} {/* Energy & Utilities */}
                        {suite.id === 4 && '🏦'} {/* Financial Services */}
                        {suite.id === 5 && '🛡️'} {/* Security & Defense */}
                        {suite.id === 6 && '🏛️'} {/* Government & Public Sector */}
                        {suite.id === 7 && '🏭'} {/* Manufacturing & Industrial */}
                        {suite.id === 8 && '🎓'} {/* Education & Research */}
                        {suite.id === 9 && '🚛'} {/* Transportation & Logistics */}
                        {suite.id === 10 && '🛒'} {/* Retail & E-commerce */}
                        {suite.id === 11 && '🏪'} {/* BodegaMonster */}
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Target Industries</p>
                      <p className="text-xs text-gray-600">
                        {suite.targetIndustries.slice(0, 2).join(' • ')}
                        {suite.targetIndustries.length > 2 && ` +${suite.targetIndustries.length - 2} more`}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-white bg-opacity-20 rounded-full -mr-2 -mt-2"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 bg-white bg-opacity-15 rounded-full -ml-1 -mb-1"></div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-nebusis-primary to-nebusis-dark hover:from-nebusis-dark hover:to-nebusis-dark text-white shadow-lg"
                    asChild
                  >
                    <Link href={`/sector-suites/${suite.slug}`}>
                      Explore Suite <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-nebusis-primary to-nebusis-accent text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Need a Custom Sector Suite?
              </h2>
              <p className="text-nebusis-bg mb-6 max-w-2xl mx-auto">
                Don't see your industry listed? We can create a custom sector suite tailored to your specific needs and compliance requirements.
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-nebusis-primary hover:bg-nebusis-bg"
                asChild
              >
                <Link href="/contact">
                  Contact Our Experts
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}