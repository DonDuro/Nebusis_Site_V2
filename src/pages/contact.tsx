import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  MessageSquare, Headphones, Users, FileText, 
  Play, Clock, Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ContactType = "general" | "technical" | "partnership" | "demo";

const contactFormSchema = z.object({
  contactType: z.enum(["general", "technical", "partnership", "demo"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  applications: z.array(z.string()).optional(),
  message: z.string().min(10, "Please provide more details (minimum 10 characters)"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [selectedContactType, setSelectedContactType] = useState<ContactType | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactType: "general",
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      jobTitle: "",
      phone: "",
      industry: "",
      companySize: "",
      budget: "",
      timeline: "",
      applications: [],
      message: "",
    }
  });

  const contactTypes = [
    {
      id: "general" as ContactType,
      icon: MessageSquare,
      title: "General Inquiry",
      description: "",
    },
    {
      id: "technical" as ContactType,
      icon: Headphones,
      title: "Technical Support",
      description: "",
    },
    {
      id: "partnership" as ContactType,
      icon: Users,
      title: "Business Partnership",
      description: "",
    },
    {
      id: "demo" as ContactType,
      icon: Play,
      title: "Request a Demo",
      description: "",
    }
  ];

  const applications = [
    "Nebusis® ComplianceOne", "Nebusis® Engage", "Nebusis® SmartBooks", 
    "Nebusis® PowerDocs", "Nebusis® LegalFlow", "Nebusis® PerformanceTracker",
    "Nebusis® ZappFormZ", "Nebusis® WizSpeek", "Nebusis® PeopleCore",
    "Nebusis® CyberWatch", "Nebusis® ESG GreenCore", "Nebusis® e-Learning Wizard"
  ];

  const handleContactTypeSelect = (type: ContactType) => {
    if (type === "demo") {
      // Redirect to demos page for demo requests
      setLocation("/demos");
      return;
    }
    setSelectedContactType(type);
    form.setValue("contactType", type);
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log("Contact form data:", data);
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      form.reset();
      setSelectedContactType(null);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const renderDynamicFields = () => {
    if (!selectedContactType) return null;

    const commonBusinessFields = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Your job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );

    switch (selectedContactType) {

      case "demo":
        return (
          <>
            {commonBusinessFields}
            <FormField
              control={form.control}
              name="applications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Applications of Interest</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange([value])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select application for demo" />
                      </SelectTrigger>
                      <SelectContent>
                        {applications.map((app) => (
                          <SelectItem key={app} value={app}>
                            {app}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case "partnership":
        return (
          <>
            {commonBusinessFields}
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="system-integrator">System Integrator</SelectItem>
                      <SelectItem value="reseller">Reseller</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case "technical":
        return (
          <>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange([value])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Which application needs support?" />
                      </SelectTrigger>
                      <SelectContent>
                        {applications.map((app) => (
                          <SelectItem key={app} value={app}>
                            {app}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      default:
        return (
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nebusis-bg via-nebusis-light to-gray-50">
      {/* Hero Section */}
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
              <MessageSquare className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">Customer Support</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Nebusis® <span className="text-yellow-300">Contact</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4 max-w-4xl leading-relaxed">
              <span className="text-yellow-300 font-semibold">Get in touch with our team</span>
            </p>
            <p className="text-blue-100 text-lg mb-12 max-w-4xl">
              Support, sales inquiries, or partnership opportunities - we're here to help you succeed
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <MessageSquare className="h-10 w-10 mx-auto mb-4 text-yellow-300" />
                <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                <p className="text-sm opacity-90">Round-the-clock assistance for all your needs</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <Clock className="h-10 w-10 mx-auto mb-4 text-yellow-300" />
                <h3 className="font-bold text-lg mb-2">Quick Response</h3>
                <p className="text-sm opacity-90">Less than 24 hour response time guaranteed</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <Globe className="h-10 w-10 mx-auto mb-4 text-yellow-300" />
                <h3 className="font-bold text-lg mb-2">Global Coverage</h3>
                <p className="text-sm opacity-90">International support across all time zones</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Get in Touch Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 text-lg mb-16">
            Choose the contact method that works best for you
          </p>

          {/* Contact Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {contactTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all hover:shadow-lg bg-white border-0 p-8 ${
                    selectedContactType === type.id
                      ? "ring-2 ring-nebusis-primary shadow-lg"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => handleContactTypeSelect(type.id)}
                >
                  <CardContent className="p-0 text-center">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6 ${
                      selectedContactType === type.id
                        ? "bg-nebusis-primary text-white"
                        : "bg-nebusis-primary text-white"
                    }`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{type.title}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Contact Form */}
        {selectedContactType && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">
                {contactTypes.find(t => t.id === selectedContactType)?.title}
              </CardTitle>
              <CardDescription>
                Please fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {renderDynamicFields()}

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={
                              selectedContactType === "demo"
                                ? "Please describe what you'd like to see in the demo..."
                                : selectedContactType === "technical"
                                ? "Please describe the technical issue you're experiencing..."
                                : selectedContactType === "partnership"
                                ? "Please describe your partnership interest and goals..."
                                : "Please describe your inquiry..."
                            }
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-nebusis-primary hover:bg-nebusis-dark text-white"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}