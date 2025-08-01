import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  FileText, Calendar, DollarSign, User, Building2, 
  CheckCircle, Clock, AlertCircle, CreditCard,
  ArrowLeft, Download
} from "lucide-react";

interface ServiceProposal {
  id: number;
  proposalId: string;
  title: string;
  description: string;
  serviceType: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string | null;
  scope: string[];
  deliverables: string[];
  timeline: string;
  totalAmount: string;
  paymentTerms: string;
  status: string;
  termsAccepted: boolean;
  createdBy: string;
  expiresAt: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
  stripePaymentIntentId: string | null;
  acceptedAt: Date | null;
  paymentCompletedAt: Date | null;
}

export default function ServiceProposal() {
  const [location] = useLocation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Extract proposal ID from URL
  const proposalId = location.split('/').pop();
  
  const { data: proposal, isLoading, error } = useQuery<ServiceProposal>({
    queryKey: [`/api/service-proposals/${proposalId}`],
    enabled: !!proposalId,
  });

  const acceptProposal = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/service-proposals/${proposalId}/accept`, {
        termsAccepted: true
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Proposal Accepted",
        description: "Your proposal has been accepted. Redirecting to payment...",
      });
      
      // Redirect to checkout with the client secret for payment
      if (data.clientSecret) {
        const checkoutUrl = `/checkout?type=service_proposal&id=${proposalId}&price=${proposal?.totalAmount}&title=${encodeURIComponent(proposal?.title || '')}&client_secret=${data.clientSecret}`;
        window.location.href = checkoutUrl;
      }
      
      queryClient.invalidateQueries({ queryKey: [`/api/service-proposals/${proposalId}`] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to accept proposal",
        variant: "destructive",
      });
      setIsAccepting(false);
    },
  });

  const handleAcceptProposal = () => {
    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions before proceeding",
        variant: "destructive",
      });
      return;
    }
    
    setIsAccepting(true);
    acceptProposal.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Proposal Not Found</CardTitle>
            <CardDescription>
              The service proposal you're looking for doesn't exist or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.history.back()} variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isExpired = new Date() > new Date(proposal.expiresAt);
  const canAccept = proposal.status === 'pending' && !isExpired && !proposal.termsAccepted;
  const isAccepted = proposal.status === 'accepted' || proposal.termsAccepted;
  const isPaid = proposal.status === 'paid';
  const isInProgress = proposal.status === 'in_progress';

  const getStatusBadge = () => {
    switch (proposal.status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Pending Review</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Accepted - Payment Due</Badge>;
      case 'paid':
        return <Badge variant="outline" className="text-green-600 border-green-600">Paid</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="text-green-600 border-green-600">Services Active</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-gray-600 border-gray-600">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <Button onClick={() => window.history.back()} variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Proposal</h1>
              <p className="text-gray-600 mt-1">Proposal ID: {proposal.proposalId}</p>
            </div>
            <div className="text-right">
              {getStatusBadge()}
              {isExpired && (
                <div className="flex items-center text-red-600 text-sm mt-2">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Expired
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Proposal Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  {proposal.title}
                </CardTitle>
                <CardDescription>{proposal.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Service Type */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Service Type</h3>
                  <p className="text-gray-600 capitalize">{proposal.serviceType.replace('_', ' ')}</p>
                </div>

                {/* Scope of Work */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Scope of Work</h3>
                  <ul className="space-y-2">
                    {proposal.scope.map((item, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Deliverables</h3>
                  <ul className="space-y-2">
                    {proposal.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline & Payment Terms */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Project Timeline</h3>
                    <p className="text-gray-600">{proposal.timeline}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Payment Terms</h3>
                    <p className="text-gray-600">{proposal.paymentTerms}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Acceptance */}
            {canAccept && (
              <Card>
                <CardHeader>
                  <CardTitle>Terms and Conditions</CardTitle>
                  <CardDescription>
                    Please review and accept the terms before proceeding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                    <p className="mb-2"><strong>Payment Terms:</strong> {proposal.paymentTerms}</p>
                    <p className="mb-2"><strong>Project Timeline:</strong> {proposal.timeline}</p>
                    <p className="mb-2"><strong>Total Investment:</strong> ${proposal.totalAmount}</p>
                    <p className="mb-2"><strong>Validity:</strong> This proposal expires on {new Date(proposal.expiresAt).toLocaleDateString()}</p>
                    <p>By accepting this proposal, you agree to the scope of work, deliverables, timeline, and payment terms as outlined above.</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I have read and accept the terms and conditions
                    </label>
                  </div>

                  <Button 
                    onClick={handleAcceptProposal}
                    disabled={!termsAccepted || isAccepting}
                    className="w-full bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)] text-white"
                    size="lg"
                  >
                    {isAccepting ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept Proposal & Proceed to Payment
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Status Messages */}
            {isAccepted && !isPaid && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center text-blue-800">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <span className="font-medium">Payment Required</span>
                  </div>
                  <p className="text-blue-700 mt-2">
                    Your proposal has been accepted. Please complete payment to activate services.
                  </p>
                </CardContent>
              </Card>
            )}

            {isPaid && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center text-green-800">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Payment Received</span>
                  </div>
                  <p className="text-green-700 mt-2">
                    Thank you! Your payment has been processed and services are being activated.
                  </p>
                </CardContent>
              </Card>
            )}

            {isInProgress && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center text-green-800">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Services Active</span>
                  </div>
                  <p className="text-green-700 mt-2">
                    Your services are now active. Our team will be in contact shortly to begin work.
                  </p>
                </CardContent>
              </Card>
            )}

            {isExpired && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center text-red-800">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Proposal Expired</span>
                  </div>
                  <p className="text-red-700 mt-2">
                    This proposal has expired. Please contact us for a new proposal.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Investment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Investment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[hsl(221,83%,53%)]">
                    ${proposal.totalAmount}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">Total Investment</p>
                </div>
              </CardContent>
            </Card>

            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{proposal.clientName}</p>
                  <p className="text-sm text-gray-600">{proposal.clientEmail}</p>
                  {proposal.clientCompany && (
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Building2 className="h-4 w-4 mr-1" />
                      {proposal.clientCompany}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-gray-600">
                    {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Expires</p>
                  <p className="text-sm text-gray-600">
                    {new Date(proposal.expiresAt).toLocaleDateString()}
                  </p>
                </div>
                {proposal.acceptedAt && (
                  <div>
                    <p className="text-sm font-medium">Accepted</p>
                    <p className="text-sm text-gray-600">
                      {new Date(proposal.acceptedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {proposal.paymentCompletedAt && (
                  <div>
                    <p className="text-sm font-medium">Payment Completed</p>
                    <p className="text-sm text-gray-600">
                      {new Date(proposal.paymentCompletedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Questions about this proposal? Our team is here to help.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}