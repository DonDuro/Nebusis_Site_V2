export interface Application {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  status: "live" | "coming_soon" | "beta";
  category: string;
  features: string[];
  pricing?: {
    starter: { price: number; features: string[] };
    pro: { price: number; features: string[] };
    enterprise: { price: number; features: string[] };
  };
  integrations: string[];
  targetIndustries: string[];
  createdAt: Date;
}

export interface Certification {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  duration: number;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  thumbnailUrl?: string | null;
  modules: CertificationModule[];
  requirements: string[];
  learningOutcomes: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface CertificationModule {
  id: string;
  title: string;
  description: string;
  duration: number;
  topics: string[];
  videoUrl?: string;
  documentUrl?: string;
  quiz?: { questions: any[] };
}

export interface DemoRequest {
  id: number;
  name: string;
  email: string;
  company: string;
  phone?: string;
  applicationId?: number;
  message?: string;
  status: "pending" | "approved" | "rejected" | "completed";
  requestedDate?: Date;
  createdAt: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "news" | "case-studies" | "announcements";
  author: string;
  publishedAt?: Date;
  isPublished: boolean;
  createdAt: Date;
}

export interface Video {
  id: number;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category: "demo" | "promotional" | "tutorial" | "compliance" | "security" | "multiomics" | "iot";
  applicationId?: number;
  duration?: number;
  isPublic: boolean;
  createdAt: Date;
}

export interface Purchase {
  id: number;
  userId?: number;
  itemType: "license" | "certification";
  itemId: number;
  amount: string;
  stripePaymentIntentId?: string;
  status: "pending" | "completed" | "failed";
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface NavigationItem {
  label: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: { label: string; href: string }[];
}

export interface ValueProposition {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Industry {
  name: string;
  icon: string;
  description: string;
}
