import { useState } from 'react';
import { useRoute } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, Play, ShoppingCart, ArrowRight, 
  Users, FileText, Star, Globe, Building2
} from 'lucide-react';
import { Link } from 'wouter';
import SuitePricingCalculator from '@/components/pricing/suite-pricing-calculator';
import SuiteDemoRequestDialog from '@/components/forms/suite-demo-request-dialog';
import SuiteQuoteRequestDialog from '@/components/forms/suite-quote-request-dialog';

// Suite data - this would normally come from a database or API
const SUITE_DATA = {
  "semiconductors-manufacturing": {
    name: "Semiconductors & Advanced Manufacturing Suite",
    description: "Comprehensive digital transformation solution for precision-based industries requiring stringent quality control and operational excellence.",
    detailedDescription: "Designed specifically for semiconductor manufacturers and advanced manufacturing facilities, this suite combines ISO compliance management with cutting-edge operational tools. Perfect for organizations that need to maintain precise quality standards while optimizing production workflows and supply chain operations.",
    icon: "🔬",
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
    targetIndustries: ["Semiconductor Manufacturing", "Advanced Manufacturing", "Precision Industries", "Electronics"],
    features: [
      "End-to-end production visibility",
      "Real-time quality monitoring",
      "Supply chain optimization",
      "Automated compliance reporting",
      "Risk management protocols",
      "Performance analytics dashboard",
      "Workflow automation"
    ],
    pricing: {
      starter: { 
        price: 8500, 
        setupFee: 5000,
        features: ["5 Core Apps", "Up to 25 Users", "Basic Integration", "Email Support", "Standard Reports"] 
      },
      professional: { 
        price: 15000, 
        setupFee: 8000,
        features: ["All 7 Apps", "Up to 100 Users", "Advanced Integration", "Priority Support", "Custom Reports", "API Access"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Custom Modules", "Unlimited Users", "24/7 Support", "Dedicated Account Manager", "On-site Training", "Custom Development"] 
      }
    },
    benefits: [
      "Reduce compliance audit time by 75%",
      "Improve production efficiency by 40%",
      "Decrease quality incidents by 60%",
      "Streamline supply chain operations"
    ]
  },
  "healthcare-life-sciences": {
    name: "Healthcare & Life Sciences Suite",
    description: "Specialized solution for healthcare and life sciences organizations requiring regulatory compliance and operational excellence.",
    detailedDescription: "Built for healthcare providers, pharmaceutical companies, and life sciences organizations that need to maintain strict regulatory compliance while managing complex research and clinical operations. Includes specialized tools for compliance management, research coordination, and operational oversight.",
    icon: "🏥",
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
    targetIndustries: ["Hospitals", "Pharmaceutical", "Biotech", "Medical Research"],
    features: [
      "HIPAA-compliant data management",
      "Regulatory compliance tracking",
      "Clinical trial management",
      "Secure document management",
      "Staff training and certification",
      "Audit trail maintenance",
      "Research workflow automation"
    ],
    pricing: {
      starter: { 
        price: 9000, 
        setupFee: 6000,
        features: ["5 Core Apps", "Up to 20 Users", "HIPAA Compliance", "Email Support", "Basic Research Tools"] 
      },
      professional: { 
        price: 16500, 
        setupFee: 9000,
        features: ["All 7 Apps", "Up to 75 Users", "Full Compliance Suite", "Priority Support", "Audit Reports", "Clinical Modules"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Clinical Modules", "Unlimited Users", "24/7 Support", "Regulatory Consulting", "Validation Services", "Custom Integration"] 
      }
    },
    benefits: [
      "Ensure regulatory compliance",
      "Accelerate research timelines by 50%",
      "Reduce regulatory risks",
      "Streamline clinical operations"
    ]
  },
  "energy-utilities": {
    name: "Energy & Utilities Suite",
    description: "Comprehensive solution for power generation, renewable energy, and utility operations with smart grid management capabilities.",
    detailedDescription: "Designed for energy companies, utility providers, and renewable energy organizations that need to manage complex infrastructure, ensure regulatory compliance, and optimize operational efficiency. Includes tools for energy management, environmental compliance, and performance monitoring.",
    icon: "⚡",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® ESG GreenCore",
      "Nebusis® SmartBooks",
      "Nebusis® CyberWatch",
      "Nebusis® Workflow Engine",
      "Nebusis® Performance Tracker"
    ],
    standards: ["ISO 50001", "Environmental Standards", "Utility Regulations"],
    targetIndustries: ["Power Generation", "Renewable Energy", "Utility Companies", "Smart Grid"],
    features: [
      "Energy management systems",
      "Environmental compliance tracking",
      "Smart grid optimization",
      "Operational efficiency monitoring",
      "Regulatory reporting",
      "Performance analytics",
      "Sustainability metrics"
    ],
    pricing: {
      starter: { 
        price: 10000, 
        setupFee: 6000,
        features: ["4 Core Apps", "Up to 30 Users", "Basic Energy Management", "Email Support", "Standard Reports"] 
      },
      professional: { 
        price: 18000, 
        setupFee: 10000,
        features: ["All 6 Apps", "Up to 150 Users", "Advanced Energy Tools", "Priority Support", "Smart Grid Analytics", "ESG Reporting"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Energy Modules", "Unlimited Users", "24/7 Support", "Regulatory Consulting", "Custom Analytics", "On-site Training"] 
      }
    },
    benefits: [
      "Optimize energy efficiency by 35%",
      "Reduce environmental impact",
      "Improve regulatory compliance",
      "Enhance operational reliability"
    ]
  },
  "financial-services": {
    name: "Financial Services Suite",
    description: "Specialized solution for banks, insurance companies, and fintech firms requiring comprehensive risk management and regulatory compliance.",
    detailedDescription: "Built for financial institutions that need to manage complex regulatory requirements, maintain data security, and optimize operational efficiency. Includes tools for compliance management, risk assessment, and client relationship management.",
    icon: "🏦",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® LegalFlow",
      "Nebusis® SmartBooks",
      "Nebusis® PowerDocs",
      "Nebusis® CyberWatch",
      "Nebusis® Engage",
      "Nebusis® Performance Tracker"
    ],
    standards: ["ISO 27001", "Financial Regulations", "Risk Management", "SOX Compliance"],
    targetIndustries: ["Banks", "Insurance", "Fintech", "Investment Firms"],
    features: [
      "Financial compliance management",
      "Risk assessment tools",
      "Client relationship management",
      "Secure document handling",
      "Audit trail management",
      "Regulatory reporting",
      "Performance monitoring"
    ],
    pricing: {
      starter: { 
        price: 11000, 
        setupFee: 7000,
        features: ["5 Core Apps", "Up to 25 Users", "Basic Financial Tools", "Email Support", "Compliance Reports"] 
      },
      professional: { 
        price: 19000, 
        setupFee: 11000,
        features: ["All 7 Apps", "Up to 100 Users", "Advanced Risk Tools", "Priority Support", "Regulatory Reports", "Client Portal"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Financial Modules", "Unlimited Users", "24/7 Support", "Regulatory Consulting", "Custom Integration", "Dedicated Support"] 
      }
    },
    benefits: [
      "Ensure regulatory compliance",
      "Reduce operational risks",
      "Improve client satisfaction",
      "Streamline operations"
    ]
  },
  "government-public-sector": {
    name: "Government & Public Sector Suite",
    description: "Comprehensive solution for government agencies requiring digital governance, compliance, and public service management.",
    detailedDescription: "Built for government agencies and public institutions that need to manage digital governance, ensure compliance, and provide efficient public services. Includes tools for document management, workflow automation, and compliance tracking.",
    icon: "🏛️",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® Workflow Engine",
      "Nebusis® CyberWatch",
      "Nebusis® LegalFlow",
      "Nebusis® SmartBooks",
      "Nebusis® PowerDocs"
    ],
    standards: ["Government Standards", "Public Sector Compliance", "Digital Governance"],
    targetIndustries: ["Government Agencies", "Public Institutions", "Municipal Services", "Regulatory Bodies"],
    features: [
      "Digital governance tools",
      "Compliance automation",
      "Public service management",
      "Document integrity",
      "Workflow automation",
      "Audit trail management",
      "Cybersecurity protocols"
    ],
    pricing: {
      starter: { 
        price: 11000, 
        setupFee: 6000,
        features: ["4 Core Apps", "Up to 50 Users", "Basic Governance", "Email Support"] 
      },
      professional: { 
        price: 20000, 
        setupFee: 10000,
        features: ["All 6 Apps", "Up to 200 Users", "Advanced Governance", "Priority Support", "Audit Trails"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Government Modules", "Unlimited Users", "24/7 Support", "On-site Deployment", "Custom Integration"] 
      }
    },
    benefits: [
      "Improve public service delivery",
      "Enhance transparency",
      "Reduce administrative costs",
      "Strengthen governance"
    ]
  },
  "education-research": {
    name: "Education & Research Suite",
    description: "Specialized solution for educational institutions and research organizations requiring comprehensive academic management and compliance.",
    detailedDescription: "Built for universities, schools, and research institutions that need to manage academic operations, ensure compliance, and support research activities. Includes tools for educational management, research coordination, and institutional compliance.",
    icon: "🎓",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® e-Learning Wizard",
      "Nebusis® PowerDocs",
      "Nebusis® SmartBooks",
      "Nebusis® CyberWatch",
      "Nebusis® Workflow Engine"
    ],
    standards: ["Educational Standards", "Research Compliance", "Academic Governance"],
    targetIndustries: ["Universities", "Schools", "Research Institutions", "Educational Technology"],
    features: [
      "Academic management systems",
      "Research project coordination",
      "Institutional compliance",
      "Document management",
      "Learning management",
      "Financial oversight",
      "Security protocols"
    ],
    pricing: {
      starter: { 
        price: 8000, 
        setupFee: 4000,
        features: ["4 Core Apps", "Up to 50 Users", "Basic Education Tools", "Email Support"] 
      },
      professional: { 
        price: 15000, 
        setupFee: 7000,
        features: ["All 6 Apps", "Up to 200 Users", "Advanced Learning Tools", "Priority Support", "Research Modules"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Education Modules", "Unlimited Users", "24/7 Support", "Custom Integration", "Training Programs"] 
      }
    },
    benefits: [
      "Improve academic operations",
      "Enhance research capabilities",
      "Ensure institutional compliance",
      "Streamline administrative processes"
    ]
  },
  "transportation-logistics": {
    name: "Transportation & Logistics Suite",
    description: "Comprehensive solution for transportation companies and logistics providers requiring supply chain optimization and operational excellence.",
    detailedDescription: "Built for transportation companies, logistics providers, and supply chain organizations that need to optimize operations, ensure compliance, and manage complex logistics networks. Includes tools for supply chain management, performance tracking, and operational compliance.",
    icon: "🚛",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® Supply Chain Wizard",
      "Nebusis® Inventory Wizard",
      "Nebusis® Performance Tracker",
      "Nebusis® SmartBooks",
      "Nebusis® CyberWatch"
    ],
    standards: ["Transportation Standards", "Logistics Compliance", "Supply Chain Regulations"],
    targetIndustries: ["Transportation Companies", "Logistics Providers", "Supply Chain Management", "Freight Services"],
    features: [
      "Supply chain optimization",
      "Logistics management",
      "Transportation compliance",
      "Inventory tracking",
      "Performance analytics",
      "Financial management",
      "Security monitoring"
    ],
    pricing: {
      starter: { 
        price: 9000, 
        setupFee: 5000,
        features: ["4 Core Apps", "Up to 30 Users", "Basic Logistics Tools", "Email Support"] 
      },
      professional: { 
        price: 16000, 
        setupFee: 8000,
        features: ["All 6 Apps", "Up to 100 Users", "Advanced Logistics", "Priority Support", "Supply Chain Analytics"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Logistics Modules", "Unlimited Users", "24/7 Support", "Custom Integration", "Route Optimization"] 
      }
    },
    benefits: [
      "Optimize supply chain efficiency",
      "Reduce transportation costs",
      "Improve delivery performance",
      "Enhance operational visibility"
    ]
  },
  "healthcare-biotech": {
    name: "Healthcare, Biotech & Life Sciences Suite",
    description: "Specialized solution for healthcare and life sciences organizations requiring HIPAA compliance and genomics capabilities.",
    detailedDescription: "Built for healthcare providers, biotech companies, and life sciences organizations that need to maintain strict regulatory compliance while managing complex research and clinical operations. Includes specialized tools for genomics, clinical trials, and patient data management.",
    icon: "🧬",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® Multiomics Wizard",
      "Nebusis® KnowledgeCheck",
      "Nebusis® LegalFlow",
      "Nebusis® e-Learning Wizard",
      "Nebusis® CyberWatch",
      "Nebusis® PowerDocs"
    ],
    standards: ["ISO 15189", "ISO 20387", "HIPAA", "GDPR"],
    targetIndustries: ["Genomics Labs", "Hospitals", "Research Centers", "Biotech Companies"],
    features: [
      "HIPAA-compliant data management",
      "Genomics workflow automation",
      "Clinical trial management",
      "Regulatory compliance tracking",
      "Secure document management",
      "Staff training and certification",
      "Audit trail maintenance"
    ],
    pricing: {
      starter: { 
        price: 9000, 
        setupFee: 6000,
        features: ["5 Core Apps", "Up to 20 Users", "HIPAA Compliance", "Email Support", "Basic Genomics Tools"] 
      },
      professional: { 
        price: 16500, 
        setupFee: 9000,
        features: ["All 7 Apps", "Up to 75 Users", "Full Compliance Suite", "Priority Support", "Audit Reports", "Clinical Modules"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Clinical Modules", "Unlimited Users", "24/7 Support", "Regulatory Consulting", "Validation Services", "Custom Integration"] 
      }
    },
    benefits: [
      "Ensure 100% HIPAA compliance",
      "Accelerate research timelines by 50%",
      "Reduce regulatory risks",
      "Streamline clinical operations"
    ]
  },
  "manufacturing-industrial": {
    name: "Manufacturing & Industrial Operations Suite",
    description: "Tailored for manufacturers focused on inventory optimization, supply chain efficiency, and operational excellence.",
    detailedDescription: "Designed for manufacturing companies that need to optimize production workflows, manage complex supply chains, and maintain operational excellence. Includes tools for inventory management, quality control, and performance tracking.",
    icon: "🏭",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® Supply Chain Wizard",
      "Nebusis® Inventory Wizard",
      "Nebusis® Performance Tracker",
      "Nebusis® SmartBooks",
      "Nebusis® Workflow Engine",
      "Nebusis® CyberWatch"
    ],
    standards: ["ISO 9001", "ISO 14001", "Manufacturing Standards"],
    targetIndustries: ["Manufacturing", "Industrial Operations", "Production Facilities", "Factory Management"],
    features: [
      "Production workflow optimization",
      "Inventory management",
      "Quality control systems",
      "Supply chain visibility",
      "Performance analytics",
      "Cost tracking",
      "Compliance monitoring"
    ],
    pricing: {
      starter: { 
        price: 8500, 
        setupFee: 5000,
        features: ["5 Core Apps", "Up to 30 Users", "Basic Manufacturing Tools", "Email Support", "Standard Reports"] 
      },
      professional: { 
        price: 15500, 
        setupFee: 8000,
        features: ["All 7 Apps", "Up to 100 Users", "Advanced Manufacturing", "Priority Support", "Custom Reports", "API Access"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Manufacturing Modules", "Unlimited Users", "24/7 Support", "On-site Training", "Custom Integration"] 
      }
    },
    benefits: [
      "Reduce production downtime by 40%",
      "Improve inventory accuracy by 85%",
      "Streamline supply chain operations",
      "Enhance quality control processes"
    ]
  },
  "security-defense": {
    name: "Security & Defense Suite",
    description: "Specialized for organizations requiring top-tier cybersecurity, compliance, and operational security measures.",
    detailedDescription: "Built for security-sensitive organizations including defense contractors, government agencies, and security services. Provides comprehensive cybersecurity tools, compliance management, and operational security protocols.",
    icon: "🛡️",
    apps: [
      "Nebusis® CyberWatch",
      "Nebusis® ComplianceOne",
      "Nebusis® LegalFlow",
      "Nebusis® KnowledgeCheck",
      "Nebusis® PowerDocs",
      "Nebusis® SmartBooks",
      "Nebusis® PeopleCore"
    ],
    standards: ["ISO 27001", "NIST Framework", "Defense Standards", "Security Protocols"],
    targetIndustries: ["Defense Contractors", "Security Services", "Government Agencies", "Critical Infrastructure"],
    features: [
      "Advanced threat detection",
      "Compliance automation",
      "Secure document management",
      "Security training programs",
      "Incident response protocols",
      "Risk assessment tools",
      "Audit trail management"
    ],
    pricing: {
      starter: { 
        price: 12000, 
        setupFee: 8000,
        features: ["5 Core Apps", "Up to 25 Users", "Basic Security Tools", "Email Support", "Security Reports"] 
      },
      professional: { 
        price: 22000, 
        setupFee: 12000,
        features: ["All 7 Apps", "Up to 75 Users", "Advanced Security", "Priority Support", "Threat Intelligence", "Custom Reports"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Security Modules", "Unlimited Users", "24/7 Security Support", "Dedicated Security Team", "Custom Integration"] 
      }
    },
    benefits: [
      "Enhance security posture by 90%",
      "Reduce compliance risks",
      "Improve incident response time",
      "Streamline security operations"
    ]
  },
  "esg-sustainability": {
    name: "ESG & Sustainability Suite",
    description: "Comprehensive solution for environmental, social, and governance reporting and compliance management.",
    detailedDescription: "Designed for organizations focused on sustainability, ESG reporting, and environmental compliance. Includes tools for carbon tracking, sustainability reporting, and governance management.",
    icon: "🌱",
    apps: [
      "Nebusis® ESG GreenCore",
      "Nebusis® ComplianceOne",
      "Nebusis® SmartBooks",
      "Nebusis® PowerDocs",
      "Nebusis® Data Analytics Hub",
      "Nebusis® Workflow Engine"
    ],
    standards: ["ESG Standards", "Environmental Regulations", "Sustainability Frameworks"],
    targetIndustries: ["Sustainable Companies", "Green Energy", "Environmental Services", "Corporate ESG"],
    features: [
      "ESG reporting automation",
      "Carbon footprint tracking",
      "Sustainability metrics",
      "Regulatory compliance",
      "Environmental monitoring",
      "Stakeholder reporting",
      "Impact measurement"
    ],
    pricing: {
      starter: { 
        price: 7500, 
        setupFee: 4000,
        features: ["4 Core Apps", "Up to 20 Users", "Basic ESG Tools", "Email Support", "Standard Reports"] 
      },
      professional: { 
        price: 14000, 
        setupFee: 7000,
        features: ["All 6 Apps", "Up to 75 Users", "Advanced ESG Analytics", "Priority Support", "Custom Reports", "API Access"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + ESG Modules", "Unlimited Users", "24/7 Support", "ESG Consulting", "Custom Integration"] 
      }
    },
    benefits: [
      "Improve ESG scores by 60%",
      "Streamline sustainability reporting",
      "Reduce environmental impact",
      "Enhance stakeholder transparency"
    ]
  },
  "retail-ecommerce": {
    name: "Retail & E-commerce Suite",
    description: "Optimized for retail operations, inventory management, and customer engagement across all channels.",
    detailedDescription: "Built for retail companies that need to manage inventory, engage customers, and optimize operations across multiple channels. Includes tools for customer management, inventory tracking, and performance analytics.",
    icon: "🛒",
    apps: [
      "Nebusis® Inventory Wizard",
      "Nebusis® Client360",
      "Nebusis® Engage",
      "Nebusis® SmartBooks",
      "Nebusis® Data Analytics Hub",
      "Nebusis® Supply Chain Wizard"
    ],
    standards: ["Retail Standards", "E-commerce Regulations", "Customer Data Protection"],
    targetIndustries: ["Retail Stores", "E-commerce", "Fashion", "Consumer Goods"],
    features: [
      "Inventory optimization",
      "Customer engagement tools",
      "Multi-channel management",
      "Sales analytics",
      "Supply chain tracking",
      "Customer insights",
      "Performance monitoring"
    ],
    pricing: {
      starter: { 
        price: 6500, 
        setupFee: 3000,
        features: ["4 Core Apps", "Up to 15 Users", "Basic Retail Tools", "Email Support", "Standard Reports"] 
      },
      professional: { 
        price: 12000, 
        setupFee: 6000,
        features: ["All 6 Apps", "Up to 50 Users", "Advanced Retail Analytics", "Priority Support", "Custom Reports", "API Access"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Retail Modules", "Unlimited Users", "24/7 Support", "Custom Integration", "Multi-store Management"] 
      }
    },
    benefits: [
      "Improve inventory turnover by 45%",
      "Enhance customer satisfaction",
      "Increase sales conversion",
      "Optimize supply chain efficiency"
    ]
  },
  "professional-services": {
    name: "Professional Services Suite",
    description: "Tailored for consultants, law firms, and service providers requiring client management and billing automation.",
    detailedDescription: "Designed for professional services firms that need to manage client relationships, track time, and automate billing processes. Includes tools for project management, document management, and client communications.",
    icon: "👔",
    apps: [
      "Nebusis® Client360",
      "Nebusis® LegalFlow",
      "Nebusis® PowerDocs",
      "Nebusis® SmartBooks",
      "Nebusis® PeopleCore",
      "Nebusis® Engage",
      "Nebusis® ComplianceOne"
    ],
    standards: ["Professional Standards", "Client Confidentiality", "Legal Compliance"],
    targetIndustries: ["Law Firms", "Consultants", "Accounting Firms", "Training Providers"],
    features: [
      "Client relationship management",
      "Time tracking and billing",
      "Document management",
      "Project tracking",
      "Compliance monitoring",
      "Staff management",
      "Financial reporting"
    ],
    pricing: {
      starter: { 
        price: 5500, 
        setupFee: 2500,
        features: ["4 Core Apps", "Up to 10 Users", "Basic Client Management", "Email Support"] 
      },
      professional: { 
        price: 10500, 
        setupFee: 5000,
        features: ["All 7 Apps", "Up to 50 Users", "Advanced Client Tools", "Priority Support", "Time Tracking"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Professional Modules", "Unlimited Users", "24/7 Support", "Custom Workflows", "Billing Integration"] 
      }
    },
    benefits: [
      "Improve client satisfaction by 70%",
      "Reduce billing cycle time",
      "Enhance project delivery",
      "Streamline operations"
    ]
  },
  "education-training": {
    name: "Education & Training Providers Suite",
    description: "Comprehensive solution for educational institutions and training providers requiring course management and certification systems.",
    detailedDescription: "Built for educational institutions, corporate academies, and training providers that need to manage courses, track student progress, and issue certifications. Includes learning management tools, assessment systems, and certification tracking.",
    icon: "🎓",
    apps: [
      "Nebusis® e-Learning Wizard",
      "Nebusis® KnowledgeCheck",
      "Nebusis® Client360",
      "Nebusis® PowerDocs",
      "Nebusis® PeopleCore",
      "Nebusis® ComplianceOne"
    ],
    standards: ["Educational Standards", "Certification Requirements", "Quality Assurance"],
    targetIndustries: ["Universities", "Corporate Academies", "Training Centers", "Certification Bodies"],
    features: [
      "Learning management system",
      "Student progress tracking",
      "Certification management",
      "Course delivery tools",
      "Assessment systems",
      "Reporting and analytics",
      "Compliance tracking"
    ],
    pricing: {
      starter: { 
        price: 4500, 
        setupFee: 2000,
        features: ["4 Core Apps", "Up to 100 Students", "Basic LMS", "Email Support"] 
      },
      professional: { 
        price: 8500, 
        setupFee: 4000,
        features: ["All 6 Apps", "Up to 500 Students", "Advanced Learning Tools", "Priority Support", "Custom Certificates"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Education Modules", "Unlimited Students", "24/7 Support", "Custom Integration", "Academic Analytics"] 
      }
    },
    benefits: [
      "Improve student completion rates by 80%",
      "Streamline certification processes",
      "Enhance learning outcomes",
      "Reduce administrative overhead"
    ]
  },
  "financial-insurance": {
    name: "Financial Services & Insurance Suite",
    description: "Specialized solution for financial institutions requiring compliance, risk management, and client servicing capabilities.",
    detailedDescription: "Designed for banks, insurance companies, and financial services firms that need to manage compliance, assess risk, and provide excellent client service. Includes tools for regulatory compliance, risk management, and client communications.",
    icon: "🏦",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® LegalFlow",
      "Nebusis® SmartBooks",
      "Nebusis® PowerDocs",
      "Nebusis® CyberWatch",
      "Nebusis® Client360",
      "Nebusis® Data Analytics Hub"
    ],
    standards: ["ISO 27001", "Financial Regulations", "Risk Management", "Data Protection"],
    targetIndustries: ["Banks", "Insurance Companies", "Investment Firms", "Fintech Companies"],
    features: [
      "Regulatory compliance automation",
      "Risk assessment tools",
      "Client portfolio management",
      "Secure document handling",
      "Financial reporting",
      "Audit trail management",
      "Cybersecurity protocols"
    ],
    pricing: {
      starter: { 
        price: 9500, 
        setupFee: 5000,
        features: ["4 Core Apps", "Up to 25 Users", "Basic Compliance", "Email Support"] 
      },
      professional: { 
        price: 18000, 
        setupFee: 9000,
        features: ["All 7 Apps", "Up to 100 Users", "Advanced Risk Tools", "Priority Support", "Regulatory Reports"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Financial Modules", "Unlimited Users", "24/7 Support", "Regulatory Consulting", "Custom Integration"] 
      }
    },
    benefits: [
      "Reduce compliance costs by 50%",
      "Enhance risk management",
      "Improve client satisfaction",
      "Streamline operations"
    ]
  },
  "government-public": {
    name: "Government & Public Institutions Suite",
    description: "Comprehensive solution for government agencies requiring digital governance, compliance, and public service management.",
    detailedDescription: "Built for government agencies and public institutions that need to manage digital governance, ensure compliance, and provide efficient public services. Includes tools for document management, workflow automation, and compliance tracking.",
    icon: "🏛️",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® Workflow Engine",
      "Nebusis® CyberWatch",
      "Nebusis® KnowledgeCheck",
      "Nebusis® LegalFlow",
      "Nebusis® SmartBooks",
      "Nebusis® PowerDocs"
    ],
    standards: ["Government Standards", "Public Sector Compliance", "Digital Governance"],
    targetIndustries: ["Government Agencies", "Public Institutions", "Municipal Services", "Regulatory Bodies"],
    features: [
      "Digital governance tools",
      "Compliance automation",
      "Public service management",
      "Document integrity",
      "Workflow automation",
      "Audit trail management",
      "Cybersecurity protocols"
    ],
    pricing: {
      starter: { 
        price: 11000, 
        setupFee: 6000,
        features: ["4 Core Apps", "Up to 50 Users", "Basic Governance", "Email Support"] 
      },
      professional: { 
        price: 20000, 
        setupFee: 10000,
        features: ["All 7 Apps", "Up to 200 Users", "Advanced Governance", "Priority Support", "Audit Trails"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Government Modules", "Unlimited Users", "24/7 Support", "On-site Deployment", "Custom Integration"] 
      }
    },
    benefits: [
      "Improve public service delivery",
      "Enhance transparency",
      "Reduce administrative costs",
      "Strengthen governance"
    ]
  },
  "technology-saas": {
    name: "Technology & SaaS Companies Suite",
    description: "Optimized for technology companies requiring compliance, client management, and operational transparency.",
    detailedDescription: "Designed for technology companies, SaaS providers, and IT services firms that need to manage compliance, engage clients, and maintain operational transparency. Includes tools for compliance management, client onboarding, and operational monitoring.",
    icon: "💻",
    apps: [
      "Nebusis® ComplianceOne",
      "Nebusis® CyberWatch",
      "Nebusis® SmartBooks",
      "Nebusis® PeopleCore",
      "Nebusis® Engage",
      "Nebusis® Data Analytics Hub",
      "Nebusis® Workflow Engine"
    ],
    standards: ["ISO/IEC 27001", "ISO 9001", "SOC 2", "GDPR"],
    targetIndustries: ["SaaS Companies", "Tech Startups", "Software Developers", "IT Services"],
    features: [
      "Compliance automation",
      "Client onboarding",
      "Operational transparency",
      "Security monitoring",
      "Performance tracking",
      "Team management",
      "Data analytics"
    ],
    pricing: {
      starter: { 
        price: 7000, 
        setupFee: 3000,
        features: ["4 Core Apps", "Up to 25 Users", "Basic Tech Stack", "Email Support"] 
      },
      professional: { 
        price: 13500, 
        setupFee: 6500,
        features: ["All 7 Apps", "Up to 100 Users", "Advanced DevOps", "Priority Support", "API Access"] 
      },
      enterprise: { 
        price: "Custom Quote", 
        features: ["All Apps + Tech Modules", "Unlimited Users", "24/7 Support", "Custom Integration", "White-label Options"] 
      }
    },
    benefits: [
      "Accelerate compliance certification",
      "Improve client satisfaction",
      "Enhance operational efficiency",
      "Reduce security risks"
    ]
  }
};

export default function SuiteDetail() {
  const [match, params] = useRoute('/sector-suites/:slug');
  const [selectedTier, setSelectedTier] = useState<'starter' | 'professional' | 'enterprise'>('professional');
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [calculatorData, setCalculatorData] = useState<any>(null);
  
  if (!match || !params?.slug) {
    return <div>Suite not found</div>;
  }

  const suite = SUITE_DATA[params.slug as keyof typeof SUITE_DATA];
  
  if (!suite) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Suite Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The requested sector suite could not be found.</p>
          <Button asChild>
            <Link href="/sector-suites">Back to Sector Suites</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/sector-suites" className="text-blue-600 hover:text-blue-800">
                  Sector Suites
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                  <span className="text-gray-500">{suite.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="text-left mb-12">
          <div className="text-6xl mb-4">{suite.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {suite.name}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {suite.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="standards">Standards</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Suite Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{suite.detailedDescription}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {suite.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Business Benefits</h4>
                        <ul className="space-y-2">
                          {suite.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Target Industries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {suite.targetIndustries.map((industry) => (
                        <div key={industry} className="text-center">
                          <div className="w-12 h-12 bg-nebusis-primary rounded-lg flex items-center justify-center mx-auto mb-2">
                            <Building2 className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">{industry}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Request Demo and Get Quote buttons */}
                    <div className="flex gap-4 pt-4 border-t">
                      <SuiteDemoRequestDialog suiteName={suite.name}>
                        <Button size="lg" className="bg-nebusis-primary text-white hover:bg-nebusis-dark">
                          <Play className="mr-2 h-4 w-4" />
                          Request Demo
                        </Button>
                      </SuiteDemoRequestDialog>
                      <SuiteQuoteRequestDialog suiteName={suite.name}>
                        <Button size="lg" variant="outline">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Get Quote
                        </Button>
                      </SuiteQuoteRequestDialog>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Included Applications</CardTitle>
                    <CardDescription>
                      This suite includes {suite.apps.length} pre-configured Nebusis® applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {suite.apps.map((app, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-gray-900">{app}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="standards" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Standards</CardTitle>
                    <CardDescription>
                      Pre-configured to meet industry-specific compliance requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {suite.standards.map((standard) => (
                        <div key={standard} className="flex items-center p-4 border rounded-lg">
                          <Globe className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <h4 className="font-medium text-gray-900">{standard}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <SuitePricingCalculator 
                  suiteName={suite.name}
                  pricing={suite.pricing}
                  onRequestDemo={() => {}}
                  onRequestQuote={(data) => {}}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <SuiteDemoRequestDialog suiteName={suite.name}>
                  <Button className="w-full bg-nebusis-primary text-white hover:bg-nebusis-dark">
                    <Play className="h-4 w-4 mr-2" />
                    Request Demo
                  </Button>
                </SuiteDemoRequestDialog>
                <SuiteQuoteRequestDialog suiteName={suite.name}>
                  <Button variant="outline" className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Get Custom Quote
                  </Button>
                </SuiteQuoteRequestDialog>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">
                    Contact Sales
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suite Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-semibold">{suite.apps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Compliance Standards</span>
                  <span className="font-semibold">{suite.standards.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Industries</span>
                  <span className="font-semibold">{suite.targetIndustries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Implementation Time</span>
                  <span className="font-semibold">2-4 weeks</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}