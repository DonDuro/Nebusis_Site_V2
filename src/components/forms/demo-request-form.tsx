import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Application } from "@/lib/types";

const demoRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Job title is required"),
  companySize: z.string().min(1, "Please select company size"),
  industry: z.string().min(1, "Please select your industry"),
  businessType: z.string().min(1, "Please select business type"),
  decisionMakingRole: z.string().min(1, "Please specify your role in decision making"),
  currentSolution: z.string().min(10, "Please describe your current solution (minimum 10 characters)"),
  budget: z.string().min(1, "Budget information is required"),
  timeline: z.string().min(1, "Implementation timeline is required"),
  businessChallenge: z.string().min(20, "Please describe your business challenge (minimum 20 characters)"),
  companyWebsite: z.string().url("Please enter a valid company website URL"),
  linkedinProfile: z.string().optional(),
  phone: z.string().min(10, "Phone number is required for verification"),
  applicationId: z.number().optional(),
  additionalInfo: z.string().optional(),
  requestedDate: z.date().optional()
});

type DemoRequestFormData = z.infer<typeof demoRequestSchema>;

export default function DemoRequestForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      jobTitle: "",
      companySize: "",
      industry: "",
      businessType: "",
      decisionMakingRole: "",
      currentSolution: "",
      budget: "",
      timeline: "",
      businessChallenge: "",
      companyWebsite: "",
      linkedinProfile: "",
      phone: "",
      additionalInfo: ""
    }
  });

  const { data: applications = [] } = useQuery<Application[]>({
    queryKey: ["/api/applications"]
  });

  const mutation = useMutation({
    mutationFn: async (data: DemoRequestFormData) => {
      const response = await apiRequest("POST", "/api/demo-requests", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted",
        description: "We'll contact you within 24 hours to provide your customized demo content.",
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: DemoRequestFormData) => {
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">✓</span>
            </div>
          </div>
          <CardTitle className="text-green-800">Request Submitted!</CardTitle>
          <CardDescription>
            Thank you for your interest in Nebusis®. Our team will contact you within 24 hours to provide your customized demo content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            variant="outline" 
            className="w-full"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Request a Qualified Demo</CardTitle>
        <CardDescription>
          Complete our qualification form to receive a comprehensive demonstration tailored to your specific business needs and requirements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-800">
            <strong>Qualification Required:</strong> To ensure we provide the most relevant demo experience, please complete all required fields. This helps us prepare a customized presentation for your specific needs.
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
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
                      <FormLabel>Job Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CTO, Operations Manager, CEO" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Company Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Website *</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.yourcompany.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="501-1000">501-1,000 employees</SelectItem>
                          <SelectItem value="1001+">1,000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="financial">Financial Services</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="government">Government/Public Sector</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="retail">Retail/E-commerce</SelectItem>
                          <SelectItem value="professional">Professional Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="nonprofit">Non-profit Organization</SelectItem>
                        <SelectItem value="government">Government Agency</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Decision Making & Budget */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Project Details</h3>
              
              <FormField
                control={form.control}
                name="decisionMakingRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Role in Technology Decisions *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your decision-making role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="final-decision">Final decision maker</SelectItem>
                        <SelectItem value="key-influencer">Key influencer in decision process</SelectItem>
                        <SelectItem value="evaluator">Technical evaluator</SelectItem>
                        <SelectItem value="recommender">Make recommendations to decision makers</SelectItem>
                        <SelectItem value="implementer">Implementation team member</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Budget Range *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="under-10k">Under $10,000</SelectItem>
                          <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                          <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                          <SelectItem value="500k+">$500,000+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Implementation Timeline *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (within 30 days)</SelectItem>
                          <SelectItem value="1-3-months">1-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="6-12-months">6-12 months</SelectItem>
                          <SelectItem value="12-months+">12+ months</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Detailed Qualification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Business Requirements</h3>
              
              <FormField
                control={form.control}
                name="currentSolution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Solution/System *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your current systems, processes, or solutions you're looking to improve or replace..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessChallenge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Business Challenge *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What specific business challenges are you trying to solve? What outcomes are you hoping to achieve?"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nebusis® Application of Primary Interest</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an application" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {applications.map((app) => (
                          <SelectItem key={app.id} value={app.id.toString()}>
                            {app.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.linkedin.com/in/yourprofile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional information that would help us prepare a relevant demo for you..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-nebusis-bg border border-nebusis-border rounded-lg p-4">
              <p className="text-sm text-nebusis-primary">
                <strong>Note:</strong> All information provided will be kept confidential and used solely to provide you with a customized demo experience. Our team will contact you within 24 hours to deliver your tailored demonstration content.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-nebusis-primary text-white hover:bg-nebusis-primary/90"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting Request..." : "Request Qualified Demo"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
