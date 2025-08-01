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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, Users, Globe, FileText, Plus, Minus, 
  CheckCircle, AlertCircle, Send, X 
} from "lucide-react";
import { NEBUSIS_APPLICATIONS } from "@/lib/constants";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const enterpriseQuoteSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  annualRevenue: z.string().min(1, "Annual revenue range is required"),
  
  // Contact Information
  primaryContactName: z.string().min(2, "Primary contact name is required"),
  primaryContactEmail: z.string().email("Valid email is required"),
  primaryContactTitle: z.string().min(2, "Job title is required"),
  primaryContactPhone: z.string().optional(),
  
  // Technical Information
  currentSystems: z.string().min(10, "Please describe your current systems"),
  technicalRequirements: z.string().min(10, "Please describe your technical requirements"),
  integrationNeeds: z.string().min(10, "Please describe your integration needs"),
  dataVolume: z.string().min(1, "Data volume estimate is required"),
  
  // Project Scope
  selectedApplications: z.array(z.string()).min(1, "Select at least one application"),
  numberOfSites: z.number().min(1, "Number of sites is required"),
  totalUsers: z.number().min(1, "Total users is required"),
  
  // Compliance & Standards (for ComplianceOne)
  complianceStandards: z.array(z.string()).optional(),
  regulatoryRequirements: z.string().optional(),
  
  // Implementation Details
  desiredImplementationTimeline: z.string().min(1, "Implementation timeline is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  trainingRequirements: z.string().min(10, "Please describe your training requirements"),
  
  // Support & Maintenance
  supportRequirements: z.string().min(10, "Please describe your support requirements"),
  maintenanceExpectations: z.string().min(10, "Please describe your maintenance expectations"),
  
  // Additional Information
  additionalRequirements: z.string().optional(),
  competitiveContext: z.string().optional(),
  
  // Consent
  marketingConsent: z.boolean().optional(),
});

type EnterpriseQuoteFormData = z.infer<typeof enterpriseQuoteSchema>;

interface EnterpriseQuoteFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
  preselectedApp?: string;
  preselectedApplications?: string[];
}

export default function EnterpriseQuoteForm({ onClose, onSuccess, preselectedApp, preselectedApplications }: EnterpriseQuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  
  const form = useForm<EnterpriseQuoteFormData>({
    resolver: zodResolver(enterpriseQuoteSchema),
    defaultValues: {
      selectedApplications: preselectedApplications || (preselectedApp ? [preselectedApp] : []),
      complianceStandards: [],
      numberOfSites: 1,
      totalUsers: 10,
    },
  });

  const totalSteps = 6;

  const industryOptions = [
    "Healthcare", "Financial Services", "Manufacturing", "Technology", "Retail",
    "Education", "Government", "Energy", "Transportation", "Telecommunications",
    "Media & Entertainment", "Real Estate", "Consulting", "Non-Profit", "Other"
  ];

  const companySizeOptions = [
    "1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees",
    "501-1000 employees", "1001-5000 employees", "5000+ employees"
  ];

  const revenueOptions = [
    "Less than $1M", "$1M - $10M", "$10M - $50M", "$50M - $100M",
    "$100M - $500M", "$500M - $1B", "Over $1B", "Prefer not to disclose"
  ];

  const dataVolumeOptions = [
    "Less than 1GB", "1GB - 10GB", "10GB - 100GB", "100GB - 1TB",
    "1TB - 10TB", "10TB - 100TB", "100TB+", "Unknown"
  ];

  const budgetRangeOptions = [
    "Under $50K", "$50K - $100K", "$100K - $250K", "$250K - $500K",
    "$500K - $1M", "$1M - $5M", "Over $5M", "Need consultation"
  ];

  const timelineOptions = [
    "ASAP (1-3 months)", "3-6 months", "6-12 months", "1-2 years", "2+ years", "Flexible"
  ];

  const complianceStandards = [
    "ISO 9001", "ISO 14001", "ISO 27001", "ISO 45001", "SOX", "GDPR",
    "HIPAA", "PCI DSS", "SOC 2", "NIST", "FDA CFR 21 Part 11", "Other"
  ];

  const onSubmit = async (data: EnterpriseQuoteFormData) => {
    setSubmissionStatus('submitting');
    
    try {
      const response = await apiRequest("POST", "/api/enterprise-quotes", data);
      
      if (response.ok) {
        setSubmissionStatus('success');
        toast({
          title: "Enterprise Quote Submitted",
          description: "We'll review your requirements and contact you within 24 hours.",
        });
        
        // Reset form after successful submission
        setTimeout(() => {
          form.reset();
          setCurrentStep(1);
          setSubmissionStatus('idle');
          onSuccess?.();
          onClose?.();
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmissionStatus('error');
      toast({
        title: "Submission Failed",
        description: "Please try again or contact our sales team directly.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Company Information";
      case 2: return "Contact Details";
      case 3: return "Technical Requirements";
      case 4: return "Project Scope";
      case 5: return "Implementation & Budget";
      case 6: return "Review & Submit";
      default: return "Enterprise Quote";
    }
  };

  if (submissionStatus === 'success') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-12 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quote Request Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in Nebusis® Enterprise solutions. Our team will review your requirements and contact you within 24 hours.
          </p>
          <Button onClick={onClose}>Close</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[hsl(221,83%,53%)] rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Enterprise Quote Request</CardTitle>
                <p className="text-sm text-gray-600">
                  Step {currentStep} of {totalSteps}: {getStepTitle(currentStep)}
                </p>
              </div>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-[hsl(221,83%,53%)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </CardHeader>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Company Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {industryOptions.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
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
                            {companySizeOptions.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="annualRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Revenue *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select annual revenue range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {revenueOptions.map((revenue) => (
                            <SelectItem key={revenue} value={revenue}>
                              {revenue}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 2: Contact Details */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Primary Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="primaryContactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primaryContactTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="primaryContactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="primaryContactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 2: Project Scope */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Scope</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="selectedApplications"
                  render={() => (
                    <FormItem>
                      <FormLabel>Selected Applications *</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {NEBUSIS_APPLICATIONS.map((app) => (
                          <FormField
                            key={app.name}
                            control={form.control}
                            name="selectedApplications"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={app.name}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(app.name)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, app.name])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== app.name
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {app.name}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="numberOfSites"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Sites/Locations *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter number of sites"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalUsers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Users *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter total number of users"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dataVolume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Data Volume *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expected data volume" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low (&lt; 1GB)</SelectItem>
                          <SelectItem value="medium">Medium (1-100GB)</SelectItem>
                          <SelectItem value="high">High (100GB - 1TB)</SelectItem>
                          <SelectItem value="enterprise">Enterprise (&gt; 1TB)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 3: Technical Requirements */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Technical Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentSystems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Systems in Use *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your current systems, software, and technology stack..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="technicalRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specific Technical Requirements *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Detail your technical requirements, performance needs, security requirements..."
                          rows={4}
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
                      <FormLabel>Integration Requirements *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what systems need to integrate with our solutions..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 4: Compliance & Standards (if applicable) */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Compliance & Standards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="complianceStandards"
                  render={() => (
                    <FormItem>
                      <FormLabel>Required Compliance Standards (Optional)</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {complianceStandards.map((standard: string) => (
                          <FormField
                            key={standard}
                            control={form.control}
                            name="complianceStandards"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={standard}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(standard)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), standard])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== standard
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {standard}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="regulatoryRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regulatory Requirements (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any specific regulatory requirements or industry standards..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 5: Implementation Details */}
          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>Implementation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="timelineRequirement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Implementation Timeline *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (&lt; 30 days)</SelectItem>
                            <SelectItem value="short">Short-term (1-3 months)</SelectItem>
                            <SelectItem value="medium">Medium-term (3-6 months)</SelectItem>
                            <SelectItem value="long">Long-term (6+ months)</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budgetRange"
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
                            <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                            <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                            <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m+">$1M+</SelectItem>
                            <SelectItem value="discuss">Prefer to discuss</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="supportRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support & Training Requirements *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select support level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standard">Standard Support</SelectItem>
                          <SelectItem value="premium">Premium Support (24/7)</SelectItem>
                          <SelectItem value="dedicated">Dedicated Support Team</SelectItem>
                          <SelectItem value="managed">Fully Managed Service</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Requirements (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional requirements, special considerations, or questions..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 6: Review & Submit */}
          {currentStep === 6 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Request</CardTitle>
                <p className="text-sm text-gray-600">
                  Please review your information before submitting.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Info Summary */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Company Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Company:</span> {form.watch('companyName')}</p>
                    <p><span className="font-medium">Industry:</span> {form.watch('industry')}</p>
                    <p><span className="font-medium">Size:</span> {form.watch('companySize')}</p>
                    <p><span className="font-medium">Revenue:</span> {form.watch('annualRevenue')}</p>
                  </div>
                </div>

                {/* Contact Info Summary */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Primary Contact</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Name:</span> {form.watch('primaryContactName')}</p>
                    <p><span className="font-medium">Title:</span> {form.watch('primaryContactTitle')}</p>
                    <p><span className="font-medium">Email:</span> {form.watch('primaryContactEmail')}</p>
                    {form.watch('primaryContactPhone') && (
                      <p><span className="font-medium">Phone:</span> {form.watch('primaryContactPhone')}</p>
                    )}
                  </div>
                </div>

                {/* Project Scope Summary */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Project Scope</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Applications:</span> {form.watch('selectedApplications')?.join(', ')}</p>
                    <p><span className="font-medium">Sites:</span> {form.watch('numberOfSites')}</p>
                    <p><span className="font-medium">Users:</span> {form.watch('totalUsers')}</p>
                    <p><span className="font-medium">Data Volume:</span> {form.watch('dataVolume')}</p>
                  </div>
                </div>

                {/* Implementation Summary */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Implementation Details</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Timeline:</span> {form.watch('timelineRequirement')}</p>
                    <p><span className="font-medium">Budget:</span> {form.watch('budgetRange')}</p>
                    <p><span className="font-medium">Support:</span> {form.watch('supportRequirements')}</p>
                  </div>
                </div>

                {/* Consent */}
                <div className="border-t pt-4">
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
                          <p className="text-xs text-gray-600">
                            You can unsubscribe at any time. We respect your privacy.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={submissionStatus === 'submitting'}
                    className="bg-[hsl(221,83%,53%)] text-white hover:bg-[hsl(221,83%,45%)]"
                  >
                    {submissionStatus === 'submitting' ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Quote Request
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}