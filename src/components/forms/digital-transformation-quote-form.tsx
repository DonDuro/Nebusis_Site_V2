import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { FileText, DollarSign, Calendar, Users, Building, CheckCircle } from "lucide-react";

const digitalTransformationQuoteSchema = z.object({
  // Basic Contact Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  
  // Company Information
  companySize: z.enum(["1-10", "11-50", "51-200", "201-1000", "1000+"]),
  industry: z.string().min(2, "Industry is required"),
  annualRevenue: z.enum(["<$1M", "$1M-$10M", "$10M-$50M", "$50M-$100M", "$100M+"]),
  
  // Project Details
  serviceType: z.enum(["digital-transformation", "special-projects", "pmo", "blockchain", "iot", "ai-services", "web-app-development"]),
  projectScope: z.enum(["small", "medium", "large", "enterprise"]),
  projectTimeline: z.enum(["1-3 months", "3-6 months", "6-12 months", "12+ months"]),
  budget: z.enum(["<$50K", "$50K-$100K", "$100K-$250K", "$250K-$500K", "$500K-$1M", "$1M+"]),
  
  // Technical Requirements
  currentSystems: z.string().min(10, "Please describe your current systems"),
  technicalChallenges: z.string().min(10, "Please describe your technical challenges"),
  desiredOutcomes: z.string().min(10, "Please describe your desired outcomes"),
  
  // Transformation Specifics
  transformationAreas: z.array(z.string()).min(1, "Please select at least one transformation area"),
  complianceRequirements: z.string().optional(),
  integrationNeeds: z.string().optional(),
  
  // Decision Making
  decisionMaker: z.enum(["yes", "no", "partial"]),
  decisionTimeframe: z.enum(["immediate", "1-2 weeks", "1 month", "2-3 months", "3+ months"]),
  
  // Additional Information
  previousExperience: z.string().optional(),
  specificRequirements: z.string().optional(),
  
  // Project Urgency
  urgency: z.enum(["low", "medium", "high", "critical"]),
  
  // Consent
  marketingConsent: z.boolean().default(false)
});

type DigitalTransformationQuoteFormData = z.infer<typeof digitalTransformationQuoteSchema>;

interface DigitalTransformationQuoteFormProps {
  serviceType: string;
  serviceName: string;
  onSuccess?: () => void;
}

export default function DigitalTransformationQuoteForm({ 
  serviceType, 
  serviceName, 
  onSuccess 
}: DigitalTransformationQuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<DigitalTransformationQuoteFormData>({
    resolver: zodResolver(digitalTransformationQuoteSchema),
    defaultValues: {
      serviceType: serviceType as any,
      transformationAreas: [],
      marketingConsent: false,
    },
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: DigitalTransformationQuoteFormData) => {
      return apiRequest("POST", "/api/digital-transformation-quotes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/digital-transformation-quotes'] });
      toast({
        title: "Quote Request Submitted",
        description: "We'll analyze your requirements and get back to you within 24 hours with a detailed proposal.",
      });
      form.reset();
      setCurrentStep(1);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: DigitalTransformationQuoteFormData) => {
    setIsSubmitting(true);
    try {
      await submitQuoteMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const transformationAreas = [
    "Legacy System Modernization",
    "Cloud Migration",
    "Data & Analytics",
    "Process Automation",
    "AI/ML Implementation",
    "IoT Integration",
    "Blockchain Solutions",
    "Custom Application Development",
    "Security & Compliance",
    "Change Management"
  ];

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Building className="h-5 w-5" />;
      case 2: return <FileText className="h-5 w-5" />;
      case 3: return <DollarSign className="h-5 w-5" />;
      case 4: return <CheckCircle className="h-5 w-5" />;
      default: return null;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="h-12 w-12 text-[hsl(221,83%,53%)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">Company Information</h3>
              <p className="text-gray-600">Tell us about your organization</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
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
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
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
                      <Input placeholder="Chief Technology Officer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corporation" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Input placeholder="Healthcare, Finance, Manufacturing..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-1000">201-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="annualRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Revenue *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select revenue range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="<$1M">Less than $1M</SelectItem>
                        <SelectItem value="$1M-$10M">$1M - $10M</SelectItem>
                        <SelectItem value="$10M-$50M">$10M - $50M</SelectItem>
                        <SelectItem value="$50M-$100M">$50M - $100M</SelectItem>
                        <SelectItem value="$100M+">$100M+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FileText className="h-12 w-12 text-[hsl(221,83%,53%)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">Project Requirements</h3>
              <p className="text-gray-600">Help us understand your transformation needs</p>
            </div>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="currentSystems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Systems & Technologies *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your current technology stack, systems, and infrastructure..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="technicalChallenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technical Challenges *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What are your main technical pain points and challenges?"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="desiredOutcomes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Outcomes *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What do you want to achieve with this transformation?"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="transformationAreas"
                render={() => (
                  <FormItem>
                    <FormLabel>Transformation Areas *</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {transformationAreas.map((area) => (
                        <FormField
                          key={area}
                          control={form.control}
                          name="transformationAreas"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(area)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, area])
                                      : field.onChange(field.value?.filter((value) => value !== area));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {area}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="complianceRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compliance Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific compliance requirements (ISO, HIPAA, SOX, etc.)?"
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="integrationNeeds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Integration Needs</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What systems need to be integrated or connected?"
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="h-12 w-12 text-[hsl(221,83%,53%)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">Project Scope & Budget</h3>
              <p className="text-gray-600">Help us understand your project parameters</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="projectScope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Scope *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="small" id="small" />
                          <Label htmlFor="small">Small - Single department/function</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium">Medium - Multiple departments</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="large" id="large" />
                          <Label htmlFor="large">Large - Organization-wide</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="enterprise" id="enterprise" />
                          <Label htmlFor="enterprise">Enterprise - Multi-location/subsidiary</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="projectTimeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Timeline *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-3 months">1-3 months</SelectItem>
                        <SelectItem value="3-6 months">3-6 months</SelectItem>
                        <SelectItem value="6-12 months">6-12 months</SelectItem>
                        <SelectItem value="12+ months">12+ months</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="<$50K">Less than $50K</SelectItem>
                        <SelectItem value="$50K-$100K">$50K - $100K</SelectItem>
                        <SelectItem value="$100K-$250K">$100K - $250K</SelectItem>
                        <SelectItem value="$250K-$500K">$250K - $500K</SelectItem>
                        <SelectItem value="$500K-$1M">$500K - $1M</SelectItem>
                        <SelectItem value="$1M+">$1M+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Urgency *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low - Planning phase</SelectItem>
                        <SelectItem value="medium">Medium - Near-term need</SelectItem>
                        <SelectItem value="high">High - Business critical</SelectItem>
                        <SelectItem value="critical">Critical - Immediate need</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="decisionMaker"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Decision Making Authority *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" />
                          <Label htmlFor="yes">Yes, I make the final decision</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="partial" id="partial" />
                          <Label htmlFor="partial">I'm part of the decision-making team</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" />
                          <Label htmlFor="no">No, I need to present to decision makers</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="decisionTimeframe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Decision Timeframe *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select decision timeframe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                        <SelectItem value="1 month">1 month</SelectItem>
                        <SelectItem value="2-3 months">2-3 months</SelectItem>
                        <SelectItem value="3+ months">3+ months</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="h-12 w-12 text-[hsl(221,83%,53%)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">Additional Information</h3>
              <p className="text-gray-600">Final details to complete your quote request</p>
            </div>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="previousExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous Digital Transformation Experience</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about any previous digital transformation projects or initiatives..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="specificRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Requirements or Constraints</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific technical requirements, constraints, or preferences?"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="marketingConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to receive marketing communications from Nebusis®
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          <span className="text-2xl font-bold text-gray-900">
            {serviceName} Quote Request
          </span>
        </CardTitle>
        
        {/* Progress Steps */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${currentStep === step 
                    ? 'bg-[hsl(221,83%,53%)] border-[hsl(221,83%,53%)] text-white' 
                    : currentStep > step 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }
                `}>
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    getStepIcon(step)
                  )}
                </div>
                {step < 4 && (
                  <div className={`
                    w-12 h-0.5 mx-2 
                    ${currentStep > step ? 'bg-green-500' : 'bg-gray-300'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderStep()}
            
            <div className="flex justify-between pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)]"
                >
                  {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}