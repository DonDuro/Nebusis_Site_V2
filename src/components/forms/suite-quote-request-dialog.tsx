import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShoppingCart, DollarSign, Users, Building } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const quoteRequestSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  companySize: z.string().min(1, 'Please select company size'),
  industry: z.string().min(1, 'Please select your industry'),
  userCount: z.string().min(1, 'Please specify user count'),
  contractLength: z.string().min(1, 'Please select contract length'),
  deploymentType: z.string().min(1, 'Please select deployment type'),
  primaryGoals: z.string().min(10, 'Please describe your primary business goals'),
  currentChallenges: z.string().min(10, 'Please describe your current challenges'),
  currentSolutions: z.string().optional(),
  complianceRequirements: z.string().optional(),
  integrationNeeds: z.string().optional(),
  specificRequirements: z.string().optional(),
  successMetrics: z.string().optional(),
  decisionMakers: z.string().optional(),
  budget: z.string().optional(),
  timeframe: z.string().min(1, 'Please select implementation timeframe'),
  additionalServices: z.array(z.string()).optional(),
});

type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;

interface SuiteQuoteRequestDialogProps {
  suiteName: string;
  children: React.ReactNode;
  initialData?: {
    tier?: string;
    userCount?: number;
    contractLength?: number;
    estimatedCost?: number;
  };
}

export default function SuiteQuoteRequestDialog({ 
  suiteName, 
  children, 
  initialData 
}: SuiteQuoteRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<QuoteRequestFormData>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      jobTitle: '',
      phone: '',
      companySize: '',
      industry: '',
      userCount: initialData?.userCount?.toString() || '',
      contractLength: initialData?.contractLength?.toString() || '',
      deploymentType: '',
      primaryGoals: '',
      currentChallenges: '',
      currentSolutions: '',
      complianceRequirements: '',
      integrationNeeds: '',
      specificRequirements: '',
      successMetrics: '',
      decisionMakers: '',
      budget: '',
      timeframe: '',
      additionalServices: [],
    },
  });

  const submitQuoteRequest = useMutation({
    mutationFn: async (data: QuoteRequestFormData) => {
      const response = await apiRequest('POST', '/api/enterprise-quotes', {
        ...data,
        productType: 'sector-suite',
        productName: suiteName,
        initialQuoteData: initialData,
        additionalServices: selectedServices,
        source: 'suite-detail-page',
        requestDate: new Date().toISOString(),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll prepare a detailed quote and contact you within 24 hours with pricing and next steps.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/enterprise-quotes'] });
      form.reset();
      setSelectedServices([]);
      setOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuoteRequestFormData) => {
    submitQuoteRequest.mutate({
      ...data,
      additionalServices: selectedServices,
    });
  };

  const additionalServicesOptions = [
    'Data Migration Services',
    'Custom Integration Development',
    'On-site Training & Support',
    'Dedicated Account Manager',
    'Priority Technical Support',
    'Custom Workflow Development',
    'White-label Customization',
    'Advanced Security Configuration',
    'Compliance Consulting',
    'Change Management Support',
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices(prev => [...prev, service]);
    } else {
      setSelectedServices(prev => prev.filter(s => s !== service));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-nebusis-primary" />
            Request Quote: {suiteName}
          </DialogTitle>
          <DialogDescription>
            Get a detailed, customized quote for your organization. Our team will prepare comprehensive 
            pricing based on your specific requirements and provide implementation guidance.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Initial Quote Summary */}
          {initialData && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Quote Configuration</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Plan: </span>
                  <span className="font-medium capitalize">{initialData.tier}</span>
                </div>
                <div>
                  <span className="text-blue-700">Users: </span>
                  <span className="font-medium">{initialData.userCount}</span>
                </div>
                <div>
                  <span className="text-blue-700">Contract: </span>
                  <span className="font-medium">{initialData.contractLength} year(s)</span>
                </div>
                {initialData.estimatedCost && (
                  <div>
                    <span className="text-blue-700">Est. Cost: </span>
                    <span className="font-medium">${initialData.estimatedCost.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input 
                  {...form.register('firstName')}
                  placeholder="Enter first name"
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input 
                  {...form.register('lastName')}
                  placeholder="Enter last name"
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                {...form.register('email')}
                type="email"
                placeholder="Enter email address"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input 
                {...form.register('phone')}
                placeholder="Enter phone number"
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Company Information
            </h4>
            <div>
              <Label htmlFor="company">Company Name *</Label>
              <Input 
                {...form.register('company')}
                placeholder="Enter company name"
              />
              {form.formState.errors.company && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.company.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input 
                {...form.register('jobTitle')}
                placeholder="Enter job title"
              />
              {form.formState.errors.jobTitle && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.jobTitle.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companySize">Company Size *</Label>
                <Select onValueChange={(value) => form.setValue('companySize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.companySize && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.companySize.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select onValueChange={(value) => form.setValue('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare & Life Sciences</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="financial">Financial Services</SelectItem>
                    <SelectItem value="technology">Technology & Software</SelectItem>
                    <SelectItem value="education">Education & Training</SelectItem>
                    <SelectItem value="government">Government & Public Sector</SelectItem>
                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="professional">Professional Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.industry && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.industry.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Project Specifications */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Project Specifications
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="userCount">Expected User Count *</Label>
                <Select 
                  value={form.watch('userCount')} 
                  onValueChange={(value) => form.setValue('userCount', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">1-10 users</SelectItem>
                    <SelectItem value="25">11-25 users</SelectItem>
                    <SelectItem value="50">26-50 users</SelectItem>
                    <SelectItem value="100">51-100 users</SelectItem>
                    <SelectItem value="200">101-200 users</SelectItem>
                    <SelectItem value="500">201-500 users</SelectItem>
                    <SelectItem value="1000">500+ users</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.userCount && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.userCount.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contractLength">Contract Length *</Label>
                <Select 
                  value={form.watch('contractLength')} 
                  onValueChange={(value) => form.setValue('contractLength', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="2">2 years</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="5">5 years</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.contractLength && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.contractLength.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="deploymentType">Deployment Type *</Label>
                <Select onValueChange={(value) => form.setValue('deploymentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select deployment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cloud">Cloud (SaaS)</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="on-premise">On-premise</SelectItem>
                    <SelectItem value="private-cloud">Private Cloud</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.deploymentType && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.deploymentType.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeframe">Implementation Timeframe *</Label>
                <Select onValueChange={(value) => form.setValue('timeframe', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                    <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                    <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                    <SelectItem value="long">Long-term (12+ months)</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.timeframe && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.timeframe.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="budget">Estimated Budget Range (Optional)</Label>
                <Select onValueChange={(value) => form.setValue('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-25k">Under $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                    <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                    <SelectItem value="over-500k">Over $500,000</SelectItem>
                    <SelectItem value="flexible">Flexible based on value</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Additional Services</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {additionalServicesOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                  />
                  <Label 
                    htmlFor={service} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Business Requirements & Goals */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Business Requirements & Goals</h4>
            
            <div>
              <Label htmlFor="primaryGoals">Primary Business Goals *</Label>
              <Textarea 
                {...form.register('primaryGoals')}
                placeholder="What are your main objectives with this solution? (e.g., improve compliance, reduce costs, streamline operations, enhance security...)"
                className="h-20"
              />
              {form.formState.errors.primaryGoals && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.primaryGoals.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="currentChallenges">Current Business Challenges *</Label>
              <Textarea 
                {...form.register('currentChallenges')}
                placeholder="Describe your current pain points and what you hope this solution will solve..."
                className="h-20"
              />
              {form.formState.errors.currentChallenges && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.currentChallenges.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="currentSolutions">Current Solutions in Use (Optional)</Label>
              <Textarea 
                {...form.register('currentSolutions')}
                placeholder="What software, systems, or processes are you currently using for similar functions?"
                className="h-16"
              />
            </div>

            <div>
              <Label htmlFor="complianceRequirements">Compliance & Regulatory Requirements (Optional)</Label>
              <Textarea 
                {...form.register('complianceRequirements')}
                placeholder="Any specific compliance standards, regulations, or certifications your organization needs to meet..."
                className="h-16"
              />
            </div>

            <div>
              <Label htmlFor="integrationNeeds">Integration Requirements (Optional)</Label>
              <Textarea 
                {...form.register('integrationNeeds')}
                placeholder="Systems or applications that need to integrate with this solution..."
                className="h-16"
              />
            </div>

            <div>
              <Label htmlFor="specificRequirements">Technical Requirements & Customizations (Optional)</Label>
              <Textarea 
                {...form.register('specificRequirements')}
                placeholder="Any specific technical requirements, custom features, or modifications you need..."
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="successMetrics">Success Metrics & Expected Outcomes (Optional)</Label>
              <Textarea 
                {...form.register('successMetrics')}
                placeholder="How will you measure the success of this implementation? What ROI or outcomes are you expecting?"
                className="h-16"
              />
            </div>

            <div>
              <Label htmlFor="decisionMakers">Decision-Making Process (Optional)</Label>
              <Textarea 
                {...form.register('decisionMakers')}
                placeholder="Who else is involved in the decision-making process? What's your evaluation and approval timeline?"
                className="h-16"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={submitQuoteRequest.isPending}
              className="bg-nebusis-primary hover:bg-nebusis-dark text-white"
            >
              {submitQuoteRequest.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Request Quote
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}