import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle, Building, GraduationCap, Zap, Shield, CreditCard, Users, Settings, Phone, Mail } from "lucide-react";

// FAQ Categories
const FAQ_CATEGORIES = [
  {
    id: 'general',
    title: 'General Questions',
    icon: HelpCircle,
    color: 'bg-blue-500',
    questions: [
      {
        question: "What is Nebusis® Cloud Services?",
        answer: "Nebusis® Cloud Services is a comprehensive enterprise SaaS platform offering intelligent business applications, professional certification programs, and digital transformation services. Our platform includes 18+ business applications, 16 certification programs, and specialized consulting services."
      },
      {
        question: "How do I get started with Nebusis® services?",
        answer: "You can start by scheduling a demo through our website, contacting our sales team, or exploring our pricing directory to find the right solution for your needs. We offer free consultations to help determine the best approach for your organization."
      },
      {
        question: "What industries do you serve?",
        answer: "We serve a wide range of industries including healthcare, finance, manufacturing, retail, technology, government, and more. Our solutions are designed to be adaptable to various industry-specific compliance and operational requirements."
      },
      {
        question: "Do you offer custom solutions?",
        answer: "Yes, we provide comprehensive digital transformation services including custom development, special projects, and tailored solutions. Our team works closely with clients to understand their unique requirements and deliver solutions that fit their specific needs."
      },
      {
        question: "What support do you provide?",
        answer: "We offer multiple support tiers including standard business hours support, premium 24/7 support, dedicated account management, and comprehensive training programs. All subscriptions include access to our knowledge base and community forums."
      }
    ]
  },
  {
    id: 'applications',
    title: 'Business Applications',
    icon: Building,
    color: 'bg-green-500',
    questions: [
      {
        question: "How many business applications are included in the Nebusis® Business Suite?",
        answer: "The Nebusis® Business Suite includes 18+ intelligent applications covering compliance management, cybersecurity, financial operations, inventory management, workflow automation, and more. Each application is designed to integrate seamlessly with others in the suite."
      },
      {
        question: "What is Nebusis® ComplianceOne?",
        answer: "ComplianceOne is our flagship compliance management platform supporting 30+ ISO standards including ISO 9001, ISO 27001, SOC 2, GDPR, HIPAA, and more. It provides automated compliance tracking, audit management, risk assessment, and reporting capabilities."
      },
      {
        question: "How does Nebusis® CyberWatch protect my organization?",
        answer: "CyberWatch provides comprehensive cybersecurity including SOC-as-a-Service, penetration testing, vCISO services, deception technology, and continuous monitoring. It offers proactive threat detection and response capabilities for scalable organizations."
      },
      {
        question: "Can I integrate Nebusis® applications with my existing systems?",
        answer: "Yes, all Nebusis® applications are built with integration capabilities including REST APIs, webhooks, and pre-built connectors for popular business systems. Our professional services team can assist with custom integrations as needed."
      },
      {
        question: "What is the Nebusis® Multiomics Engine?",
        answer: "The Nebusis® Multiomics Engine is our advanced application for precision medicine and integrated omics workflows. It streamlines complex biological data analysis and supports research organizations in genomics, proteomics, and other omics fields."
      },
      {
        question: "How do I migrate data to Nebusis® applications?",
        answer: "We provide professional data migration services as part of our implementation packages. Our team handles data mapping, transformation, validation, and testing to ensure seamless migration from your existing systems with minimal downtime."
      }
    ]
  },
  {
    id: 'certifications',
    title: 'Training & Certification',
    icon: GraduationCap,
    color: 'bg-purple-500',
    questions: [
      {
        question: "How many certification programs do you offer?",
        answer: "We offer 16 professional certification programs covering cybersecurity, compliance, digital transformation, data analysis, supply chain management, and emerging technologies. All programs are designed for working professionals."
      },
      {
        question: "What is the format of your certification programs?",
        answer: "All certification programs are 16 hours in duration and delivered through our comprehensive online learning platform. They include video lectures, interactive modules, practical exercises, and final assessments."
      },
      {
        question: "What is the cost of certification programs?",
        answer: "All certification programs are priced at $295.00 each. We offer a special promotion where you can buy 4 certifications and get the 5th one free, providing significant savings for multiple certifications."
      },
      {
        question: "Are your certifications recognized by industry?",
        answer: "Yes, our certifications are developed in collaboration with industry experts and aligned with current market demands. They provide practical skills and knowledge that are immediately applicable in professional environments."
      },
      {
        question: "How long do I have to complete a certification?",
        answer: "Once enrolled, you have 90 days to complete your certification program. The 16-hour content can be completed at your own pace, and you can access materials 24/7 through our learning platform."
      },
      {
        question: "Do you provide continuing education credits?",
        answer: "Yes, many of our certifications qualify for continuing education credits (CEUs) for various professional organizations. Specific credit details are provided in each certification's description."
      }
    ]
  },
  {
    id: 'services',
    title: 'Digital Transformation Services',
    icon: Zap,
    color: 'bg-orange-500',
    questions: [
      {
        question: "What digital transformation services do you provide?",
        answer: "We offer comprehensive digital transformation consulting, special projects, project management office (PMO) services, blockchain solutions, IoT integration, AI services, and custom web & app development."
      },
      {
        question: "How do you approach digital transformation projects?",
        answer: "We use a structured 4-step approach: Discovery & Assessment, Strategy Development, Implementation Planning, and Execution & Support. Each project includes thorough analysis of current state, future vision, and detailed roadmap development."
      },
      {
        question: "What is included in your AI services?",
        answer: "Our AI services include machine learning model development, natural language processing, computer vision solutions, predictive analytics, AI strategy consulting, and integration with existing business processes."
      },
      {
        question: "Do you provide blockchain development?",
        answer: "Yes, we offer end-to-end blockchain solutions including smart contract development, DeFi applications, NFT platforms, supply chain tracking, and enterprise blockchain integration services."
      },
      {
        question: "How do you handle custom web and app development?",
        answer: "Our development team creates custom web applications, mobile apps, and integrated systems using modern technologies. We follow agile methodologies and provide ongoing support and maintenance."
      },
      {
        question: "What is your project management approach?",
        answer: "We use proven PMO methodologies including Agile, Scrum, and traditional project management frameworks. Our certified project managers ensure deliverables are met on time and within budget."
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical & Security',
    icon: Shield,
    color: 'bg-red-500',
    questions: [
      {
        question: "What security measures do you implement?",
        answer: "We implement bank-level encryption, multi-factor authentication, regular security audits, compliance with SOC 2 Type II, ISO 27001, and other security frameworks. All data is encrypted in transit and at rest."
      },
      {
        question: "Where is my data stored?",
        answer: "Data is stored in secure, geographically distributed data centers with redundancy and backup systems. We comply with data residency requirements and offer options for specific geographic data storage when needed."
      },
      {
        question: "What is your uptime guarantee?",
        answer: "We provide a 99.9% uptime SLA for all our applications and services. Our infrastructure is designed with redundancy and failover capabilities to ensure maximum availability."
      },
      {
        question: "How do you handle data backup and recovery?",
        answer: "We perform automated daily backups with multiple retention periods. Our disaster recovery procedures include rapid restoration capabilities and business continuity planning to minimize any potential downtime."
      },
      {
        question: "What compliance certifications do you maintain?",
        answer: "We maintain SOC 2 Type II, ISO 27001, GDPR compliance, HIPAA compliance, and other industry-specific certifications. Regular audits ensure ongoing compliance with all applicable standards."
      },
      {
        question: "Can I integrate with third-party systems?",
        answer: "Yes, our platforms provide comprehensive APIs, webhooks, and integration capabilities. We support popular business systems including CRM, ERP, HRIS, and other enterprise applications."
      }
    ]
  },
  {
    id: 'billing',
    title: 'Billing & Pricing',
    icon: CreditCard,
    color: 'bg-yellow-500',
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards, ACH transfers, wire transfers, and purchase orders for qualified organizations. Annual subscriptions receive a 10% discount compared to monthly billing."
      },
      {
        question: "How is pricing calculated for business applications?",
        answer: "Pricing is based on the subscription plan (Starter, Pro, Enterprise), number of users, and additional services. Our pricing calculator provides instant quotes based on your specific requirements."
      },
      {
        question: "Are there setup fees?",
        answer: "Setup fees vary by application and services selected. Standard implementations typically range from $1,000-$5,000. Data migration and custom integration services may have additional fees."
      },
      {
        question: "Do you offer discounts for multiple applications?",
        answer: "Yes, we offer bundle discounts for multiple applications and volume discounts for larger organizations. Annual subscriptions receive 10% off monthly pricing, and enterprise clients receive custom pricing."
      },
      {
        question: "What is your refund policy?",
        answer: "Due to the nature of our software solutions, refunds are evaluated on a case-by-case basis for legitimate technical issues or unresolvable compatibility problems. Refunds are not available after data integration, configuration, or active use of the system. Custom development, training services, and setup fees are non-refundable. Contact our support team within 14 days of purchase for refund consideration."
      },
      {
        question: "How do I upgrade or downgrade my subscription?",
        answer: "You can modify your subscription at any time through your account dashboard or by contacting our support team. Changes are prorated and take effect immediately or at the next billing cycle."
      }
    ]
  },
  {
    id: 'support',
    title: 'Support & Training',
    icon: Users,
    color: 'bg-indigo-500',
    questions: [
      {
        question: "What support options are available?",
        answer: "We offer standard business hours support, premium 24/7 support, dedicated account management, and comprehensive training programs. Support includes email, chat, phone, and video consultation options."
      },
      {
        question: "How do I access support?",
        answer: "Support is available through multiple channels: support portal, live chat widget, email, phone, and video calls. Premium support customers receive priority response times and dedicated support representatives."
      },
      {
        question: "What training is included with my subscription?",
        answer: "All subscriptions include access to our knowledge base, video tutorials, and user guides. Premium plans include live training sessions, webinars, and personalized onboarding support."
      },
      {
        question: "Do you provide implementation assistance?",
        answer: "Yes, we offer comprehensive implementation services including project planning, configuration, data migration, integration setup, user training, and go-live support to ensure successful deployment."
      },
      {
        question: "What are your support response times?",
        answer: "Standard support: 24-48 hours for general inquiries, 8 hours for urgent issues. Premium support: 4 hours for general inquiries, 1 hour for urgent issues, immediate response for critical issues."
      },
      {
        question: "Can I get one-on-one training?",
        answer: "Yes, we offer personalized training sessions for administrators and end users. These can be conducted via video conference and customized to your specific use cases and requirements."
      }
    ]
  }
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter questions based on search term
  const filteredCategories = FAQ_CATEGORIES.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    !selectedCategory || category.id === selectedCategory
  ).filter(category => 
    searchTerm === "" || category.questions.length > 0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Find answers to common questions about our applications, services, certifications, and support. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="max-w-md mx-auto relative">
            <Input
              type="search"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nebusis focus:border-transparent"
            />
            <div className="absolute left-3 top-3.5">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory 
                  ? 'bg-nebusis text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Categories
            </button>
            {FAQ_CATEGORIES.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id 
                      ? 'bg-nebusis text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-6">
          {filteredCategories.map(category => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mt-1">
                          {category.questions.length} questions
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.id}-${index}`}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pt-2 pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && searchTerm && (
          <div className="py-12">
            <HelpCircle className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse all categories
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-nebusis hover:text-nebusis/80 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Contact Support */}
        <Card className="mt-12 bg-gradient-to-r from-nebusis to-blue-600 text-white">
          <CardContent className="pt-8 pb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-lg mb-6 opacity-90">
                Our support team is here to help you find the answers you need
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-nebusis rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Support
                </a>
                <a
                  href="/support"
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white hover:text-nebusis transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Support Portal
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}