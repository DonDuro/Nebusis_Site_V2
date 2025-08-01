import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  HelpCircle,
  FileText,
  Users,
  Settings,
  MapPin,
  Globe,
  Building2
} from "lucide-react";
import ContactForm from "@/components/forms/contact-form";

const ticketSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  category: z.enum(["technical", "billing", "general", "feature"]),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Please provide a detailed description (minimum 20 characters)"),
  application: z.string().optional(),
});

type TicketFormData = z.infer<typeof ticketSchema>;

export default function Support() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      priority: "medium",
      category: "general",
      subject: "",
      description: "",
      application: "",
    },
  });

  const handleSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/support/ticket", data);
      toast({
        title: "Ticket Submitted Successfully",
        description: "We'll get back to you within 24 hours. You'll receive a confirmation email shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[hsl(210,45%,40%)] to-[hsl(210,45%,30%)] py-20 relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-yellow-400/15 rounded-full animate-float"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Sophisticated Support Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-white bg-opacity-15 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-white border-opacity-20">
              <div className="relative">
                {/* Central Support Hub */}
                <div className="w-8 h-8 bg-white bg-opacity-90 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-[hsl(210,45%,40%)] rounded-sm"></div>
                </div>
                {/* Connection Lines and Nodes */}
                <div className="absolute -top-3 -left-3 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute -top-3 -right-3 w-4 h-4 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[hsl(210,45%,40%)] rounded-full"></div>
                </div>
                <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-white bg-opacity-60 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>
                <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-yellow-400 bg-opacity-80 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                {/* Pulsing Connection Lines */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-1 left-1 w-6 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent animate-pulse"></div>
                  <div className="absolute bottom-1 right-1 w-6 h-0.5 bg-gradient-to-l from-white to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-white">Nebusis®</span> <span className="text-yellow-400">Contact</span>
          </h1>
          <p className="text-xl md:text-2xl text-white text-opacity-90 max-w-3xl mx-auto">
            Get in touch with our team for support, sales inquiries, or partnership opportunities
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="relative overflow-hidden border-l-4 border-yellow-400">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/5 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="text-center relative z-10">
                <div className="relative inline-block">
                  <MessageCircle className="h-12 w-12 text-[hsl(210,45%,40%)] mx-auto mb-4" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <CardTitle>Submit a <span className="text-yellow-600">Ticket</span></CardTitle>
                <CardDescription>Get detailed help with technical issues</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-4">Response time: <span className="font-semibold text-yellow-600">24 hours</span></p>
                <Button className="w-full bg-[hsl(210,45%,40%)] hover:bg-[hsl(210,45%,30%)]" onClick={() => document.getElementById('ticket-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Create Ticket
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-l-4 border-[hsl(210,45%,40%)]">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[hsl(210,45%,40%)]/5 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="text-center relative z-10">
                <div className="relative inline-block">
                  <Mail className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[hsl(210,45%,40%)] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <CardTitle>Email <span className="text-[hsl(210,45%,40%)]">Support</span></CardTitle>
                <CardDescription>Contact our support team directly</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-4">Response time: <span className="font-semibold text-[hsl(210,45%,40%)]">24-48 hours</span></p>
                <Button variant="outline" className="w-full border-[hsl(210,45%,40%)] text-[hsl(210,45%,40%)] hover:bg-[hsl(210,45%,40%)] hover:text-white" onClick={() => document.getElementById('ticket-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Contact Form
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-l-4 border-yellow-400">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/5 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="text-center relative z-10">
                <div className="relative inline-block">
                  <HelpCircle className="h-12 w-12 text-[hsl(210,45%,40%)] mx-auto mb-4" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <CardTitle>Help <span className="text-yellow-600">Center</span></CardTitle>
                <CardDescription>Browse common questions and guides</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-4">Available <span className="font-semibold text-yellow-600">24/7</span></p>
                <Button variant="outline" className="w-full border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white" onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>
                  Browse FAQs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact & Support Forms */}
          <div id="ticket-form">
            <Tabs defaultValue="contact" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="contact">General Contact</TabsTrigger>
                <TabsTrigger value="ticket">Support Ticket</TabsTrigger>
                <TabsTrigger value="office">Office Info</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>General Contact Form</CardTitle>
                    <CardDescription>
                      Send us a message for sales inquiries, partnership opportunities, or general questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="office">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-[hsl(210,45%,40%)]" />
                      Office Information
                    </CardTitle>
                    <CardDescription>
                      Our headquarters and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-[hsl(210,45%,40%)]" />
                            Headquarters
                          </h4>
                          <div className="text-gray-600 text-sm space-y-1 ml-6">
                            <div>12020 Sunrise Valley Dr #100</div>
                            <div>Reston, VA 20190</div>
                            <div>United States</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                            <Globe className="h-4 w-4 text-[hsl(210,45%,40%)]" />
                            Time Zone
                          </h4>
                          <div className="text-gray-600 text-sm ml-6">
                            EST (UTC-5) / EDT (UTC-4)
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-[hsl(210,45%,40%)]" />
                            Business Hours
                          </h4>
                          <div className="text-gray-600 text-sm ml-6">
                            <div>Monday - Friday: 9:00 AM - 6:00 PM EST</div>
                            <div>Saturday - Sunday: Closed</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                            <Mail className="h-4 w-4 text-[hsl(210,45%,40%)]" />
                            Response Times
                          </h4>
                          <div className="text-gray-600 text-sm ml-6">
                            <div>General inquiries: Within 24 hours</div>
                            <div>Support tickets: Within 24-48 hours</div>
                            <div>Emergency support: Same day</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-[hsl(210,45%,40%)]" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>
                      Quick answers to common questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">How do I get started with Nebusis® applications?</h4>
                        <p className="text-gray-600 text-sm">You can request a demo through our website or contact us directly. We'll schedule a personalized demonstration of our applications that match your business needs.</p>
                      </div>
                      <div className="border-l-4 border-[hsl(210,45%,40%)] pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">What support do you provide?</h4>
                        <p className="text-gray-600 text-sm">We offer comprehensive support including technical assistance, training, implementation guidance, and ongoing maintenance support for all our applications.</p>
                      </div>
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Can I integrate Nebusis® apps with my existing systems?</h4>
                        <p className="text-gray-600 text-sm">Yes, our applications are designed with integration in mind. We provide APIs and custom integration services to connect with your existing business systems.</p>
                      </div>
                      <div className="border-l-4 border-[hsl(210,45%,40%)] pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Do you offer training and certification programs?</h4>
                        <p className="text-gray-600 text-sm">Yes, we offer comprehensive training programs and ISO/IEC 17024 compliant certifications through Nebusis® Academy. Visit our Academy section for more details.</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-500 text-center">
                        Don't see your question? <Button variant="link" className="p-0 h-auto text-[hsl(210,45%,40%)]" onClick={() => document.querySelector('[data-state="active"][value="contact"]')?.click()}>Contact us directly</Button>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ticket">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Support Ticket</CardTitle>
                    <CardDescription>
                      Provide detailed information about your issue to help us assist you better
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            {...form.register("name")}
                            placeholder="Enter your full name"
                          />
                          {form.formState.errors.name && (
                            <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            {...form.register("email")}
                            placeholder="Enter your email"
                          />
                          {form.formState.errors.email && (
                            <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            {...form.register("company")}
                            placeholder="Enter your company name"
                          />
                          {form.formState.errors.company && (
                            <p className="text-sm text-red-600">{form.formState.errors.company.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            {...form.register("phone")}
                            placeholder="Optional phone number"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority *</Label>
                          <Select onValueChange={(value) => form.setValue("priority", value as any)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low - General inquiry</SelectItem>
                              <SelectItem value="medium">Medium - Minor issue</SelectItem>
                              <SelectItem value="high">High - Business impact</SelectItem>
                              <SelectItem value="urgent">Urgent - Critical issue</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select onValueChange={(value) => form.setValue("category", value as any)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="billing">Billing & Payments</SelectItem>
                              <SelectItem value="general">General Question</SelectItem>
                              <SelectItem value="feature">Feature Request</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="application">Nebusis® Application (Optional)</Label>
                        <Input
                          id="application"
                          {...form.register("application")}
                          placeholder="e.g., ComplianceOne, SmartBooks, Engage"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          {...form.register("subject")}
                          placeholder="Brief description of your issue"
                        />
                        {form.formState.errors.subject && (
                          <p className="text-sm text-red-600">{form.formState.errors.subject.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Detailed Description *</Label>
                        <Textarea
                          id="description"
                          {...form.register("description")}
                          placeholder="Please provide a detailed description of your issue, including steps to reproduce if applicable"
                          rows={6}
                        />
                        {form.formState.errors.description && (
                          <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
                        )}
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Ticket"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" id="faq">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-50/30 py-3 rounded-r-lg">
                        <h3 className="font-semibold mb-2 text-gray-800">How do I access my Nebusis® applications?</h3>
                        <p className="text-gray-600">After purchase, you'll receive login credentials via email. Use these to access your applications through our secure portal.</p>
                      </div>

                      <div className="border-l-4 border-[hsl(210,45%,40%)] pl-4 bg-blue-50/30 py-3 rounded-r-lg">
                        <h3 className="font-semibold mb-2 text-gray-800">What are your support hours?</h3>
                        <p className="text-gray-600">We provide 24/7 ticket support with response times of 24 hours for standard issues and 4 hours for urgent matters.</p>
                      </div>

                      <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-50/30 py-3 rounded-r-lg">
                        <h3 className="font-semibold mb-2 text-gray-800">Can I request new features?</h3>
                        <p className="text-gray-600">Yes! We welcome feature requests. Submit a ticket with category "Feature Request" and we'll evaluate it for future releases.</p>
                      </div>

                      <div className="border-l-4 border-[hsl(210,45%,40%)] pl-4 bg-blue-50/30 py-3 rounded-r-lg">
                        <h3 className="font-semibold mb-2 text-gray-800">How do I get training on the applications?</h3>
                        <p className="text-gray-600">Check our Training and Certification section for comprehensive courses on all Nebusis® applications.</p>
                      </div>

                      <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-50/30 py-3 rounded-r-lg">
                        <h3 className="font-semibold mb-2 text-gray-800">What if I need help with implementation?</h3>
                        <p className="text-gray-600">Our Professional Services team can assist with implementation, customization, and integration. Contact us for a consultation.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}