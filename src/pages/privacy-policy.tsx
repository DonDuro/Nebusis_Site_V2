import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Database, Globe, Users, FileText, AlertTriangle, Mail, CheckCircle } from "lucide-react";

const PRIVACY_SECTIONS = [
  {
    id: "principles",
    title: "Our Privacy Principles",
    icon: Shield,
    content: "Your trust is essential. We design our services to follow international privacy laws and best practices, including transparency, accountability, purpose limitation, data minimization, and security-by-design."
  },
  {
    id: "coverage",
    title: "Applications and Coverage",
    icon: Database,
    content: "This policy applies to the full suite of Nebusis® software-as-a-service (SaaS) platforms, including all 23 applications in our Business Suite, plus our website and customer portals.",
    applications: [
      "Nebusis® ComplianceOne (primary application)",
      "Nebusis® SmartBooks",
      "Nebusis® Engage", 
      "Nebusis® CyberWatch",
      "Nebusis® LegalFlow",
      "Nebusis® ESG GreenCore",
      "Nebusis® PeopleCore",
      "Nebusis® PowerDocs",
      "Nebusis® PerformanceTracker",
      "Nebusis® ZappFormZ",
      "Nebusis® WizSpeek",
      "Nebusis® ControlCore",
      "And 12 additional applications in development"
    ]
  },
  {
    id: "collection",
    title: "What We Collect",
    icon: Eye,
    content: "We collect various types of information depending on how you interact with us:",
    dataTypes: [
      "User identifiers (names, roles, credentials)",
      "Organizational data (company name, location, certification status)",
      "Technical data (IP address, browser, device, telemetry)",
      "Behavioral data (usage patterns, access logs)",
      "Compliance content (policies, audit reports, documented procedures)"
    ]
  },
  {
    id: "purpose",
    title: "Purpose of Data Use",
    icon: CheckCircle,
    content: "We use your data to:",
    purposes: [
      "Deliver, support, and optimize services like Nebusis® ComplianceOne",
      "Enable AI-powered compliance automation and reporting",
      "Customize user experience and interface interactions",
      "Support legal and regulatory obligations",
      "Improve product functionality and security",
      "Manage contracts, accounts, and subscriptions"
    ],
    note: "We only process data for specific, legitimate purposes, based on legal grounds such as consent, performance of contract, or compliance with laws."
  },
  {
    id: "security",
    title: "Hosting and Cloud Infrastructure Security",
    icon: Lock,
    content: "Nebusis® relies on trusted third-party cloud providers such as Amazon Web Services (AWS) for hosting. These providers ensure:",
    securityFeatures: [
      "Encryption of data in transit and at rest",
      "Physical and digital access control",
      "Redundancy and availability monitoring",
      "Independent certification to international security standards (e.g., ISO/IEC 27001)"
    ],
    additional: "All data is logically separated, and administrative access is tightly restricted."
  },
  {
    id: "ai-research",
    title: "Research and AI Model Development",
    icon: Database,
    content: "With client authorization or using de-identified data, Nebusis® may analyze system usage to train AI models, enhance rule engines, and improve products like Nebusis® ComplianceOne, Nebusis® Engage, and Nebusis® CyberWatch.",
    important: "No identifiable information is ever used for machine learning without explicit permission."
  },
  {
    id: "industry-controls",
    title: "Industry-Specific Privacy Controls",
    icon: Shield,
    content: "Nebusis® solutions support regulated environments. For clients in healthcare, finance, government, or defense, we apply additional privacy safeguards aligned with:",
    regulations: ["HIPAA", "ISO/IEC 27001", "ISO 42001", "GDPR", "Local regulatory requirements"],
    note: "Custom configurations are available to meet your organization's compliance mandates."
  },
  {
    id: "global-transfers",
    title: "Global Data Transfers",
    icon: Globe,
    content: "Your data may be stored or processed outside your country. Wherever it resides, Nebusis® enforces consistent privacy protections, using appropriate mechanisms such as:",
    mechanisms: [
      "Standard Contractual Clauses (SCCs)",
      "Data Processing Agreements (DPAs)",
      "Vendor audits and risk assessments"
    ]
  },
  {
    id: "rights",
    title: "Your Rights",
    icon: Users,
    content: "Depending on your jurisdiction, you may have the right to:",
    rights: [
      "Access your personal or organization-related data",
      "Request correction of inaccuracies",
      "Request deletion or restriction of use",
      "Object to processing or withdraw consent",
      "Receive your data in a portable format"
    ],
    contact: "To submit a request, visit the Contact section of www.nebusis.com."
  },
  {
    id: "breach-response",
    title: "Breach Response and Notification",
    icon: AlertTriangle,
    content: "In case of a suspected data breach, Nebusis® activates its incident response plan to:",
    responses: [
      "Contain the event",
      "Notify affected parties promptly (as required by law)",
      "Cooperate with regulatory authorities",
      "Apply remediation and root cause fixes"
    ]
  }
];

const KEY_HIGHLIGHTS = [
  {
    icon: Shield,
    title: "Security by Design",
    description: "Built-in privacy protections across all 23 applications"
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description: "GDPR, HIPAA, ISO standards alignment worldwide"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "AWS infrastructure with end-to-end encryption"
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(210,45%,40%)] to-[hsl(210,45%,32%)] text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Shield className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">Privacy & Data Protection</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Nebusis®</span> <span className="text-yellow-400">Privacy Policy</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4 max-w-4xl leading-relaxed">
              <span className="text-yellow-400 font-semibold">Protecting your privacy across all business applications</span>
            </p>
            <p className="text-blue-100 text-lg mb-12 max-w-4xl">
              Comprehensive data protection • Transparent practices • Your rights respected
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              {KEY_HIGHLIGHTS.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div key={index} className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                    <IconComponent className="h-10 w-10 mb-4 text-yellow-400" />
                    <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                    <p className="text-sm opacity-90">{highlight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 border border-white border-opacity-20 rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-20 right-16 w-6 h-6 bg-yellow-400 bg-opacity-30 rounded-full"></div>
        <div className="absolute top-1/2 right-8 w-4 h-4 border border-yellow-400 border-opacity-40 rounded-sm transform -rotate-45"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-white bg-opacity-20 rounded-full"></div>
      </section>

      {/* Policy Effective Date */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="bg-nebusis-primary text-white mb-2">Version 1.0</Badge>
              <p className="text-gray-600">
                <span className="font-semibold">Effective Date:</span> January 31, 2025
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Last Updated:</span> January 31, 2025
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-2">Questions about this policy?</p>
              <p className="text-nebusis-primary font-semibold">Contact us through www.nebusis.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              At Nebusis®, we are committed to protecting your privacy and ensuring responsible data management across all our platforms and services. This Privacy Policy outlines how we collect, use, share, retain, and secure information across the Nebusis® Business Suite, with a particular focus on our primary platform, Nebusis® ComplianceOne.
            </p>
            <div className="bg-blue-50 border-l-4 border-nebusis-primary p-6 rounded-r-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Coverage Scope</h3>
              <p className="text-gray-700">
                This policy applies to all Nebusis® applications, portals, websites, and services. Whether you're using our live ComplianceOne platform or any of our 22 applications in development, the same privacy protections apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {PRIVACY_SECTIONS.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={section.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-nebusis-primary rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900">
                          {index + 1}. {section.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                    
                    {section.applications && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Applications Covered:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {section.applications.map((app, appIndex) => (
                            <div key={appIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-nebusis-primary rounded-full"></div>
                              <span className="text-gray-700 text-sm">{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.dataTypes && (
                      <div className="space-y-2">
                        {section.dataTypes.map((type, typeIndex) => (
                          <div key={typeIndex} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-nebusis-primary flex-shrink-0" />
                            <span className="text-gray-700">{type}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.purposes && (
                      <div className="space-y-3">
                        {section.purposes.map((purpose, purposeIndex) => (
                          <div key={purposeIndex} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{purpose}</span>
                          </div>
                        ))}
                        {section.note && (
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mt-4">
                            <p className="text-gray-700 font-medium">{section.note}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {section.securityFeatures && (
                      <div className="space-y-3">
                        {section.securityFeatures.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                            <Lock className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                        {section.additional && (
                          <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-gray-700 font-medium">{section.additional}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {section.regulations && (
                      <div className="flex flex-wrap gap-2">
                        {section.regulations.map((regulation, regIndex) => (
                          <Badge key={regIndex} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {regulation}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {section.mechanisms && (
                      <div className="space-y-2">
                        {section.mechanisms.map((mechanism, mechIndex) => (
                          <div key={mechIndex} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                            <Globe className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                            <span className="text-gray-700">{mechanism}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.rights && (
                      <div className="space-y-3">
                        {section.rights.map((right, rightIndex) => (
                          <div key={rightIndex} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <Users className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{right}</span>
                          </div>
                        ))}
                        {section.contact && (
                          <div className="bg-nebusis-primary text-white p-4 rounded-lg">
                            <p className="font-medium">{section.contact}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {section.responses && (
                      <div className="space-y-2">
                        {section.responses.map((response, responseIndex) => (
                          <div key={responseIndex} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{response}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.important && (
                      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <p className="text-red-800 font-semibold">{section.important}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personnel Data */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-nebusis-primary" />
                  Applicant and Personnel Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you apply for a job, internship, or business relationship with Nebusis®, we collect application materials, background information, and interview notes solely for evaluation, hiring, or collaboration purposes.
                </p>
                <Badge className="bg-blue-100 text-blue-800">Evaluation Purpose Only</Badge>
              </CardContent>
            </Card>

            {/* Age Limitations */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-nebusis-primary" />
                  Age Limitations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Nebusis® services are intended for business use by adults. We do not knowingly collect or process information from individuals under the age of 16.
                </p>
                <Badge className="bg-green-100 text-green-800">Business Use Only</Badge>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-nebusis-primary" />
                  Cookies and Tracking Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">We use cookies and related technologies to:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Keep users logged in securely</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Monitor application performance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Understand visitor behavior on Nebusis.com</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Users can manage cookie preferences through their browser or by adjusting settings on our website.
                </p>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-nebusis-primary" />
                  Retention and Data Disposal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">We keep your data only as long as necessary for:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700 text-sm">Active contracts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700 text-sm">Legal compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700 text-sm">Audit trails</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700 text-sm">Dispute resolution</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Upon contract termination or user request, data may be deleted, anonymized, or returned, based on your preference and legal rights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Updates and Contact */}
      <section className="py-16 bg-gradient-to-r from-nebusis-primary to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <FileText className="h-8 w-8" />
                Updates to This Policy
              </h2>
              <p className="text-lg mb-6 opacity-90">
                We may update this Privacy Policy periodically. When we do, we will:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-yellow-300" />
                  <span>Post a notice on www.nebusis.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-yellow-300" />
                  <span>Indicate the effective date at the top of this document</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-yellow-300" />
                  <span>Where required, provide direct notification through platform banners or messages</span>
                </li>
              </ul>
              <p className="text-sm opacity-75 mt-6">
                Your continued use of Nebusis® services indicates acceptance of the revised terms.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Mail className="h-8 w-8" />
                Contact and Inquiries
              </h2>
              <p className="text-lg mb-6 opacity-90">
                All questions or requests related to this Privacy Policy should be submitted via the Contact section of www.nebusis.com. This ensures secure and traceable handling by the appropriate team.
              </p>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-30">
                <h3 className="font-semibold text-lg mb-3">Quick Access</h3>
                <p className="mb-4">For privacy-related inquiries, use our secure contact form:</p>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="font-mono text-sm">www.nebusis.com/contact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}