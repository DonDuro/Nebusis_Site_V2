// Static data for Nebusis website - platform agnostic version

export interface Application {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "Live" | "Coming Soon" | "Beta";
  pricing: {
    starter?: number;
    professional?: number;
    enterprise?: number;
  };
  features: string[];
  targetUsers: string[];
  integrations: string[];
}

export interface SectorSuite {
  id: string;
  name: string;
  description: string;
  targetIndustry: string;
  applications: string[];
  status: "Live" | "Coming Soon" | "Beta";
  pricing: {
    starter?: number;
    professional?: number;
    enterprise?: number;
  };
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  status: "Live" | "Coming Soon" | "Beta";
}

export interface DigitalTransformationService {
  id: string;
  name: string;
  description: string;
  deliverables: string[];
  duration: string;
  pricing: "Custom Quote" | number;
  status: "Live" | "Coming Soon" | "Beta";
}

// Business Applications Data
export const businessApplications: Application[] = [
  {
    id: "NEB-APP-001",
    name: "Nebusis® ComplianceOne",
    description: "Comprehensive compliance management platform for ISO standards",
    category: "Compliance",
    status: "Live",
    pricing: {
      starter: 1250,
      professional: 3750,
      enterprise: 0 // Custom quote
    },
    features: ["ISO 9001", "ISO/IEC 27001", "ISO/IEC 42001", "Audit Management"],
    targetUsers: ["Compliance Officers", "Quality Managers"],
    integrations: ["Microsoft 365", "Google Workspace"]
  },
  {
    id: "NEB-APP-002", 
    name: "Nebusis® Multiomics Engine",
    description: "Advanced multi-omics data analysis and integration platform",
    category: "Healthcare & Life Sciences",
    status: "Live",
    pricing: {
      starter: 2500,
      professional: 7500,
      enterprise: 0 // Custom quote
    },
    features: ["Genomics Analysis", "Proteomics", "Metabolomics", "AI Integration"],
    targetUsers: ["Researchers", "Biotech Companies"],
    integrations: ["R/Bioconductor", "Python", "Cloud Platforms"]
  }
  // Add more applications as needed
];

// Sector Suites Data
export const sectorSuites: SectorSuite[] = [
  {
    id: "NEB-SS-001",
    name: "Healthcare Suite",
    description: "Comprehensive healthcare solutions",
    targetIndustry: "Healthcare",
    applications: ["Nebusis® Multiomics Engine", "Nebusis® ComplianceOne"],
    status: "Live",
    pricing: {
      starter: 5000,
      professional: 15000,
      enterprise: 0
    }
  }
  // Add more sector suites as needed
];

// Certifications Data
export const certifications: Certification[] = [
  {
    id: "NEB-CERT-001",
    name: "Certified Prompt Engineering Specialist (CPES)",
    description: "Master the art of AI prompt engineering",
    duration: "40 hours",
    level: "Intermediate",
    price: 299,
    status: "Live"
  }
  // Add more certifications as needed
];

// Digital Transformation Services Data
export const digitalTransformationServices: DigitalTransformationService[] = [
  {
    id: "NEB-DT-001",
    name: "AI Strategy Consulting",
    description: "Strategic AI implementation roadmap",
    deliverables: ["AI Assessment", "Implementation Plan", "ROI Analysis"],
    duration: "8-12 weeks",
    pricing: "Custom Quote",
    status: "Live"
  }
  // Add more services as needed
];

// Company Information
export const COMPANY_INFO = {
  name: "Nebusis®",
  address: "12020 Sunrise Valley Dr, Reston, Virginia 20191, US",
  website: "www.nebusis.com",
  description: "AI-powered SaaS solutions for digital transformation, compliance, and enterprise applications"
};

// Navigation Items
export const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Business Suite", href: "/business-suite" },
  { name: "Sector Suites", href: "/sector-suites" },
  { name: "Certifications", href: "/certifications" },
  { name: "Digital Transformation", href: "/digital-transformation" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export default {
  businessApplications,
  sectorSuites,
  certifications,
  digitalTransformationServices,
  COMPANY_INFO,
  NAVIGATION_ITEMS
};