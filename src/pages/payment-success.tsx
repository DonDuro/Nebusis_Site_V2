import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Home, BookOpen, Mail } from "lucide-react";

export default function PaymentSuccess() {
  const [location] = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const type = urlParams.get('type');
    const title = urlParams.get('title');
    
    if (type && title) {
      setOrderDetails({
        type,
        title: decodeURIComponent(title)
      });
    }
  }, [location]);

  const handleDownloadReceipt = () => {
    // In a real implementation, this would download the receipt
    console.log('Downloading receipt...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-nebusis-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-nebusis-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Confirmation</CardTitle>
            <CardDescription>Your order has been processed successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderDetails && (
              <div className="bg-[var(--subtle-mint)] p-4 rounded-lg">
                <h3 className="font-medium text-nebusis-dark mb-2">
                  {orderDetails.title}
                </h3>
                <p className="text-sm text-nebusis-primary">
                  {orderDetails.type === 'certification' 
                    ? 'Professional Certification Program' 
                    : orderDetails.type === 'application'
                    ? 'Software License'
                    : orderDetails.type === 'sector-suite'
                    ? 'Industry Sector Suite'
                    : 'Product License'}
                </p>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">What happens next?</h4>
              <div className="space-y-3">
                {orderDetails?.type === 'certification' ? (
                  <>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Check your email</p>
                        <p className="text-sm text-gray-600">
                          You'll receive a confirmation email with access instructions within 5 minutes
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Access your course</p>
                        <p className="text-sm text-gray-600">
                          Log in to your learning portal to start your certification journey
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Complete your training</p>
                        <p className="text-sm text-gray-600">
                          Finish all 16 hours of training to receive your official certification
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Account setup</p>
                        <p className="text-sm text-gray-600">
                          We'll create your account and send login credentials via email
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Implementation support</p>
                        <p className="text-sm text-gray-600">
                          Our team will contact you within 24 hours to begin setup
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleDownloadReceipt}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                
                {orderDetails?.type === 'certification' && (
                  <Button 
                    onClick={() => window.location.href = '/certifications'}
                    variant="outline"
                    className="flex-1"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View All Certifications
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>We're here to support you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-gray-500" />
                <span className="text-sm">
                  For questions about your order, contact our support team through the contact form
                </span>
              </div>
              
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-3 text-gray-500" />
                <span className="text-sm">
                  Visit our FAQ section for common questions and answers
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)] text-white"
              >
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}