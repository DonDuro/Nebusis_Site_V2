import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calculator, Building, GraduationCap, Zap, Code, Shield, Cloud, BarChart3, Server, Heart, School, Factory, Users } from "lucide-react";
import { Link } from "wouter";
import { Application } from "@/lib/types";

// Service categories for pricing directory
const SERVICE_CATEGORIES = [
  {
    id: 'business-applications',
    title: 'Business Applications',
    description: 'Intelligent SaaS solutions for modern enterprises',
    icon: Building,
    color: 'bg-blue-500',
    items: []
  },
  {
    id: 'training-certification',
    title: 'Training & Certification',
    description: 'Professional development and certification programs',
    icon: GraduationCap,
    color: 'bg-green-500',
    items: []
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation Services',
    description: 'Custom solutions and specialized services',
    icon: Zap,
    color: 'bg-purple-500',
    items: [
      { name: 'Digital Transformation', slug: 'digital-transformation' },
      { name: 'Special Projects', slug: 'special-projects' },
      { name: 'Project Management Office', slug: 'pmo' },
      { name: 'Blockchain Solutions', slug: 'blockchain-solutions' },
      { name: 'IoT Integration', slug: 'iot-integration' },
      { name: 'AI Services', slug: 'ai-services' },
      { name: 'Web & App Development', slug: 'web-app-development' }
    ]
  }
];

// Other services for quick access
const OTHER_SERVICES = [
  { name: 'Support Services', icon: Heart, route: '/support' },
  { name: 'Video Gallery', icon: Server, route: '/video-gallery' },
  { name: 'Blog & Resources', icon: School, route: '/blog' },
  { name: 'Industries', icon: Factory, route: '/industries' }
];

export default function Pricing() {
  const [primaryModule, setPrimaryModule] = useState("");
  const [users, setUsers] = useState([25]);
  const [additionalModules, setAdditionalModules] = useState<string[]>([]);
  const [includeTraining, setIncludeTraining] = useState(false);
  const [trainingDays, setTrainingDays] = useState([2]);
  const [quoteGenerated, setQuoteGenerated] = useState(false);
  const [quoteId, setQuoteId] = useState("");

  const { data: applications = [] } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  // Calculate pricing based on user count
  const getUserPricing = (userCount: number) => {
    const tier = USER_PRICING_TIERS.find(tier => userCount >= tier.min && userCount <= tier.max);
    return tier ? tier.pricePerUser : 5; // Default to enterprise pricing
  };

  // Calculate total price
  const calculatePrice = () => {
    if (!primaryModule) return { setupFee: 0, annualLicense: 0, trainingFee: 0, total: 0 };

    const module = COMPLIANCE_MODULES.find(m => m.id === primaryModule);
    if (!module) return { setupFee: 0, annualLicense: 0, trainingFee: 0, total: 0 };

    const userCount = users[0];
    const pricePerUser = getUserPricing(userCount);
    
    const setupFee = module.setupFee;
    const annualLicense = module.annualLicense + (userCount * pricePerUser * 12);
    
    // Additional modules cost
    const additionalModulesCost = additionalModules.reduce((total, moduleId) => {
      const additionalModule = ADDITIONAL_MODULES.find(m => m.id === moduleId);
      return total + (additionalModule ? additionalModule.price : 0);
    }, 0);

    // Training cost ($500 per day)
    const trainingFee = includeTraining ? trainingDays[0] * 500 : 0;

    const total = setupFee + annualLicense + additionalModulesCost + trainingFee;

    return {
      setupFee,
      annualLicense: annualLicense + additionalModulesCost,
      trainingFee,
      total
    };
  };

  const handleAdditionalModuleToggle = (moduleId: string) => {
    setAdditionalModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const generateQuote = () => {
    const newQuoteId = `NEB-${Date.now().toString().slice(-8)}`;
    setQuoteId(newQuoteId);
    setQuoteGenerated(true);
  };

  const downloadQuote = () => {
    // This would generate a PDF in a real implementation
    alert("Quote PDF would be generated and downloaded here");
  };

  const proceedToCheckout = () => {
    // Navigate to checkout with quote details
    const pricing = calculatePrice();
    const checkoutUrl = `/checkout?quote=${quoteId}&total=${pricing.total}`;
    window.location.href = checkoutUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pricing & Instant Quote
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Configure your compliance solution and get an instant quote. All pricing includes setup, annual licensing, and optional training.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Pre-configured packages for different business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <CardDescription>Perfect for small teams</CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-gray-900">$299</div>
                  <div className="text-gray-600">/month</div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Up to 20 users</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    5 core applications
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Basic support
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Email integration
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Mobile access
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-blue-600">$599</div>
                  <div className="text-gray-600">/month</div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Up to 50 users</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    All applications
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Priority support
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Advanced integrations
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Custom workflows
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    API access
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-gray-900">Custom</div>
                  <div className="text-gray-600">/month</div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Unlimited users</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    All applications + custom
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Dedicated support
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Custom integrations
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    On-premise deployment
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    SLA guarantee
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your Nebusis® experience with professional services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Training & Certification</CardTitle>
                <CardDescription>
                  Professional development programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[hsl(221,83%,53%)] mb-2">
                  From $299
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Per certification program
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/certifications">
                    View Certifications
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Support</CardTitle>
                <CardDescription>
                  Expert guidance for setup and deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[hsl(221,83%,53%)] mb-2">
                  From $2,500
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  One-time setup fee
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact?service=implementation">
                    Get Quote
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Development</CardTitle>
                <CardDescription>
                  Tailored solutions for unique requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[hsl(221,83%,53%)] mb-2">
                  Custom Quote
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Based on requirements
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact?service=custom">
                    Contact Us
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Calculator className="h-12 w-12 text-[hsl(221,83%,53%)] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interactive Pricing Calculator
            </h2>
            <p className="text-xl text-gray-600">
              Configure your compliance solution and get an instant quote. All pricing includes setup, annual licensing, and optional training.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    Primary Compliance Module
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Select your primary standard or compliance module
                    </Label>
                    <Select value={primaryModule} onValueChange={setPrimaryModule}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose a compliance module" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPLIANCE_MODULES.map((module) => (
                          <SelectItem key={module.id} value={module.id}>
                            {module.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    User Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Number of Users: {users[0]}
                    </Label>
                    <Slider
                      value={users}
                      onValueChange={setUsers}
                      min={1}
                      max={500}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 user</span>
                      <span>500+ users</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      Price per user: ${getUserPricing(users[0])}/month
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    Additional Modules (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ADDITIONAL_MODULES.map((module) => (
                      <div key={module.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`module-${module.id}`}
                          checked={additionalModules.includes(module.id)}
                          onCheckedChange={() => handleAdditionalModuleToggle(module.id)}
                        />
                        <Label htmlFor={`module-${module.id}`} className="text-sm font-medium">
                          {module.name}
                          <span className="text-xs text-gray-500 ml-1">(+${module.price})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Training Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="training-toggle"
                      checked={includeTraining}
                      onCheckedChange={setIncludeTraining}
                    />
                    <Label htmlFor="training-toggle" className="text-sm font-medium">
                      Include Training Sessions
                    </Label>
                  </div>

                  {includeTraining && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Training Days: {trainingDays[0]} days
                      </Label>
                      <Slider
                        value={trainingDays}
                        onValueChange={setTrainingDays}
                        min={1}
                        max={10}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 day</span>
                        <span>10 days</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        Training cost: $500/day
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Pricing Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    Pricing Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {primaryModule ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Setup Fee</span>
                          <span className="font-medium">${calculatePrice().setupFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Annual License</span>
                          <span className="font-medium">${calculatePrice().annualLicense.toLocaleString()}</span>
                        </div>
                        {includeTraining && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Training Fee</span>
                            <span className="font-medium">${calculatePrice().trainingFee.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Year 1</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ${calculatePrice().total.toLocaleString()}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {!quoteGenerated ? (
                          <Button 
                            className="w-full" 
                            size="lg"
                            onClick={generateQuote}
                            disabled={!primaryModule}
                          >
                            Generate Quote
                          </Button>
                        ) : (
                          <div className="space-y-2">
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <p className="text-sm text-green-800">
                                Quote Generated: <strong>{quoteId}</strong>
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={downloadQuote}
                                className="flex-1"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download PDF
                              </Button>
                              <Button 
                                size="sm"
                                onClick={proceedToCheckout}
                                className="flex-1"
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                Checkout
                              </Button>
                            </div>
                          </div>
                        )}
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/demos">
                            Request Demo
                          </Link>
                        </Button>
                      </div>

                      <div className="text-xs text-gray-500 text-center">
                        * Bulk/custom implementations receive special pricing
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Select a compliance module to see pricing
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Nebusis® compliance pricing
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's included in the setup fee?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The setup fee covers initial system configuration, data migration assistance, user account creation, 
                  basic training for administrators, and integration with your existing systems. This is a one-time cost 
                  that ensures your compliance platform is properly configured for your organization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How does the annual licensing work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Annual licensing includes access to your selected compliance modules, regular updates, 
                  standard support, and hosting. The cost scales with your user count and selected modules. 
                  Renewal notices are sent 60, 45, and 15 days before expiration with auto-renewal options available.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I add more standards later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, additional compliance modules can be added at any time. New modules are prorated for the 
                  current license period and included in your next renewal. Each module integrates seamlessly 
                  with your existing compliance framework.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What training options are available?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Training sessions are $500 per day and can be conducted on-site or virtually. Sessions cover 
                  system administration, end-user training, and compliance best practices. Half-day sessions 
                  are available at $300 each. Custom training programs can be developed for specific needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer bulk pricing discounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, organizations with large user counts or multiple compliance requirements receive 
                  special pricing. Custom implementations for enterprise clients include volume discounts, 
                  dedicated support, and tailored deployment options. Contact our sales team for a custom quote.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment options do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept all major credit cards through Stripe's secure payment processing. Annual billing 
                  is required for all compliance solutions. Purchase orders and wire transfers are available 
                  for enterprise accounts. All transactions include automatic invoicing and receipt generation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer a 14-day free trial for all plans. You can also request a personalized demo 
                  to see how Nebusis® fits your specific needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What support is included?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All plans include email support and access to our knowledge base. Professional and Enterprise 
                  plans include priority support with faster response times.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}