import { 
  Shield, Calculator, Users, Leaf, UserCircle, Gavel, 
  UsersRound, Truck, Boxes, Cog, ShieldCheck, Brain,
  TrendingUp, FileText, GraduationCap, BarChart3, 
  Database, Workflow, Monitor, Microscope, MessageSquareText,
  Award, Zap, Building, Factory, Hospital, Briefcase,
  Globe, School, Car, ShoppingCart, Cpu, FlaskConical,
  Scale, BrainCircuit, Network, ClipboardList, MapPin,
  UserCheck, DollarSign, Atom, TreePine, Fingerprint,
  Settings, Target, Megaphone, Mail, Receipt, CheckCircle
} from "lucide-react";
import WizSpeakIcon from "@/components/icons/wizspeek-icon";

export const NEBUSIS_APPLICATIONS = [
  {
    id: 1,
    name: "Nebusis® ComplianceOne",
    slug: "complianceone",
    description: "Centralized governance platform with AI-enhanced compliance wizards for ISO standards and regulatory frameworks",
    icon: CheckCircle,
    status: "live" as const,
    category: "compliance",
    color: "blue"
  },
  {
    id: 3,
    name: "Nebusis® Engage",
    slug: "engage",
    description: "AI-driven client lifecycle automation for smart growth",
    icon: Target,
    status: "coming_soon" as const,
    category: "crm",
    color: "purple"
  },
  {
    id: 2,
    name: "Nebusis® SmartBooks",
    slug: "smartbooks", 
    description: "AI-enhanced financial control and automated accounting",
    icon: DollarSign,
    status: "coming_soon" as const,
    category: "finance",
    color: "green"
  },
  {
    id: 14,
    name: "Nebusis® PowerDocs",
    slug: "powerdocs",
    description: "Intelligent document management and collaboration platform",
    icon: FileText,
    status: "coming_soon" as const,
    category: "productivity",
    color: "sky"
  },
  {
    id: 6,
    name: "Nebusis® LegalFlow",
    slug: "legalflow",
    description: "Legal document and contract management with AI review",
    icon: Scale,
    status: "coming_soon" as const,
    category: "legal",
    color: "red"
  },
  {
    id: 13,
    name: "Nebusis® Performance Tracker",
    slug: "performance-tracker",
    description: "Personnel performance tracking platform based on Plan, Do, Check, Act (PDCA) methodology",
    icon: UserCheck,
    status: "coming_soon" as const,
    category: "hr",
    color: "violet"
  },
  {
    id: 22,
    name: "Nebusis® ZappFormZ",
    slug: "zappformz",
    description: "Simple, Secure and Controlled Data Collection",
    icon: ClipboardList,
    status: "coming_soon" as const,
    category: "forms",
    color: "indigo"
  },
  {
    id: 20,
    name: "Nebusis® WizSpeek",
    slug: "wizspeek",
    description: "End-to-end encrypted communication platform for enterprises",
    icon: WizSpeakIcon,
    status: "coming_soon" as const,
    category: "communication",
    color: "purple"
  },
  {
    id: 7,
    name: "Nebusis® PeopleCore",
    slug: "peoplecore",
    description: "Human resources and workforce management platform",
    icon: UserCheck,
    status: "coming_soon" as const,
    category: "hr",
    color: "pink"
  },
  {
    id: 8,
    name: "Nebusis® Supply Chain Wizard",
    slug: "supply-chain-wizard",
    description: "Intelligent supply chain optimization and management",
    icon: Truck,
    status: "coming_soon" as const,
    category: "operations",
    color: "orange"
  },
  {
    id: 9,
    name: "Nebusis® Inventory Wizard",
    slug: "inventory-wizard",
    description: "Smart inventory management with predictive analytics",
    icon: Boxes,
    status: "coming_soon" as const,
    category: "operations",
    color: "amber"
  },
  {
    id: 10,
    name: "Nebusis® Workflow Engine",
    slug: "workflow-engine",
    description: "Business process automation and workflow management",
    icon: Settings,
    status: "coming_soon" as const,
    category: "automation",
    color: "gray"
  },
  {
    id: 11,
    name: "Nebusis® CyberWatch",
    slug: "cyberwatch",
    description: "Proactive cybersecurity for smart, scalable organizations with all-in-one management and response platform",
    icon: Fingerprint,
    status: "coming_soon" as const,
    category: "security",
    color: "slate"
  },
  {
    id: 4,
    name: "Nebusis® ESG GreenCore",
    slug: "esg-greencore",
    description: "Environmental, Social & Governance monitoring and reporting",
    icon: TreePine,
    status: "coming_soon" as const,
    category: "sustainability",
    color: "emerald"
  },
  {
    id: 15,
    name: "Nebusis® e-Learning Wizard",
    slug: "elearning-wizard",
    description: "Interactive training and e-learning management system",
    icon: School,
    status: "coming_soon" as const,
    category: "education",
    color: "teal"
  },
  {
    id: 16,
    name: "Nebusis® CrunchWiz",
    slug: "crunchwiz",
    description: "Transform your data into actionable insights with our comprehensive analytics platform",
    icon: BarChart3,
    status: "coming_soon" as const,
    category: "analytics",
    color: "cyan"
  },
  {
    id: 18,
    name: "Nebusis® Multiomics Wizard",
    slug: "multiomics-wizard",
    description: "Streamlining precision medicine through integrated omics workflows",
    icon: FlaskConical,
    status: "coming_soon" as const,
    category: "healthcare",
    color: "emerald"
  },
  {
    id: 19,
    name: "Nebusis® MemberCore",
    slug: "membercore",
    description: "Total membership management for modern organizations",
    icon: Users,
    status: "coming_soon" as const,
    category: "membership",
    color: "orange"
  },
  {
    id: 17,
    name: "Nebusis® EmissionsFlow",
    slug: "emissionsflow",
    description: "Smart platform for carbon accounting and GHG management",
    icon: Atom,
    status: "coming_soon" as const,
    category: "sustainability",
    color: "emerald"
  },
  {
    id: 21,
    name: "Nebusis® SelfCertPro",
    slug: "selfcertpro",
    description: "Self-certification platform for first-party declarations of conformity",
    icon: Award,
    status: "coming_soon" as const,
    category: "compliance",
    color: "blue"
  },
  {
    id: 23,
    name: "Nebusis® InterOpWiz",
    slug: "interopwiz",
    description: "Seamless System Integration with Four-Level Interoperability & Semantic Layer",
    icon: Network,
    status: "coming_soon" as const,
    category: "compliance",
    color: "blue"
  },
  {
    id: 12,
    name: "Nebusis® KnowledgeCheck",
    slug: "knowledgecheck",
    description: "Competence validation and certification management",
    icon: BrainCircuit,
    status: "coming_soon" as const,
    category: "education",
    color: "yellow"
  },
  {
    id: 26,
    name: "Nebusis® ControlCore",
    slug: "control-core",
    description: "COSO & INTOSAI Compliance Management Platform for internal control oversight and management",
    icon: Building,
    status: "coming_soon" as const,
    category: "compliance",
    color: "indigo"
  }
];

export const NAVIGATION_ITEMS = [
  {
    label: "Home",
    href: "/",
    hasDropdown: false
  },
  {
    label: "Business Apps",
    href: "/business-suite",
    hasDropdown: false
  },
  {
    label: "Sector Suites",
    href: "/sector-suites",
    hasDropdown: false
  },
  {
    label: "Digital Transformation",
    href: "/digital-transformation",
    hasDropdown: false
  },
  {
    label: "Nebusis® Academy",
    href: "/certifications",
    hasDropdown: false
  },


  {
    label: "About",
    href: "/about",
    hasDropdown: false
  },
  {
    label: "Contact",
    href: "/contact",
    hasDropdown: false
  }
];

export const COMPANY_INFO = {
  name: "Nebusis® Cloud Services, LLC",
  website: "www.nebusis.com",
  address: "12020 Sunrise Valley Dr, Reston, Virginia 20191, US",
  phone: "+1 (571) 449-3700",
  email: "info@nebusis.com"
};

export const VALUE_PROPOSITIONS = [
  {
    title: "Modular & Scalable",
    description: "Use just one app or the entire suite. Scale your digital transformation at your own pace with our flexible architecture.",
    icon: "cubes",
    color: "blue"
  },
  {
    title: "AI-Driven Productivity", 
    description: "Automate decisions, improve compliance, and enhance accuracy with built-in artificial intelligence across all modules.",
    icon: "robot",
    color: "green"
  },
  {
    title: "Ready for Transformation",
    description: "Blockchain, IoT, cloud-native architecture — future-ready technology stack designed for tomorrow's challenges.",
    icon: "rocket",
    color: "purple"
  }
];

export const INDUSTRIES = [
  { name: "Government", icon: "university", description: "Public sector modernization" },
  { name: "Manufacturing", icon: "industry", description: "Industrial automation" },
  { name: "Healthcare", icon: "heartbeat", description: "Healthcare compliance" },
  { name: "Education", icon: "graduation-cap", description: "Educational technology" },
  { name: "Energy", icon: "bolt", description: "Energy management" },
  { name: "Finance", icon: "chart-line", description: "Financial services" }
];
