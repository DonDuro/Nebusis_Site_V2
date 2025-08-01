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
import { useToast } from '@/hooks/use-toast';
import { Loader2, Play, Calendar, Users, Building } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const demoRequestSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  companySize: z.string().min(1, 'Please select company size'),
  industry: z.string().min(1, 'Please select your industry'),
  userCount: z.string().min(1, 'Please specify expected user count'),
  currentSolutions: z.string().optional(),
  primaryGoals: z.string().min(10, 'Please describe your primary business goals'),
  currentChallenges: z.string().min(10, 'Please describe your current challenges'),
  complianceRequirements: z.string().optional(),
  integrationNeeds: z.string().optional(),
  budget: z.string().optional(),
  decisionMakers: z.string().optional(),
  timeframe: z.string().min(1, 'Please select implementation timeframe'),
  specificInterests: z.string().optional(),
  successMetrics: z.string().optional(),
  preferredDemoDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

type DemoRequestFormData = z.infer<typeof demoRequestSchema>;

interface SuiteDemoRequestDialogProps {
  suiteName: string;
  children: React.ReactNode;
}

export default function SuiteDemoRequestDialog({ suiteName, children }: SuiteDemoRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      jobTitle: '',
      phone: '',
      companySize: '',
      industry: '',
      userCount: '',
      currentSolutions: '',
      primaryGoals: '',
      currentChallenges: '',
      complianceRequirements: '',
      integrationNeeds: '',
      budget: '',
      decisionMakers: '',
      timeframe: '',
      specificInterests: '',
      successMetrics: '',
      preferredDemoDate: '',
      preferredTime: '',
    },
  });

  const submitDemoRequest = useMutation({
    mutationFn: async (data: DemoRequestFormData) => {
      const response = await apiRequest('POST', '/api/demo-requests', {
        ...data,
        productType: 'sector-suite',
        productName: suiteName,
        source: 'suite-detail-page',
        requestDate: new Date().toISOString(),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted",
        description: "We'll contact you within 24 hours to schedule your personalized demo.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/demo-requests'] });
      form.reset();
      setOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DemoRequestFormData) => {
    submitDemoRequest.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Play className="h-5 w-5 mr-2 text-nebusis-primary" />
            Request Demo: {suiteName}
          </DialogTitle>
          <DialogDescription>
            Schedule a personalized demo to see how this sector suite can transform your organization. 
            Our experts will customize the demonstration to your specific needs and industry requirements.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          {/* Project Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Project Details
            </h4>
            
            <div>
              <Label htmlFor="userCount">Expected User Count *</Label>
              <Select onValueChange={(value) => form.setValue('userCount', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expected user count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 users</SelectItem>
                  <SelectItem value="11-25">11-25 users</SelectItem>
                  <SelectItem value="26-50">26-50 users</SelectItem>
                  <SelectItem value="51-100">51-100 users</SelectItem>
                  <SelectItem value="101-200">101-200 users</SelectItem>
                  <SelectItem value="201-500">201-500 users</SelectItem>
                  <SelectItem value="500+">500+ users</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.userCount && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.userCount.message}</p>
              )}
            </div>

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
                  <SelectItem value="exploring">Just exploring options</SelectItem>
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
                  <SelectItem value="not-disclosed">Prefer not to disclose</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Business Requirements */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Business Requirements & Goals</h4>
            
            <div>
              <Label htmlFor="primaryGoals">Primary Business Goals *</Label>
              <Textarea 
                {...form.register('primaryGoals')}
                placeholder="What are your main objectives? (e.g., improve compliance, reduce costs, streamline operations, enhance security...)"
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
              <Label htmlFor="decisionMakers">Decision-Making Process (Optional)</Label>
              <Textarea 
                {...form.register('decisionMakers')}
                placeholder="Who else is involved in the decision-making process? What's your evaluation timeline?"
                className="h-16"
              />
            </div>

            <div>
              <Label htmlFor="successMetrics">Success Metrics (Optional)</Label>
              <Textarea 
                {...form.register('successMetrics')}
                placeholder="How will you measure the success of this implementation? What outcomes are you expecting?"
                className="h-16"
              />
            </div>

            <div>
              <Label htmlFor="specificInterests">Demo Focus Areas (Optional)</Label>
              <Textarea 
                {...form.register('specificInterests')}
                placeholder="Any specific applications, features, or workflows you'd like us to emphasize during the demo..."
                className="h-16"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDemoDate">Preferred Demo Date (Optional)</Label>
                <Input 
                  {...form.register('preferredDemoDate')}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="preferredTime">Preferred Time (Optional)</Label>
                <Select onValueChange={(value) => form.setValue('preferredTime', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                    <SelectItem value="evening">Evening (5 PM - 7 PM)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={submitDemoRequest.isPending}
              className="bg-nebusis-primary hover:bg-nebusis-dark"
            >
              {submitDemoRequest.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Request Demo
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}