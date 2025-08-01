// STRIPE INTEGRATION TEMPORARILY DISABLED FOR STATIC SITE
// import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Shield, CheckCircle, Tag, X, Clock } from "lucide-react";

// STRIPE DISABLED FOR STATIC SITE
// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
// if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
//   throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
// }
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ orderDetails }: { orderDetails: any }) => {
  // STRIPE INTEGRATION DISABLED FOR STATIC SITE
  // const stripe = useStripe();
  // const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [originalAmount] = useState(orderDetails.amount);
  const [finalAmount, setFinalAmount] = useState(orderDetails.amount);

  const validateDiscountCode = async () => {
    if (!discountCode.trim()) return;
    
    setIsValidatingCode(true);
    try {
      const response = await apiRequest('/api/validate-discount', {
        method: 'POST',
        body: JSON.stringify({
          code: discountCode,
          amount: originalAmount,
          type: orderDetails.type
        })
      });

      if (response.valid) {
        setAppliedDiscount(response.discount);
        setFinalAmount(response.finalAmount);
        toast({
          title: "Discount Applied!",
          description: response.message,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      toast({
        title: "Invalid Discount Code",
        description: error.message || "Please check your discount code and try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidatingCode(false);
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setFinalAmount(originalAmount);
    setDiscountCode("");
    toast({
      title: "Discount Removed",
      description: "The discount code has been removed from your order.",
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // STRIPE PAYMENT PROCESSING TEMPORARILY DISABLED
    // Payment processing is disabled in static mode
    toast({
      title: "Checkout Temporarily Disabled",
      description: "Payment processing is coming soon. Please contact us for assistance.",
      variant: "destructive",
    });
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Discount Code Section */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h3 className="font-medium mb-3 flex items-center">
          <Tag className="h-4 w-4 mr-2 text-yellow-600" />
          Discount Code
        </h3>
        
        {appliedDiscount ? (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <div>
                <span className="font-medium text-green-800">{appliedDiscount.code}</span>
                <p className="text-sm text-green-600">
                  {appliedDiscount.discountType === 'percentage' 
                    ? `${appliedDiscount.discountValue}% off` 
                    : `$${appliedDiscount.discountValue} off`}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeDiscount}
              className="text-green-600 hover:text-green-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="discountCode" className="sr-only">Discount Code</Label>
              <Input
                id="discountCode"
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                className="uppercase"
              />
            </div>
            <Button
              type="button"
              onClick={validateDiscountCode}
              disabled={!discountCode.trim() || isValidatingCode}
              className="bg-nebusis-primary hover:bg-nebusis-dark text-white"
            >
              {isValidatingCode ? (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <h3 className="font-medium mb-2">Order Summary</h3>
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>${originalAmount.toFixed(2)}</span>
        </div>
        {appliedDiscount && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount ({appliedDiscount.code}):</span>
            <span>-${(originalAmount - finalAmount).toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total:</span>
          <span>${finalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Information - TEMPORARILY DISABLED */}
      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
        <h3 className="font-medium mb-2 flex items-center text-orange-800">
          <Clock className="h-4 w-4 mr-2" />
          Payment Processing
        </h3>
        <div className="bg-white border border-gray-200 p-4 rounded text-center text-gray-500">
          <CreditCard className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Payment processing is temporarily disabled</p>
          <p className="text-xs mt-1">We're preparing to launch soon!</p>
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={true}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white opacity-60 cursor-not-allowed"
        size="lg"
      >
        <Clock className="h-4 w-4 mr-2" />
        Checkout Temporarily Disabled - Coming Soon
      </Button>
      
      <div className="flex items-center justify-center text-sm text-orange-600 bg-orange-50 p-2 rounded">
        <Clock className="h-4 w-4 mr-2" />
        Payment processing will be available soon. Contact us for assistance.
      </div>
    </form>
  );
};

export default function Checkout() {
  const [location] = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const id = urlParams.get('id');
    const price = urlParams.get('price');
    const title = urlParams.get('title');
    
    if (!type || !id || !price || !title) {
      setError("Missing required order information");
      setLoading(false);
      return;
    }

    const details = {
      type,
      id,
      price: parseFloat(price),
      amount: parseFloat(price), // Same as price for compatibility
      title: decodeURIComponent(title)
    };
    
    setOrderDetails(details);

    // STRIPE PAYMENT INITIALIZATION DISABLED FOR STATIC SITE
    // Simulate successful initialization for UI display
    setTimeout(() => {
      setClientSecret("static_mode_placeholder"); // Placeholder for UI
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[hsl(221,83%,53%)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Preparing your checkout...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-gray-800">Checkout Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!clientSecret || !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Unable to Process Payment</CardTitle>
            <CardDescription>Please try again or contact support</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Button 
            onClick={() => window.history.back()}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {orderDetails.type === 'certification' ? 'Certifications' : 'Products'}
          </Button>
          <h1 className="text-3xl font-bold">Secure Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your purchase details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{orderDetails.title}</h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {orderDetails.type === 'certification' ? 'Professional Certification' : 'Product License'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${orderDetails.price}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderDetails.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>${orderDetails.price}</span>
                </div>
              </div>

              {orderDetails.type === 'certification' && (
                <div className="bg-[var(--subtle-lavender)] p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What's Included:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      Access to 16 hours of training
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      Certificate of course completion
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      Optional competence certification based on ISO/IEC 17024, upon passing examination
                    </li>
                  </ul>
                </div>
              )}

              {orderDetails.type === 'sector-suite' && (
                <div className="bg-nebusis-bg p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What's Included:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      Complete industry-specific app bundle
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      Compliance with industry standards
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      Implementation support included
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      Ongoing updates and maintenance
                    </li>
                  </ul>
                </div>
              )}

              {orderDetails.type === 'application' && (
                <div className="bg-[var(--subtle-sage)] p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What's Included:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      Pro tier software license
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      2+ user accounts included
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      Premium support and updates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-nebusis-primary mr-2" />
                      Full feature access
                    </li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Complete your secure payment</CardDescription>
            </CardHeader>
            <CardContent>
              {/* STRIPE ELEMENTS WRAPPER DISABLED FOR STATIC SITE */}
              <CheckoutForm orderDetails={orderDetails} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}