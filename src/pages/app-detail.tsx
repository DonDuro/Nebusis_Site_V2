import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Play, ShoppingCart, CheckCircle, Star, 
  Users, Building2, Zap, Shield, Cog, Globe, 
  ExternalLink, Download, TrendingUp, Award, Target, X,
  DollarSign, Megaphone, Briefcase, Factory, Heart, 
  Landmark, GraduationCap, Truck, ShoppingBag, Car,
  Cpu, Database, Network, Code, BarChart3, FileText,
  Stethoscope, Scale, Leaf, UserCheck, Package, Workflow,
  Clock, AlertCircle, Calculator, FileSpreadsheet, MessageSquare, Brain
} from "lucide-react";
import { Application } from "@/lib/types";
import { NEBUSIS_APPLICATIONS } from "@/lib/constants";
import { applications } from "@/lib/staticData";
import AppPricingCalculator from "@/components/pricing/app-pricing-calculator";

export default function AppDetail() {
  const { slug } = useParams();
  
  // Find application from static data
  const application = applications.find(app => app.slug === slug);

  const handlePurchaseApp = (app: Application) => {
    // Navigate to checkout with application details
    // Use Pro tier if available, otherwise use Starter tier
    const proTier = app.pricing?.pro;
    const starterTier = app.pricing?.starter;
    const purchaseTier = proTier || starterTier;
    const tierName = proTier ? 'pro' : 'starter';
    
    if (purchaseTier) {
      const price = typeof purchaseTier.price === 'string' ? 0 : purchaseTier.price; // Handle "quote" pricing
      if (price > 0) {
        const checkoutUrl = `/checkout?type=application&id=${app.id}&price=${price}&title=${encodeURIComponent(app.name)}&tier=${tierName}`;
        window.location.href = checkoutUrl;
      } else {
        // For quote-based pricing, redirect to contact/quote request
        window.location.href = `/contact?subject=${encodeURIComponent(`Quote Request: ${app.name}`)}&message=${encodeURIComponent(`I would like to request a quote for ${app.name} Enterprise licensing.`)}`;
      }
    }
  };

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4 text-xl">Application not found</div>
          <p className="text-gray-600 mb-6">The application you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/business-suite">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Business Suite
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const appConfig = NEBUSIS_APPLICATIONS.find(app => app.slug === application.slug);
  const IconComponent = appConfig?.icon;

  const getStatusBadge = () => {
    switch (application.status) {
      case "live":
        return <Badge className="bg-green-100 text-green-800">✅ Live Now</Badge>;
      case "beta":
        return <Badge className="bg-nebusis-bg text-nebusis-primary">🚀 Beta</Badge>;
      default:
        return <Badge className="bg-orange-100 text-orange-800">🛠️ Coming Soon</Badge>;
    }
  };

  const getProductNameParts = () => {
    // Split "Nebusis® ProductName" into "Nebusis®" and "ProductName"
    const nameParts = application.name.split(' ');
    if (nameParts.length >= 2 && nameParts[0] === 'Nebusis®') {
      return {
        brand: nameParts[0],
        product: nameParts.slice(1).join(' ')
      };
    }
    // Fallback for names that don't follow the pattern
    return {
      brand: 'Nebusis®',
      product: application.name.replace('Nebusis® ', '')
    };
  };



  const getShortTagline = () => {
    // Create short, compelling taglines for each app
    const taglines: Record<string, string> = {
      'complianceone': 'There is only one way to comply',
      'smartbooks': 'AI-Enhanced Financial Control & Automated Accounting Excellence',
      'engage': 'Digital Marketing, Sales Automation & Customer Relationship Management',
      'esg-greencore': 'Comprehensive ESG & Sustainability Management Platform',
      'legalflow': 'Legal Document & Contract Management with AI Review',
      'peoplecore': 'Human Resources & Workforce Management Platform',
      'supply-chain-wizard': 'Intelligent Supply Chain Optimization & Management',
      'workflow-engine': 'Business Process Automation & Workflow Management',
      'cyberwatch': 'Proactive Cybersecurity for Smart, Scalable Organizations',
      'knowledgecheck': 'Transform Professional Assessment with AI Intelligence',
      'performancetracker': 'Advanced PDCA-Driven Personnel Performance Management Ecosystem',
      'powerdocs': 'Intelligent Document Management & Collaboration',
      'e-learning-wizard': 'AI-Powered Learning Management for Regulated & Specialized Industries',
      'crunchwiz': 'Data Analytics Hub',
      'inventory-wizard': 'Smart Inventory Management & Optimization',
      'multiomics-wizard': 'Streamlining Precision Medicine Through Integrated Omics Workflows',
      'membercore': 'Total Membership Management for Modern Organizations',
      'wizspeek': 'Secure Messaging, Reinvented for Compliance-Driven Organizations',
      'emissionsflow': 'Smart Platform for Carbon Accounting & GHG Management',
      'selfcertpro': 'Self-Certify with Structure, Declare with Confidence',
      'zappformz': 'Simple, Secure and Controlled Data Collection',
      'interopwiz': 'Seamless System Integration',
      'control-core': 'COSO & INTOSAI Compliance Management Platform'
    };
    
    return taglines[application.slug] || 'Comprehensive Business Management Solution';
  };

  const getIndustryIcon = (industry: string) => {
    // Map industries to appropriate icons - handle variations and exact matches
    const industryIconMap: Record<string, any> = {
      // Basic Industries
      'Sales': DollarSign,
      'Marketing': Megaphone,
      'Professional Services': Briefcase,
      'Manufacturing': Factory,
      'Healthcare': Heart,
      'Government': Landmark,
      'Education': GraduationCap,
      'Transportation': Truck,
      'Retail': ShoppingBag,
      'Technology': Cpu,
      'Finance': Database,
      'Energy': Zap,
      
      // Variations and Exact Matches from Data
      'SMEs': Briefcase,
      'Startups': TrendingUp,
      'Small/Medium Business': Briefcase,
      'Financial Services': Database,
      'Healthcare & Life Sciences': Heart,
      'Government & Public Sector': Landmark,
      'Public Sector': Landmark,
      'Regulatory Bodies': Shield,
      'International Organizations': Globe,
      'Legal & Audit': Scale,
      'Remote Workforce': Users,
      'Regulated Sectors': Shield,
      'Retail/E-commerce': ShoppingBag,
      
      // Additional exact matches from application data
      'Corporate Environments': Factory,
      'Digital-First Organizations': Cpu,
      'Enterprise': Factory,
      'Large Enterprises': Factory,
      
      // Additional Industries
      'Telecommunications': Network,
      'Software': Code,
      'Analytics': BarChart3,
      'Legal': Scale,
      'Environmental': Leaf,
      'HR': UserCheck,
      'Supply Chain': Package,
      'Operations': Workflow,
      'Medical': Stethoscope,
      'Compliance': Shield,
      'Quality': Award,
      'Cybersecurity': Shield,
      'Banking': Landmark,
      'Insurance': Shield,
      'Consulting': Users,
      'Engineering': Cog,
      'Research': GraduationCap,
      'Logistics': Truck,
      'Pharmaceutical': Heart,
      'Aerospace': Target,
      'Defense': Shield,
      'Non-Profit': Heart,
      'Real Estate': Building2,
      'Media': Megaphone,
      'Entertainment': Star,
      'Hospitality': Building2,
      'Construction': Factory,
      'Agriculture': Leaf,
      'Mining': Factory,
      'Utilities': Zap,
      'Automotive': Car,
      
      // Catch-all industries
      'All Industries': Building2
    };
    
    return industryIconMap[industry] || Building2;
  };

  const getFeaturesOverview = () => {
    // Create app-specific features overview with enhanced design and unique features
    const appFeatures: Record<string, JSX.Element> = {
      'complianceone': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">ISO Compliance Management</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">AI-Enhanced Wizard System</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Multi-Framework Support</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Automated Evidence Capture</span>
            </div>
          </div>
        </div>
      ),
      'control-core': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Government Compliance</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">COSO Framework Integration</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">INTOSAI Compliance</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Risk Assessment & Monitoring</span>
            </div>
          </div>
        </div>
      ),
      'engage': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Megaphone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Digital Marketing & CRM</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Digital Marketing Automation</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Sales Pipeline Management</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Customer Relationship Tools</span>
            </div>
          </div>
        </div>
      ),
      'smartbooks': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Financial Management</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">AI-Enhanced Bookkeeping</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Real-time Financial Reports</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Automated Invoice Processing</span>
            </div>
          </div>
        </div>
      ),
      'powerdocs': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Document Management</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Intelligent Document Management</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Version Control & Collaboration</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Secure Document Storage</span>
            </div>
          </div>
        </div>
      ),
      'legalflow': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Legal Workflow Management</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">AI-Powered Document Review</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Contract Management</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Legal Workflow Automation</span>
            </div>
          </div>
        </div>
      ),
      'performancetracker': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">PDCA Personnel Performance Management</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-nebusis-primary font-bold text-xs">P</span>
              </div>
              <span className="text-sm font-medium text-gray-800">PLAN Phase - Personnel Performance Planning</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-nebusis-primary font-bold text-xs">D</span>
              </div>
              <span className="text-sm font-medium text-gray-800">DO Phase - Performance Execution Tracking</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-nebusis-primary font-bold text-xs">C</span>
              </div>
              <span className="text-sm font-medium text-gray-800">CHECK Phase - Performance Measurement & Analysis</span>
            </div>
          </div>
        </div>
      ),
      'zappformz': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <FileSpreadsheet className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Form Builder & Data Collection</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Visual Form Builder</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Enterprise Security Controls</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Advanced Analytics Dashboard</span>
            </div>
          </div>
        </div>
      ),
      'wizspeek': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Secure Communication</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Cross-Platform Messaging</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Secure File Sharing</span>
            </div>
          </div>
        </div>
      ),
      'peoplecore': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Human Resources Management</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Employee Profile Management</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Performance Tracking</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Time & Attendance Management</span>
            </div>
          </div>
        </div>
      ),
      'inventory-wizard': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Inventory Management</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Real-Time Tracking</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Predictive Analytics</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Automated Reordering</span>
            </div>
          </div>
        </div>
      ),
      'membercore': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Membership Management</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Universal Membership Lifecycle Management</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Dynamic Member Profiles</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Flexible Membership Types & Plans</span>
            </div>
          </div>
        </div>
      ),
      'cyberwatch': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Cybersecurity Management</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Threat Detection & Monitoring</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Security Incident Response</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Vulnerability Assessment</span>
            </div>
          </div>
        </div>
      ),
      'knowledgecheck': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Core Features</h3>
              <p className="text-xs text-gray-500">AI-Powered Assessment Platform</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Intelligent Adaptive Assessment</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Instant Scoring & Certification</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Universal Knowledge Domains</span>
            </div>
          </div>
        </div>
      ),
      'default': (
        <div className="bg-white rounded-lg p-6 h-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-nebusis-primary to-nebusis-primary/80 rounded-xl shadow-sm">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Key Features</h3>
              <p className="text-xs text-gray-500">Business Management</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Advanced Analytics</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Process Automation</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/50">
              <div className="w-6 h-6 bg-nebusis-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
              </div>
              <span className="text-sm font-medium text-gray-800">Real-time Monitoring</span>
            </div>
          </div>
        </div>
      )
    };

    return appFeatures[application.slug] || appFeatures['default'];
  };

  const getDetailedDescription = () => {
    // Create specific, clean descriptions for each app
    const descriptions: Record<string, string> = {
      'complianceone': 'ComplianceOne is the flagship compliance management platform that serves as the central hub for managing ISO standards, regulatory frameworks, and governance requirements through AI-enhanced, wizard-driven workflows. Rather than treating each standard as a separate application, ComplianceOne provides an integrated framework where organizations can enable specialized Wizards for ISO 9001, 14001, 27001, 45001, NIST, HIPAA, GDPR, SOX, and other compliance requirements. Each Wizard includes step-by-step guidance, built-in templates, automated evidence capture, and AI-assisted recommendations via NebuBot®.',
      'smartbooks': 'SmartBooks revolutionizes financial management through AI-enhanced automation, providing intelligent bookkeeping, real-time financial insights, and comprehensive reporting capabilities for businesses of all sizes.',
      'engage': 'Nebusis® Engage is a comprehensive customer lifecycle platform that unifies digital marketing for lead generation, sales automation for seamless onboarding, and customer relationship management for long-term retention. Transform your entire customer journey from first touch to loyal advocate with intelligent automation and data-driven insights.',
      'esg-greencore': 'ESG GreenCore provides comprehensive environmental, social, and governance management tools to help organizations measure, track, and improve their sustainability performance while meeting regulatory requirements.',
      'legalflow': 'LegalFlow streamlines legal document and contract management with AI-powered review capabilities, providing comprehensive legal workflow automation for organizations of all sizes.',
      'peoplecore': 'PeopleCore is a complete HR solution for modern organizations, streamlining employee lifecycle management, performance tracking, and workforce analytics. Built for organizations of all sizes, from startups to enterprise-level companies.',
      'supply-chain-wizard': 'Supply Chain Wizard provides intelligent supply chain optimization and management solutions, enabling organizations to streamline operations, reduce costs, and improve efficiency through advanced analytics and automation.',
      'workflow-engine': 'Workflow Engine delivers comprehensive business process automation and workflow management capabilities, enabling organizations to digitize and optimize their operations with visual workflow builders and intelligent automation.',
      'cyberwatch': 'CyberWatch provides proactive cybersecurity solutions for smart, scalable organizations, offering comprehensive threat detection, security monitoring, and incident response capabilities.',
      'knowledgecheck': 'Nebusis® KnowledgeCheck revolutionizes professional competence evaluation through intelligent assessment technology that delivers instant, accurate evaluations across any knowledge domain. Unlike traditional multiple-choice testing, KnowledgeCheck conducts adaptive assessments that respond to each candidate\'s answers, probing deeper into expertise areas while identifying knowledge gaps through intelligent analysis. The platform provides universal knowledge assessment for compliance standards, regulatory requirements, internal procedures, and specialized professional knowledge. Key capabilities include intelligent adaptive assessments, instant scoring and certification with unique verification numbers, comprehensive documentation with audit trails, role-based access controls, and detailed competence reports with professional development recommendations. Designed for certification bodies, training organizations, corporate L&D, educational institutions, and regulatory bodies, KnowledgeCheck delivers superior scoring accuracy compared to traditional assessment methods.',
      'performancetracker': 'The Nebusis® Performance Tracker is a comprehensive commercial-grade performance management platform that transforms how organizations track, measure, and improve employee performance using the proven PDCA (Plan-Do-Check-Act) methodology. It replaces scattered spreadsheets and manual processes with a unified, intelligent system that drives organizational excellence. The platform features PDCA Report Management with structured monthly cycles, Weekly Activity Logging for time tracking and productivity analytics, Journey Tracker with visual progress monitoring, Supervisor Dashboard for team oversight, Comprehensive Reporting System with PDF/Excel export, Advanced Notification System with SendGrid integration, Role-Based Access Control for security, and complete Settings & Administration tools. Built on React 18 + TypeScript frontend with Go/Gin backend and PostgreSQL database, it provides enterprise-grade performance management that connects individual objectives to organizational strategy while ensuring accountability through real-time dashboards and supervisor oversight.',
      'powerdocs': 'PowerDocs offers intelligent document management and collaboration solutions, providing secure document storage, version control, and team collaboration capabilities for modern organizations.',
      'e-learning-wizard': 'e-Learning Wizard delivers AI-powered learning management specifically designed for regulated and specialized industries, providing comprehensive training solutions with advanced compliance tracking and certification management.',
      'crunchwiz': 'CrunchWiz transforms your data into actionable insights with our comprehensive analytics platform. Upload, process, visualize, and apply machine learning to your data seamlessly. Features include data ingestion, SQL processing, interactive dashboards, and AI/ML pipelines.',
      'inventory-wizard': 'Inventory Wizard delivers smart inventory management and optimization solutions, helping organizations streamline stock control, reduce waste, and improve operational efficiency through intelligent forecasting and automation.',
      'multiomics-wizard': 'Nebusis® Multiomics Engine streamlines precision medicine through integrated omics workflows, enabling researchers and clinicians to efficiently analyze complex biological data for better patient outcomes.',
      'membercore': 'Nebusis® MemberCore is an intelligent, flexible membership management platform designed to serve any type of organization, providing comprehensive membership lifecycle management with automation and data-driven insights. Key benefits include Universal Membership Lifecycle Management, Dynamic Member Profiles, Flexible Membership Types & Plans, and Automated Billing & Payment Integration. Designed for any organization needing simplified compliance management across multiple ISO standards, MemberCore is used by Professional Associations, Health & Wellness organizations, Education institutions, Subscription Services, and Non-profits. The platform offers modern cloud-native architecture, AI-powered automation and insights, comprehensive integration capabilities, cost-effective transparent pricing, built-in compliance and security features, and superior user experience and interface.',
      'wizspeek': 'WizSpeek delivers intelligent, encrypted communication for teams that prioritize privacy, compliance, and collaboration. Designed to meet enterprise-grade standards, this cross-platform messaging solution supports secure file sharing, group management, voice notes, and multilingual support.',
      'emissionsflow': 'EmissionsFlow is a smart platform for carbon accounting and GHG management, helping organizations track, measure, and reduce their environmental impact through comprehensive emissions monitoring and reporting.',
      'selfcertpro': 'Nebusis® SelfCertPro is a professional-grade platform for issuing first-party declarations of conformity, providing structured guidance and digital authentication for organizations managing compliance requirements.',
      'zappformz': 'ZappFormZ is a sophisticated form builder application with enterprise-grade security and document control capabilities. Features include Visual Form Builder, Advanced Analytics Dashboard, Enterprise Security & Document Control, and ISO-compliant workflows.',
      'interopwiz': 'InterOpWiz is a comprehensive multilingual interoperability platform for secure system integration. Features include Visual Integration Flow Designer, Universal Connector System, Field-Level Mapping Engine, Real-Time Transaction Monitoring, and multilingual support (English, Spanish, French).',
      'control-core': 'ControlCore is a comprehensive internal control oversight and management platform designed specifically for organizations implementing modern compliance frameworks. This digital management system provides intelligent tools for implementing, monitoring, and reporting on internal control frameworks, particularly for government institutions requiring robust governance and compliance management with COSO and INTOSAI standards.'
    };
    
    return descriptions[application.slug] || getShortTagline();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-nebusis-primary">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/business-suite" className="text-gray-500 hover:text-nebusis-primary">Business Apps</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">
              Nebusis
              <span className="text-yellow-400 text-xs align-super">®</span>
              {' '}
              {getProductNameParts().product.includes('®') ? (
                <span>
                  {getProductNameParts().product.split('®')[0]}
                  <span className="text-yellow-400 text-xs align-super">®</span>
                  {getProductNameParts().product.split('®')[1]}
                </span>
              ) : (
                getProductNameParts().product
              )}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nebusis-primary via-nebusis-dark to-nebusis-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-white bg-opacity-5 rounded-full"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute top-20 right-10 w-8 h-8 border border-yellow-400 border-opacity-30 rounded-lg transform rotate-12 animate-pulse"></div>
          <div className="absolute bottom-20 left-16 w-6 h-6 bg-yellow-400 bg-opacity-40 rounded-full shadow-lg"></div>
          <div className="absolute top-1/2 left-8 w-4 h-4 border border-yellow-400 border-opacity-60 rounded-sm transform -rotate-45"></div>
          <div className="absolute bottom-32 right-20 w-3 h-3 bg-yellow-400 bg-opacity-30 rounded-full"></div>

          <div className="absolute bottom-48 right-1/3 w-3 h-8 border-l border-yellow-400 border-opacity-20 transform rotate-45"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  {getStatusBadge()}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <div className="flex items-center mb-2 relative">
                  <span>
                    Nebusis
                    <span className="text-yellow-400 text-2xl md:text-3xl align-super">®</span>
                  </span>
                  <div className="absolute -bottom-1 right-0 w-8 h-1 bg-yellow-400 rounded-full opacity-60"></div>
                </div>
                <div className="text-nebusis-bg font-semibold text-3xl md:text-4xl flex items-center gap-3 relative">
                  <div className="relative">
                    {IconComponent ? (
                      <IconComponent className="h-8 w-8 text-nebusis-bg" />
                    ) : (
                      <Shield className="h-8 w-8 text-nebusis-bg" />
                    )}
                  </div>
                  {getProductNameParts().product.includes('®') ? (
                    <span>
                      {getProductNameParts().product.split('®')[0]}
                      <span className="text-yellow-400 text-lg md:text-xl align-super">®</span>
                      {getProductNameParts().product.split('®')[1]}
                    </span>
                  ) : (
                    getProductNameParts().product
                  )}
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-yellow-400 rounded-full"></div>
                </div>
              </h1>
              <p className="text-xl text-nebusis-bg mb-6 relative">
                {getShortTagline()}
              </p>
              
              {/* Enhanced Stats Section */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center relative">
                  <div className="text-2xl font-bold text-yellow-400 drop-shadow-sm">{application.status === 'live' ? 'LIVE' : 'DEV'}</div>
                  <div className="text-sm text-nebusis-bg">Status</div>
                </div>
                <div className="text-center relative bg-yellow-400 bg-opacity-10 rounded-lg px-3 py-2 border border-yellow-400 border-opacity-20">
                  <div className="text-2xl font-bold text-yellow-400 drop-shadow-sm">{application.category}</div>
                  <div className="text-sm text-nebusis-bg">Category</div>
                </div>
                <div className="text-center relative">
                  <div className="text-2xl font-bold text-yellow-400 drop-shadow-sm">24/7</div>
                  <div className="text-sm text-nebusis-bg">Support</div>
                </div>
              </div>

            </div>
            
            <div className="relative">
              {/* Enhanced App Interface Preview */}
              <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20 relative">
                <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-400 bg-opacity-10 rounded-bl-full"></div>
                <div className="aspect-video bg-white bg-opacity-95 rounded-lg relative overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent"></div>
                  <div className="relative z-10 h-full">
                    {getFeaturesOverview()}
                  </div>

                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-2 border-yellow-400 border-opacity-40 rounded-full"></div>
                
                {/* Features Label */}
                <div className="absolute -top-2 left-4 bg-nebusis-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                  Features Overview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="compare">Compare</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>What It Does</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{getDetailedDescription()}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {application.features.slice(0, 4).map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Who Uses This App?</CardTitle>
                      <CardDescription>
                        Designed for any organization needing simplified compliance management across multiple ISO standards
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        {application.targetIndustries.map((industry) => {
                          const IconComponent = getIndustryIcon(industry);
                          return (
                            <div key={industry} className="text-center">
                              <div className="w-12 h-12 bg-nebusis-primary bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3 border border-yellow-400 border-opacity-20 relative">
                                <IconComponent className="h-6 w-6 text-nebusis-primary" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
                              </div>
                              <h4 className="font-medium text-gray-900">{industry}</h4>
                            </div>
                          );
                        })}
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>From small businesses to large enterprises:</strong> Whether you're pursuing your first ISO certification or managing complex multi-standard compliance requirements, ComplianceOne scales to meet your organization's needs.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="space-y-6">
                  {application.slug === 'performancetracker' ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="relative">
                          Core Features
                          <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-yellow-400 rounded-full"></div>
                        </CardTitle>
                        <CardDescription>
                          Comprehensive functionality designed for modern business needs
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* PLAN Phase */}
                          <div className="flex items-start p-6 bg-gray-50 rounded-lg border border-yellow-400 border-opacity-10 relative hover:border-opacity-20 transition-all">
                            <div className="w-8 h-8 bg-nebusis-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                              <span className="text-nebusis-primary font-bold text-sm">P</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">PLAN Phase - Personnel Performance Planning</h4>
                              <p className="text-gray-700 text-sm">SMART+ goal frameworks, organizational alignment algorithms, and strategic objective cascading</p>
                            </div>
                          </div>

                          {/* DO Phase */}
                          <div className="flex items-start p-6 bg-gray-50 rounded-lg border border-yellow-400 border-opacity-10 relative hover:border-opacity-20 transition-all">
                            <div className="w-8 h-8 bg-nebusis-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                              <span className="text-nebusis-primary font-bold text-sm">D</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">DO Phase - Performance Execution Tracking</h4>
                              <p className="text-gray-700 text-sm">Intelligent work pattern analysis and multi-dimensional performance documentation</p>
                            </div>
                          </div>

                          {/* CHECK Phase */}
                          <div className="flex items-start p-6 bg-gray-50 rounded-lg border border-yellow-400 border-opacity-10 relative hover:border-opacity-20 transition-all">
                            <div className="w-8 h-8 bg-nebusis-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                              <span className="text-nebusis-primary font-bold text-sm">C</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">CHECK Phase - Performance Measurement & Analysis</h4>
                              <p className="text-gray-700 text-sm">360-degree feedback orchestration with predictive analytics and machine learning insights</p>
                            </div>
                          </div>

                          {/* ACT Phase */}
                          <div className="flex items-start p-6 bg-gray-50 rounded-lg border border-yellow-400 border-opacity-10 relative hover:border-opacity-20 transition-all">
                            <div className="w-8 h-8 bg-nebusis-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                              <span className="text-nebusis-primary font-bold text-sm">A</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">ACT Phase - Performance Improvement & Development</h4>
                              <p className="text-gray-700 text-sm">Behavioral psychology principles for recognition optimization and evidence-based interventions</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle className="relative">
                          Core Features
                          <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-yellow-400 rounded-full"></div>
                        </CardTitle>
                        <CardDescription>
                          Comprehensive functionality designed for modern business needs
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {application.features.map((feature, index) => (
                            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg border border-yellow-400 border-opacity-10 relative hover:border-opacity-20 transition-all">
                              <div className="w-6 h-6 bg-nebusis-primary bg-opacity-10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <CheckCircle className="h-4 w-4 text-nebusis-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{feature}</h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="compare" className="space-y-6">
                  <CompetitiveComparison application={application} />
                </TabsContent>

                <TabsContent value="integrations" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="relative">
                        Integration & Compatibility
                        <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-yellow-400 rounded-full"></div>
                      </CardTitle>
                      <CardDescription>
                        Seamlessly connects with your existing tools and platforms
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {application.integrations.map((integration) => (
                          <div key={integration} className="flex items-center p-3 border border-yellow-400 border-opacity-10 rounded-lg hover:bg-gray-50 hover:border-opacity-20 transition-all relative">
                            <div className="w-6 h-6 bg-nebusis-primary bg-opacity-10 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                              <Globe className="h-4 w-4 text-nebusis-primary" />
                            </div>
                            <span className="text-gray-700 text-sm">{integration}</span>

                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-nebusis-bg border border-yellow-400 border-opacity-20 p-4 rounded-lg relative">
                        <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-400 bg-opacity-10 rounded-bl-full"></div>
                        <h4 className="font-medium text-nebusis-primary mb-2">Enterprise-Grade Architecture</h4>
                        <p className="text-gray-600 text-sm">
                          Built with modern cloud-native technologies for maximum performance, security, and reliability.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-6">
                  {application.pricing ? (
                    <>
                      {/* Static Pricing Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {Object.entries(application.pricing).map(([tier, details]) => {
                          // For apps without 'pro' tier, highlight 'starter' as recommended
                          const isRecommended = tier === 'pro' || (!application.pricing?.pro && tier === 'starter');
                          return (
                            <Card key={tier} className={`relative ${isRecommended ? 'border-nebusis-primary border-2' : ''}`}>
                              {isRecommended && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                  <Badge className="bg-nebusis-primary text-white">
                                    {tier === 'pro' ? 'Most Popular' : 'Recommended'}
                                  </Badge>
                                </div>
                              )}
                            <CardHeader>
                              <CardTitle className="capitalize">{tier === 'enterprise' ? 'Custom Proposal' : tier}</CardTitle>
                              {tier === 'enterprise' ? (
                                <div className="text-3xl font-bold text-nebusis-primary">
                                  Request Quote
                                </div>
                              ) : application.slug === 'complianceone' || application.slug === 'control-core' ? (
                                <>
                                  <div className="text-3xl font-bold text-nebusis-primary">
                                    ${details.price}
                                    <span className="text-lg font-normal text-gray-600">/year</span>
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">
                                    + ${details.price} one-time setup fee
                                  </div>
                                </>
                              ) : (
                                <div className="text-3xl font-bold text-nebusis-primary">
                                  ${details.price}
                                  <span className="text-lg font-normal text-gray-600">/month</span>
                                </div>
                              )}
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 mb-6">
                                {details.features.map((feature, index) => (
                                  <li key={index} className="flex items-center text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <Button 
                                className={`w-full ${isRecommended ? 'bg-nebusis-primary text-white hover:bg-nebusis-dark' : 'border-nebusis-primary text-nebusis-primary hover:bg-nebusis-primary hover:text-white'}`}
                                variant={isRecommended ? 'default' : 'outline'}
                                disabled={application.status !== "live"}
                              >
                                {application.status === "live" ? 
                                  (tier === 'enterprise' ? "Request Quote" : "Get Started") 
                                  : "Coming Soon"}
                              </Button>
                            </CardContent>
                          </Card>
                        );
                        })}
                      </div>
                      
                      {/* Interactive Pricing Calculator */}
                      <AppPricingCalculator 
                        applicationName={application.name}
                        basePricing={application.pricing}
                        category={application.category}
                      />
                    </>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-gray-600">Pricing information will be available when this application launches.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-yellow-400 border-opacity-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-400 bg-opacity-10 rounded-bl-full"></div>
                <CardHeader>
                  <CardTitle className="relative">
                    Quick Actions
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-yellow-400 rounded-full"></div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {application.status === "live" ? (
                    <>
                      <Button asChild className="w-full bg-nebusis-primary text-white hover:bg-nebusis-dark hover:shadow-lg hover:shadow-yellow-400/20 relative group">
                        <Link href="/demos">
                          <Play className="h-4 w-4 mr-2" />
                          Request Demo
                          <div className="absolute inset-0 border border-yellow-400 border-opacity-0 group-hover:border-opacity-30 rounded-md transition-all"></div>
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full border-nebusis-primary text-nebusis-primary hover:bg-nebusis-primary hover:text-white">
                        <Link href="/checkout">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Purchase License
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild className="w-full bg-nebusis-primary text-white hover:bg-nebusis-dark hover:shadow-lg hover:shadow-yellow-400/20 relative group">
                        <Link href={`/demos?application=${encodeURIComponent(application.name)}`}>
                          <Play className="h-4 w-4 mr-2" />
                          Request Early Access
                          <div className="absolute inset-0 border border-yellow-400 border-opacity-0 group-hover:border-opacity-30 rounded-md transition-all"></div>
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full border-nebusis-primary text-nebusis-primary hover:bg-nebusis-primary hover:text-white">
                        <Link href={`/contact?subject=${encodeURIComponent(`Early Access: ${application.name}`)}&message=${encodeURIComponent(`I'm interested in early access to ${application.name}. Please notify me when it becomes available.`)}`}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Join Waitlist
                        </Link>
                      </Button>
                    </>
                  )}
                  <Button asChild variant="outline" className="w-full border-nebusis-primary text-nebusis-primary hover:bg-nebusis-primary hover:text-white">
                    <Link href="/contact">
                      Contact Sales
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* App Info */}
              <Card className="relative">

                <CardHeader>
                  <CardTitle className="relative">
                    Application Details
                    <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-yellow-400 rounded-full opacity-60"></div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    {getStatusBadge()}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <Badge variant="outline">{application.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industries:</span>
                    <span className="text-sm text-gray-900">{application.targetIndustries.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Integrations:</span>
                    <span className="text-sm text-gray-900">{application.integrations.length}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="relative">
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full opacity-40"></div>
                <CardHeader>
                  <CardTitle className="relative">
                    Resources
                    <div className="absolute -bottom-1 left-0 w-6 h-0.5 bg-yellow-400 rounded-full opacity-80"></div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Product Datasheet
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    API Documentation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    User Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Apps */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 relative">
              Explore More Applications
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-400 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600">
              Discover other powerful tools in the Nebusis® Business Suite
            </p>
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="bg-nebusis-primary text-white hover:bg-nebusis-dark hover:shadow-lg hover:shadow-yellow-400/30 relative group">
              <Link href="/business-suite">
                View All Applications
                <div className="absolute inset-0 border border-yellow-400 border-opacity-0 group-hover:border-opacity-40 rounded-md transition-all"></div>
                <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Competitive Comparison Component
function CompetitiveComparison({ application }: { application: Application }) {
  // Get competitive data based on application type
  const getCompetitiveData = () => {
    const competitorData: Record<string, any> = {
      'compliancecore': {
        title: 'AI-Powered ISO Compliance & Management System Wizards',
        competitors: [
          {
            name: 'Intelex',
            logo: '🔵',
            price: 'Enterprise quotes only',
            strengths: ['Deep EHSQ functionality', 'Fortune 500 deployments', 'Extensive third-party integrations'],
            weaknesses: ['Very expensive', 'Complex setup', 'Feature-rich but overwhelming', 'Limited AI automation']
          },
          {
            name: 'ISOTools',
            logo: '🟢', 
            price: '€1+/feature/month',
            strengths: ['ISO-centric design', 'Mobile-first workflows', 'Strong in Latin America'],
            weaknesses: ['Limited non-ISO support', 'Manual processes', 'Moderate customization', 'Basic AI features']
          }
        ],
        featureComparison: [
          { name: 'AI-Driven Management System Wizards', competitors: [false, false] },
          { name: 'Self-Declaration Module (ISO 17050-1)', competitors: [false, true] },
          { name: 'ISO 42001 AI Governance Support', competitors: [false, false] },
          { name: 'Multi-Standard ISO Coverage', competitors: [true, true] },
          { name: 'AI Conformity Bot & Chat Assistant', competitors: [false, false] },
          { name: 'Sector-Specific Customization (NACE)', competitors: [false, false] },
          { name: 'Cloud-Native SaaS Architecture', competitors: [true, true] },
          { name: 'Regulatory Compliance Beyond ISO', competitors: [false, false] },
          { name: 'SME-Friendly Pricing', competitors: [false, true] },
          { name: 'Real-Time Risk Engine', competitors: [true, true] },
          { name: 'Document Control & Versioning', competitors: [true, true] },
          { name: 'Audit & CAPA Management', competitors: [true, true] }
        ],
        nebusisAdvantages: [
          'AI-powered conformity wizards guide users through ISO implementation',
          'Integrated self-declaration automation via Nebusis® SelfCertPro™ module',
          'ISO 42001 AI governance framework built-in',
          'Affordable modular pricing starting at $1,500/year vs enterprise quotes',
          'Sector-specific customization based on NACE industry codes',
          'Modern cloud-native architecture with embedded AI assistance',
          'Comprehensive regulatory support beyond just ISO standards',
          'Fast deployment with AI-guided setup and configuration',
          'Real-time compliance monitoring with smart notifications',
          'Seamless integration with complete Nebusis® Business Suite'
        ]
      },
      'smartbooks': {
        title: 'Financial Management & Accounting',
        competitors: [
          {
            name: 'QuickBooks Enterprise',
            logo: '🔵',
            price: '$1,800+/year',
            strengths: ['Market recognition', 'Accountant network'],
            weaknesses: ['Outdated technology', 'Limited automation', 'Poor user experience', 'Expensive add-ons']
          },
          {
            name: 'NetSuite',
            logo: '🟠',
            price: '$25,000+/year',
            strengths: ['ERP integration', 'Scalability'],
            weaknesses: ['Extremely expensive', 'Complex implementation', 'Requires consultants', 'Overkill for most businesses']
          },
          {
            name: 'Sage Intacct',
            logo: '🟢',
            price: '$5,000+/year',
            strengths: ['Financial reporting', 'Multi-entity'],
            weaknesses: ['High cost', 'Limited AI features', 'Complex setup', 'Poor mobile experience']
          }
        ],
        featureComparison: [
          { name: 'AI-Powered Automation', competitors: [false, false] },
          { name: 'Real-time Financial Insights', competitors: [false, true] },
          { name: 'Multi-Currency Support', competitors: [true, true] },
          { name: 'Automated Expense Management', competitors: [false, true] },
          { name: 'Advanced Forecasting', competitors: [false, true] },
          { name: 'Mobile-First Design', competitors: [false, false] },
          { name: 'Built-in Business Intelligence', competitors: [false, true] },
          { name: 'One-Click Reconciliation', competitors: [false, false] },
          { name: 'Transparent Pricing', competitors: [true, false] },
          { name: 'Quick Setup (< 1 day)', competitors: [false, false] }
        ],
        nebusisAdvantages: [
          'AI-enhanced automation vs manual processes',
          'Modern cloud-native architecture vs legacy systems',
          'Integrated business intelligence and real-time insights',
          'Seamless multi-currency and multi-entity support',
          'Built-in expense management and automated reconciliation',
          'Advanced forecasting and budgeting with AI predictions',
          'Direct integration with Nebusis® suite for complete business management',
          'Cost-effective pricing with transparent, scalable tiers'
        ]
      },
      'engage': {
        title: 'Customer Relationship Management',
        competitors: [
          {
            name: 'Salesforce',
            logo: '🔵',
            price: '$3,600+/year/user',
            strengths: ['Market leader', 'Extensive customization', 'Large ecosystem'],
            weaknesses: ['Extremely expensive', 'Over-complicated', 'Requires specialists', 'Poor out-of-box experience']
          },
          {
            name: 'HubSpot',
            logo: '🟠',
            price: '$1,800+/year/user',
            strengths: ['Marketing integration', 'Free tier available'],
            weaknesses: ['Expensive scaling', 'Limited customization', 'Add-on dependency', 'Reporting limitations']
          },
          {
            name: 'Pipedrive',
            logo: '🟢',
            price: '$600+/year/user',
            strengths: ['Pipeline focus', 'Simple interface'],
            weaknesses: ['Limited features', 'Weak automation', 'Poor reporting', 'No advanced analytics']
          }
        ],
        featureComparison: [
          { name: 'AI-Powered Lead Scoring', competitors: [true, false] },
          { name: 'Built-in Email Marketing', competitors: [false, true] },
          { name: 'Customer Service Integration', competitors: [true, false] },
          { name: 'Predictive Analytics', competitors: [true, false] },
          { name: 'Mobile-First Design', competitors: [false, true] },
          { name: 'Advanced Automation', competitors: [true, false] },
          { name: 'Team Performance Tracking', competitors: [true, false] },
          { name: 'All Features Included', competitors: [false, false] },
          { name: 'Transparent Pricing', competitors: [false, false] },
          { name: 'Quick Setup (< 1 day)', competitors: [false, true] }
        ],
        nebusisAdvantages: [
          'Intelligent lead scoring with AI-powered insights',
          'Advanced automation without expensive add-ons',
          'Built-in customer support and service management',
          'Comprehensive sales pipeline with predictive analytics',
          'Integrated email marketing and communication tools',
          'Real-time collaboration and team performance tracking',
          'Cost-effective pricing with all features included',
          'Seamless integration with Nebusis® Business Suite'
        ]
      },
      'wizspeek': {
        title: 'Enterprise Communication & Messaging',
        competitors: [
          {
            name: 'WhatsApp Business',
            logo: '🟢',
            price: 'Free',
            strengths: ['Ubiquitous adoption', 'Simple interface'],
            weaknesses: ['No enterprise controls', 'Limited compliance', 'Data privacy concerns', 'No audit capabilities']
          },
          {
            name: 'Signal',
            logo: '🔵',
            price: 'Free',
            strengths: ['End-to-end encryption', 'Privacy focused'],
            weaknesses: ['No enterprise features', 'Limited admin controls', 'No compliance reporting', 'Basic file sharing']
          },
          {
            name: 'Telegram',
            logo: '✈️',
            price: 'Free',
            strengths: ['Feature rich', 'Cross-platform'],
            weaknesses: ['Security concerns', 'No enterprise management', 'Limited compliance', 'Data sovereignty issues']
          }
        ],
        featureComparison: [
          { name: 'End-to-End Encryption', competitors: [false, true] },
          { name: 'GDPR/HIPAA Compliance', competitors: [false, false] },
          { name: 'Advanced Admin Controls', competitors: [false, false] },
          { name: 'Audit Logs & Reporting', competitors: [false, false] },
          { name: 'Secure File Sharing', competitors: [false, false] },
          { name: 'Multi-Language Support', competitors: [true, false] },
          { name: 'PWA Technology', competitors: [false, false] },
          { name: 'Voice Messaging', competitors: [true, true] },
          { name: 'Real-time Translation', competitors: [false, false] },
          { name: 'Enterprise User Management', competitors: [false, false] }
        ],
        nebusisAdvantages: [
          'Military-grade end-to-end encryption for all communications',
          'Built-in compliance features for GDPR, HIPAA, SOX requirements',
          'Advanced admin controls with granular user management',
          'Comprehensive audit logs and compliance reporting',
          'Secure file sharing with detailed access controls',
          'Multi-language support with real-time translation',
          'PWA technology for seamless cross-platform experience',
          'Cost-effective pricing with enterprise security included'
        ]
      },
      'peoplecore': {
        title: 'Human Resources Management & Workforce Analytics',
        competitors: [
          {
            name: 'BambooHR',
            logo: '🟢',
            price: '$8+/employee/month',
            strengths: ['User-friendly interface', 'Good onboarding'],
            weaknesses: ['Limited analytics', 'Basic automation', 'Expensive scaling', 'No AI insights']
          },
          {
            name: 'Workday HCM',
            logo: '🔵',
            price: '$30+/employee/month',
            strengths: ['Enterprise features', 'Comprehensive suite'],
            weaknesses: ['Extremely expensive', 'Complex implementation', 'Requires consultants', 'Poor user experience']
          }
        ],
        featureComparison: [
          { name: 'AI-Powered Analytics', competitors: [false, false] },
          { name: 'Real-time Performance Tracking', competitors: [false, true] },
          { name: 'Automated Workflow Management', competitors: [false, true] },
          { name: 'Advanced Reporting & Insights', competitors: [false, true] },
          { name: 'Mobile-First Design', competitors: [true, false] },
          { name: 'Customizable Dashboards', competitors: [true, true] },
          { name: 'Integration Capabilities', competitors: [true, true] },
          { name: 'Cost-Effective Pricing', competitors: [false, false] },
          { name: 'Quick Implementation', competitors: [true, false] },
          { name: 'Multi-Language Support', competitors: [false, true] }
        ],
        nebusisAdvantages: [
          'AI-powered workforce analytics and predictive insights',
          'Comprehensive employee lifecycle management',
          'Advanced performance tracking with real-time dashboards',
          'Automated compliance and regulatory reporting',
          'Seamless integration with Nebusis® Business Suite',
          'Cost-effective pricing compared to enterprise solutions',
          'Modern, intuitive interface designed for daily use',
          'Quick setup and deployment without consultants'
        ]
      },
      'esg-greencore': {
        title: 'Environmental, Social & Governance (ESG) Management',
        competitors: [
          {
            name: 'Sustainability Cloud',
            logo: '☁️',
            price: '$25+/user/month',
            strengths: ['Salesforce integration', 'Comprehensive reporting'],
            weaknesses: ['Extremely expensive', 'Complex setup', 'Requires Salesforce', 'Limited automation']
          },
          {
            name: 'Workiva',
            logo: '🔵',
            price: '$50+/user/month',
            strengths: ['Enterprise reporting', 'Compliance focus'],
            weaknesses: ['Very expensive', 'Reporting-only focus', 'Poor user experience', 'Complex implementation']
          }
        ],
        featureComparison: [
          { name: 'Real-time ESG Monitoring', competitors: [false, false] },
          { name: 'Automated Data Collection', competitors: [true, false] },
          { name: 'AI-Powered Insights', competitors: [false, false] },
          { name: 'Regulatory Compliance Tracking', competitors: [true, true] },
          { name: 'Carbon Footprint Calculator', competitors: [true, false] },
          { name: 'Stakeholder Reporting', competitors: [true, true] },
          { name: 'Risk Assessment Tools', competitors: [false, true] },
          { name: 'Mobile Access', competitors: [false, false] },
          { name: 'Cost-Effective Pricing', competitors: [false, false] },
          { name: 'Quick Implementation', competitors: [false, false] }
        ],
        nebusisAdvantages: [
          'Real-time ESG monitoring with automated data collection',
          'AI-powered sustainability insights and recommendations',
          'Comprehensive carbon footprint tracking and reduction planning',
          'Automated regulatory compliance reporting for multiple frameworks',
          'Cost-effective pricing compared to enterprise ESG solutions',
          'Seamless integration with Nebusis® Business Suite',
          'User-friendly interface designed for sustainability teams',
          'Quick setup without complex implementation requirements'
        ]
      },
      'client360': {
        title: 'Customer Experience & Relationship Management',
        competitors: [
          {
            name: 'Zendesk',
            logo: '🟠',
            price: '$19+/agent/month',
            strengths: ['Support focus', 'Ticket management'],
            weaknesses: ['Limited CRM features', 'Expensive scaling', 'Add-on dependency', 'Poor integration']
          },
          {
            name: 'Freshworks',
            logo: '🔵',
            price: '$15+/user/month',
            strengths: ['All-in-one suite', 'Good value'],
            weaknesses: ['Limited customization', 'Basic automation', 'Weak analytics', 'Poor enterprise features']
          }
        ],
        featureComparison: [
          { name: '360-Degree Customer View', competitors: [false, true] },
          { name: 'AI-Powered Insights', competitors: [false, false] },
          { name: 'Omnichannel Support', competitors: [true, true] },
          { name: 'Advanced Analytics', competitors: [false, false] },
          { name: 'Automated Workflows', competitors: [true, true] },
          { name: 'Customer Journey Mapping', competitors: [false, false] },
          { name: 'Real-time Collaboration', competitors: [true, true] },
          { name: 'Mobile-First Design', competitors: [true, true] },
          { name: 'Transparent Pricing', competitors: [false, true] },
          { name: 'Quick Setup', competitors: [true, true] }
        ],
        nebusisAdvantages: [
          'Complete 360-degree customer view with unified data',
          'AI-powered customer insights and behavior prediction',
          'Advanced customer journey mapping and optimization',
          'Comprehensive omnichannel support and engagement',
          'Real-time collaboration tools for customer-facing teams',
          'Advanced analytics and reporting capabilities',
          'Seamless integration with Nebusis® Business Suite',
          'Cost-effective pricing with all features included'
        ]
      },
      'supply-chain-wizard': {
        title: 'Supply Chain Management & Optimization',
        competitors: [
          {
            name: 'SAP SCM',
            logo: '🔵',
            price: '$150+/user/month',
            strengths: ['Enterprise features', 'Comprehensive functionality'],
            weaknesses: ['Extremely expensive', 'Complex implementation', 'Requires consultants', 'Poor user experience']
          },
          {
            name: 'Oracle SCM',
            logo: '🔴',
            price: '$120+/user/month',
            strengths: ['Large enterprise focus', 'Integration capabilities'],
            weaknesses: ['Very expensive', 'Complex setup', 'Licensing complexity', 'Outdated interface']
          }
        ],
        featureComparison: [
          { name: 'AI-Powered Optimization', competitors: [false, false] },
          { name: 'Real-time Tracking', competitors: [true, true] },
          { name: 'Demand Forecasting', competitors: [true, true] },
          { name: 'Supplier Management', competitors: [true, true] },
          { name: 'Inventory Optimization', competitors: [true, true] },
          { name: 'Risk Assessment', competitors: [true, true] },
          { name: 'Mobile Access', competitors: [false, false] },
          { name: 'User-Friendly Interface', competitors: [false, false] },
          { name: 'Quick Implementation', competitors: [false, false] },
          { name: 'Cost-Effective Pricing', competitors: [false, false] }
        ],
        nebusisAdvantages: [
          'AI-powered supply chain optimization and automation',
          'Real-time visibility across entire supply chain network',
          'Advanced demand forecasting with machine learning',
          'Comprehensive supplier relationship management',
          'Intelligent inventory optimization and planning',
          'Risk assessment and mitigation tools',
          'Cost-effective pricing compared to enterprise solutions',
          'Modern, intuitive interface designed for supply chain professionals'
        ]
      }
    };

    return competitorData[application.slug] || {
      title: 'Business Application Comparison',
      competitors: [],
      nebusisAdvantages: [
        'Modern cloud-native architecture',
        'AI-powered automation and insights',
        'Comprehensive integration capabilities',
        'Cost-effective transparent pricing',
        'Superior user experience and interface',
        'Built-in compliance and security features'
      ]
    };
  };

  const compData = getCompetitiveData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[hsl(221,83%,53%)]" />
            Competitive Analysis: {compData.title}
          </CardTitle>
          <CardDescription>
            See how Nebusis<span className="text-yellow-400 text-xs align-super">®</span> {getProductNameParts().product.includes('®') ? (
              <>
                {getProductNameParts().product.split('®')[0]}
                <span className="text-yellow-400 text-xs align-super">®</span>
                {getProductNameParts().product.split('®')[1]}
              </>
            ) : (
              getProductNameParts().product
            )} outperforms leading competitors
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Feature Comparison Table */}
      {compData.competitors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
            <CardDescription>
              Compare key features across leading solutions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-[hsl(221,83%,53%)] rounded-full flex items-center justify-center mb-2">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[hsl(221,83%,53%)]">Nebusis<span className="text-yellow-400 text-xs align-super">®</span> {getProductNameParts().product.includes('®') ? (
                          <>
                            {getProductNameParts().product.split('®')[0]}
                            <span className="text-yellow-400 text-xs align-super">®</span>
                            {getProductNameParts().product.split('®')[1]}
                          </>
                        ) : (
                          getProductNameParts().product
                        )}</span>
                      </div>
                    </th>
                    {compData.competitors.slice(0, 2).map((competitor: any, index: number) => (
                      <th key={index} className="text-center p-4 font-semibold">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2 text-lg">
                            {competitor.logo}
                          </div>
                          <span className="text-gray-700">{competitor.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compData.featureComparison?.map((feature: any, index: number) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{feature.name}</td>
                      <td className="p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      {feature.competitors.slice(0, 2).map((hasFeature: boolean, i: number) => (
                        <td key={i} className="p-4 text-center">
                          {hasFeature ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Why Choose Nebusis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[hsl(221,83%,53%)]" />
            Why Choose Nebusis<span className="text-yellow-400 text-xs align-super">®</span> {getProductNameParts().product.includes('®') ? (
              <>
                {getProductNameParts().product.split('®')[0]}
                <span className="text-yellow-400 text-xs align-super">®</span>
                {getProductNameParts().product.split('®')[1]}
              </>
            ) : (
              getProductNameParts().product
            )}
          </CardTitle>
          <CardDescription>
            Key advantages that make us a superior choice for modern businesses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compData.nebusisAdvantages.map((advantage: string, index: number) => (
              <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700">{advantage}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>



      {/* CTA */}
      <Card>
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Ready to experience the Nebusis® advantage?</h3>
          <div className="flex justify-center">
            <Button size="lg" className="bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)]">
              <Play className="h-4 w-4 mr-2" />
              Start Free Demo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legal Disclaimer */}
      <Card className="border-gray-200">
        <CardContent className="py-4">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            <strong>Disclaimer:</strong> This competitive analysis is based on Nebusis® Cloud Services, LLC's independent assessment of publicly available information about competing products as of the publication date. Feature comparisons, pricing information, and capability assessments reflect our understanding and evaluation methodology. Other parties conducting independent assessments may reach different conclusions. Product features, pricing, and capabilities are subject to change without notice. We recommend conducting your own evaluation and contacting vendors directly for the most current and accurate information. This analysis is provided for informational purposes only and should not be considered as professional advice for procurement decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );


}
