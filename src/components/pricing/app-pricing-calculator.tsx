import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calculator, Download, ShoppingCart, Users, Building2, Zap, FileText, Plus, Minus, CheckCircle } from "lucide-react";
import EnterpriseQuoteForm from "@/components/forms/enterprise-quote-form";

interface PricingTier {
  price: number;
  features: string[];
}

interface ApplicationPricing {
  starter: PricingTier;
  pro: PricingTier;
  enterprise: PricingTier;
}

interface AppPricingCalculatorProps {
  applicationName: string;
  basePricing: ApplicationPricing;
  category: string;
}

export default function AppPricingCalculator({ 
  applicationName, 
  basePricing, 
  category 
}: AppPricingCalculatorProps) {
  const [pricingModel, setPricingModel] = useState<'basic' | 'small-team' | 'enterprise'>('basic');
  const [userCount, setUserCount] = useState([1]);
  const [additionalUsers, setAdditionalUsers] = useState([0]);
  
  // ComplianceOne specific states
  const [selectedStandards, setSelectedStandards] = useState(1);
  const [complianceUsers, setComplianceUsers] = useState([3]);
  
  // Multiomics Engine specific states
  const [selectedOmics, setSelectedOmics] = useState(1);
  
  // SelfCertPro specific states
  const [selectedSelfCertStandards, setSelectedSelfCertStandards] = useState(1);
  const [selfCertUsers, setSelfCertUsers] = useState([0]);
  
  // Training options
  const [trainingDays, setTrainingDays] = useState([0]);
  const [trainingType, setTrainingType] = useState<'quarter' | 'half' | 'full'>('full');
  
  // Enterprise quote needs
  const [needsMultipleApps, setNeedsMultipleApps] = useState(false);
  const [needsMultipleSites, setNeedsMultipleSites] = useState(false);
  const [needsMultipleStandards, setNeedsMultipleStandards] = useState(false);
  const [needsAppIntegration, setNeedsAppIntegration] = useState(false);
  
  // Enterprise quote form state
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false);

  const isComplianceOne = applicationName.toLowerCase().includes('complianceone') || applicationName.toLowerCase().includes('controlcore');
  const isMultiomicsEngine = applicationName.toLowerCase().includes('multiomics engine');
  const isSelfCertPro = applicationName.toLowerCase().includes('selfcertpro');

  // Calculate ComplianceOne/ControlCore pricing to match static tiers
  const calculateComplianceOnePrice = () => {
    const wizardCount = selectedStandards;
    const userCount = complianceUsers[0];
    
    // Check if this is ControlCore vs ComplianceOne
    const isControlCore = applicationName.toLowerCase().includes('controlcore');
    
    if (isControlCore) {
      // ControlCore specific pricing: $1250 for starter, enterprise requires quote
      if (userCount <= 3) {
        // Starter: Up to 3 Users - $1250 setup + $1250 annual
        return { setupFee: 1250, annualLicense: 1250 };
      } else {
        // Enterprise: More than 3 users requires quote
        return { setupFee: 0, annualLicense: 0, requiresQuote: true };
      }
    } else {
      // ComplianceOne wizard-based pricing structure
      const basePrice = 1250; // Base price for first wizard
      
      // Calculate pricing for all configurations
      let setupFee = basePrice;
      let annualLicense = basePrice;
      
      // Add 50% for each additional standard
      for (let i = 1; i < wizardCount; i++) {
        setupFee += basePrice * 0.5; // 50% of base price
        annualLicense += basePrice * 0.5;
      }
      
      // Add cost for additional users beyond 3
      if (userCount > 3) {
        const additionalUsers = userCount - 3;
        const userCost = additionalUsers * 150; // $150/year per additional user
        annualLicense += userCost;
        setupFee += userCost; // Also add to setup
      }
      
      // Determine if this requires custom quote (2+ standards OR 100+ users OR app integration)
      const requiresCustomQuote = wizardCount >= 2 || userCount >= 100 || needsAppIntegration;
      
      return { 
        setupFee, 
        annualLicense, 
        isEstimate: requiresCustomQuote || (wizardCount > 1 || userCount > 3),
        requiresCustomQuote 
      };
    }
  };

  // Calculate SelfCertPro pricing
  const calculateSelfCertProPrice = () => {
    const standardCount = selectedSelfCertStandards;
    const userCount = selfCertUsers[0] + 1; // Base user + additional users
    
    // Base pricing: $1,500 for first standard, $750 for each additional
    let setupFee = 1500; // First standard
    if (standardCount > 1) {
      setupFee += (standardCount - 1) * 750; // Additional standards
    }
    
    // Monthly licensing: $15/month per user
    const monthlyFee = userCount * 15;
    const annualFee = monthlyFee * 12;
    
    // Custom quote required for 4+ standards
    const requiresCustomQuote = standardCount >= 4;
    
    return {
      setupFee,
      monthlyFee,
      annualFee,
      requiresCustomQuote
    };
  };

  // Calculate Multiomics Engine pricing
  const calculateMultiomicsPrice = () => {
    const omicCount = selectedOmics;
    const userCount = additionalUsers[0] + 1; // Base user + additional users
    
    // Base pricing: $1,500 for first omic, $750 for each additional
    let setupFee = 1500; // First omic
    if (omicCount > 1) {
      setupFee += (omicCount - 1) * 750; // Additional omics
    }
    
    // Monthly recurring fee: $15 per user
    const monthlyFee = userCount * 15;
    const annualFee = monthlyFee * 12;
    
    // 4+ omics require custom quote
    const requiresCustomQuote = omicCount >= 4;
    
    return { 
      setupFee: requiresCustomQuote ? 0 : setupFee, 
      annualLicense: requiresCustomQuote ? 0 : annualFee,
      requiresCustomQuote 
    };
  };

  // Calculate standard app pricing
  const calculateStandardAppPrice = () => {
    let setupFee = 0;
    let monthlyFee = 0;
    
    if (pricingModel === 'basic') {
      setupFee = 100;
      monthlyFee = userCount[0] * 15; // $15 per user per month (annual billing)
    } else if (pricingModel === 'small-team') {
      setupFee = 200; // $200 setup fee for Pro plan
      const totalUsers = Math.max(userCount[0], 2); // Minimum 2 users for Pro
      monthlyFee = totalUsers * 10; // $10 per user per month
    }
    
    return { setupFee, monthlyFee, annualFee: monthlyFee * 12 };
  };

  // Calculate training costs
  const calculateTrainingCost = () => {
    if (trainingDays[0] === 0) return 0;
    
    const days = trainingDays[0];
    let cost = 1500; // First day
    
    if (days > 1) {
      cost += (days - 1) * 1000; // Subsequent days at $1000
    }
    
    // Apply fractional day multiplier
    const multiplier = trainingType === 'quarter' ? 0.25 : trainingType === 'half' ? 0.5 : 1;
    return cost * multiplier;
  };

  // Calculate total costs
  const calculateTotal = () => {
    if (isComplianceOne) {
      const result = calculateComplianceOnePrice();
      const trainingCost = calculateTrainingCost();
      
      if (result.requiresQuote) {
        return {
          setupFee: 0,
          recurringFee: 0,
          trainingCost: 0,
          total: 0,
          billingPeriod: 'Annual',
          requiresQuote: true
        };
      }
      
      return {
        setupFee: result.setupFee,
        recurringFee: result.annualLicense,
        trainingCost,
        total: result.setupFee + result.annualLicense + trainingCost,
        billingPeriod: 'Annual',
        isEstimate: result.isEstimate,
        requiresCustomQuote: result.requiresCustomQuote
      };
    } else if (isMultiomicsEngine) {
      const result = calculateMultiomicsPrice();
      const trainingCost = calculateTrainingCost();
      
      if (result.requiresCustomQuote) {
        return {
          setupFee: 0,
          recurringFee: 0,
          trainingCost: 0,
          total: 0,
          billingPeriod: 'Annual',
          requiresQuote: true
        };
      }
      
      return {
        setupFee: result.setupFee,
        recurringFee: result.annualLicense,
        trainingCost,
        total: result.setupFee + result.annualLicense + trainingCost,
        billingPeriod: 'Annual'
      };
    } else if (isSelfCertPro) {
      const result = calculateSelfCertProPrice();
      const trainingCost = calculateTrainingCost();
      
      if (result.requiresCustomQuote) {
        return {
          setupFee: 0,
          recurringFee: 0,
          trainingCost: 0,
          total: 0,
          billingPeriod: 'Annual',
          requiresQuote: true
        };
      }
      
      return {
        setupFee: result.setupFee,
        recurringFee: result.annualFee,
        trainingCost,
        total: result.setupFee + result.annualFee + trainingCost,
        billingPeriod: 'Annual'
      };
    } else {
      const { setupFee, monthlyFee, annualFee } = calculateStandardAppPrice();
      const trainingCost = calculateTrainingCost();
      return {
        setupFee,
        recurringFee: annualFee,
        trainingCost,
        total: setupFee + annualFee + trainingCost,
        billingPeriod: 'Annual'
      };
    }
  };

  const shouldShowEnterpriseForm = () => {
    if (pricingModel === 'enterprise' || needsMultipleApps || needsMultipleSites) {
      return true;
    }
    
    // For ComplianceOne, show enterprise form for configurations requiring custom quotes (2+ standards OR 100+ users OR app integration)
    if (isComplianceOne) {
      return selectedStandards >= 2 || complianceUsers[0] >= 100 || needsAppIntegration;
    }
    
    // For Multiomics Engine, show enterprise form for 4+ omics
    if (isMultiomicsEngine) {
      return selectedOmics >= 4;
    }
    
    // For SelfCertPro, show enterprise form for 4+ standards
    if (isSelfCertPro) {
      return selectedSelfCertStandards >= 4;
    }
    
    return false;
  };

  const generateQuote = () => {
    const costs = calculateTotal();
    const quoteId = `NEB-${Date.now().toString().slice(-8)}`;
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const quote = {
      id: quoteId,
      date: currentDate,
      application: applicationName,
      pricingModel,
      users: isComplianceOne ? complianceUsers[0] : isMultiomicsEngine ? additionalUsers[0] + 1 : isSelfCertPro ? selfCertUsers[0] + 1 : userCount[0],
      ...(isComplianceOne && { standards: selectedStandards }),
      ...(isMultiomicsEngine && { omics: selectedOmics }),
      ...(isSelfCertPro && { standards: selectedSelfCertStandards }),
      costs,
      training: trainingDays[0] > 0 ? {
        days: trainingDays[0],
        type: trainingType,
        cost: calculateTrainingCost()
      } : null,
      enterprise: shouldShowEnterpriseForm() ? {
        multipleApps: needsMultipleApps,
        multipleSites: needsMultipleSites,
        multipleStandards: needsMultipleStandards
      } : null
    };
    
    generateProfessionalQuote(quote);
  };

  const generateProfessionalQuote = (quote: any) => {
    const content = `
<!DOCTYPE html>
<html>
<head>
  <title>Nebusis® Quote - ${quote.id}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
    .letterhead { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; margin-bottom: 30px; position: relative; }
    .letterhead .logo { position: absolute; left: 30px; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
    .letterhead .logo-text { color: #1e40af; font-weight: bold; font-size: 20px; }
    .letterhead h1 { margin: 0; font-size: 28px; font-weight: bold; }
    .letterhead p { margin: 5px 0; font-size: 14px; }
    .quote-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .quote-details { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .quote-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .quote-table th, .quote-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
    .quote-table th { background: #f1f5f9; font-weight: bold; }
    .total-section { background: #1e40af; color: white; padding: 20px; border-radius: 8px; text-align: center; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; }
    .terms { margin-top: 30px; font-size: 12px; color: #64748b; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <div class="letterhead">
    <div class="logo">
      <span class="logo-text">N</span>
    </div>
    <h1>Nebusis® Cloud Services, LLC</h1>
    <p>Enterprise SaaS Solutions & Digital Transformation</p>
    <p>1234 Business Drive, Suite 500, Enterprise City, TX 75001</p>
    <p>📧 quotes@nebusis.com | 🌐 www.nebusis.com</p>
  </div>

  <div class="quote-header">
    <div>
      <h2>Professional Quote</h2>
      <p><strong>Quote ID:</strong> ${quote.id}</p>
      <p><strong>Date:</strong> ${quote.date}</p>
    </div>
    <div style="text-align: right;">
      <p><strong>Valid Until:</strong> ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
      <p><strong>Application:</strong> ${quote.application}</p>
    </div>
  </div>

  <div class="quote-details">
    <h3>Configuration Details</h3>
    <p><strong>Pricing Model:</strong> ${quote.pricingModel.charAt(0).toUpperCase() + quote.pricingModel.slice(1)}</p>
    <p><strong>Number of Users:</strong> ${quote.users}</p>
    ${quote.wizards ? `<p><strong>Management System Wizards:</strong> ${quote.wizards}</p>` : ''}
    ${quote.training ? `<p><strong>Training:</strong> ${quote.training.days} days (${quote.training.type})</p>` : ''}
  </div>

  <table class="quote-table">
    <thead>
      <tr>
        <th>Description</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${quote.costs.setupFee > 0 ? `
      <tr>
        <td>Setup & Implementation</td>
        <td>1</td>
        <td>$${quote.costs.setupFee.toLocaleString()}</td>
        <td>$${quote.costs.setupFee.toLocaleString()}</td>
      </tr>
      ` : ''}
      ${quote.costs.annualLicense > 0 ? `
      <tr>
        <td>Annual License</td>
        <td>1</td>
        <td>$${quote.costs.annualLicense.toLocaleString()}</td>
        <td>$${quote.costs.annualLicense.toLocaleString()}</td>
      </tr>
      ` : ''}
      ${quote.costs.monthlyFee > 0 ? `
      <tr>
        <td>Monthly Subscription (${quote.users} users)</td>
        <td>12 months</td>
        <td>$${quote.costs.monthlyFee.toLocaleString()}</td>
        <td>$${(quote.costs.monthlyFee * 12).toLocaleString()}</td>
      </tr>
      ` : ''}
      ${quote.costs.recurringFee > 0 && quote.costs.recurringFee !== quote.costs.monthlyFee ? `
      <tr>
        <td>Monthly Recurring</td>
        <td>12 months</td>
        <td>$${quote.costs.recurringFee.toLocaleString()}</td>
        <td>$${(quote.costs.recurringFee * 12).toLocaleString()}</td>
      </tr>
      ` : ''}
      ${quote.training ? `
      <tr>
        <td>Training Services</td>
        <td>${quote.training.days} days</td>
        <td>$${(quote.training.cost / quote.training.days).toLocaleString()}</td>
        <td>$${quote.training.cost.toLocaleString()}</td>
      </tr>
      ` : ''}
    </tbody>
  </table>

  <div class="total-section">
    <h2>Total Investment: $${quote.costs.total.toLocaleString()}</h2>
    ${quote.costs.recurringFee > 0 ? `<p>Plus $${quote.costs.recurringFee.toLocaleString()}/year ongoing</p>` : ''}
  </div>

  <div class="terms">
    <h3>Terms & Conditions</h3>
    <ul>
      <li>Quote valid for 30 days from issue date</li>
      <li>Implementation begins within 5-10 business days of signed agreement</li>
      <li>Payment terms: 50% due upon signature, 50% due upon go-live</li>
      <li>All pricing includes first year of standard support</li>
      <li>Setup includes system configuration, user training, and knowledge transfer</li>
      <li>Refunds are evaluated case-by-case after 14-day evaluation period</li>
    </ul>
  </div>

  <div class="footer">
    <p>Thank you for considering Nebusis® Cloud Services for your digital transformation needs.</p>
    <p>For questions about this quote, please contact our sales team at quotes@nebusis.com</p>
    <p><strong>Nebusis® - Transforming Business Through Intelligent Technology</strong></p>
  </div>
</body>
</html>
    `;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Nebusis_Quote_${quote.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addToCart = async () => {
    const costs = calculateTotal();
    const cartItem = {
      type: 'application',
      applicationName,
      pricingModel,
      users: isComplianceOne ? complianceUsers[0] : isMultiomicsEngine ? additionalUsers[0] + 1 : isSelfCertPro ? selfCertUsers[0] + 1 : userCount[0],
      ...(isComplianceOne && { standards: selectedStandards }),
      ...(isMultiomicsEngine && { omics: selectedOmics }),
      ...(isSelfCertPro && { standards: selectedSelfCertStandards }),
      costs,
      training: trainingDays[0] > 0 ? {
        days: trainingDays[0],
        type: trainingType,
        cost: calculateTrainingCost()
      } : null
    };

    // For now, store in localStorage (in a real app, you'd send to your backend)
    const existingCart = JSON.parse(localStorage.getItem('nebusisCart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('nebusisCart', JSON.stringify(existingCart));
    
    alert('Added to cart successfully!');
  };

  const costs = calculateTotal();

  return (
    <div className="space-y-6">
      {/* Calculator Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-nebusis-primary rounded-lg">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Pricing Calculator</CardTitle>
              <p className="text-sm text-gray-600">
                Customize your {applicationName} package to fit your needs
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pricing Model Selection */}
          {!isComplianceOne && !isSelfCertPro && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Select Pricing Model</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      pricingModel === 'basic' 
                        ? 'border-nebusis-primary bg-nebusis-bg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setPricingModel('basic');
                      setUserCount([1]); // Reset to 1 user for Basic plan
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Basic</h3>
                    </div>
                    <div className="text-lg font-bold text-nebusis-primary">
                      $15/month
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      1 user, billed annually
                    </div>
                  </div>

                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      pricingModel === 'small-team' 
                        ? 'border-nebusis-primary bg-nebusis-bg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setPricingModel('small-team');
                      if (userCount[0] < 2) setUserCount([2]); // Ensure minimum 2 users for Small Team
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Small Team</h3>
                      <Badge variant="secondary">Popular</Badge>
                    </div>
                    <div className="text-lg font-bold text-nebusis-primary">
                      $10/month
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      2+ users, billed annually
                    </div>
                  </div>

                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      pricingModel === 'enterprise' 
                        ? 'border-nebusis-primary bg-nebusis-bg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPricingModel('enterprise')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Enterprise</h3>
                    </div>
                    <div className="text-lg font-bold text-nebusis-primary">
                      Custom Quote
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Multiple apps, sites, users
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* User Configuration */}
          {!shouldShowEnterpriseForm() && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {isComplianceOne ? (applicationName.toLowerCase().includes('controlcore') ? 'User Configuration' : 'Standards & Users') : 'Number of Users'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isComplianceOne ? (
                  <>
                    {!applicationName.toLowerCase().includes('controlcore') && (
                      <div className="flex items-center gap-4">
                        <FileText className="h-5 w-5 text-nebusis-primary" />
                        <div className="flex-1">
                          <div className="flex justify-between mb-3">
                            <Label>Standards for Management System Wizard</Label>
                            <span className="text-sm font-medium">{selectedStandards >= 4 ? '4+ standards' : `${selectedStandards} standard${selectedStandards > 1 ? 's' : ''}`}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant={selectedStandards === 1 ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedStandards(1)}
                              className={`${selectedStandards === 1 ? 'bg-nebusis-primary hover:bg-nebusis-dark text-white' : 'hover:bg-nebusis-light'}`}
                            >
                              1 Standard
                            </Button>
                            <Button
                              variant={selectedStandards === 2 ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedStandards(2)}
                              className={`${selectedStandards === 2 ? 'bg-nebusis-primary hover:bg-nebusis-dark text-white' : 'hover:bg-nebusis-light'}`}
                            >
                              2 Standards
                            </Button>
                            <Button
                              variant={selectedStandards === 3 ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedStandards(3)}
                              className={`${selectedStandards === 3 ? 'bg-nebusis-primary hover:bg-nebusis-dark text-white' : 'hover:bg-nebusis-light'}`}
                            >
                              3 Standards
                            </Button>
                            <Button
                              variant={selectedStandards >= 4 ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedStandards(4)}
                              className={`${selectedStandards >= 4 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'hover:bg-orange-50 border-orange-300'}`}
                            >
                              4+ Standards
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Starter tier supports 1 standard only. Select "2 Standards", "3 Standards", or "4+ Standards" for custom quote.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <Users className="h-5 w-5 text-nebusis-primary" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <Label>{applicationName.toLowerCase().includes('controlcore') ? 'Government Institution Users' : 'Users'}</Label>
                          <span className="text-sm font-medium">{complianceUsers[0]} users</span>
                        </div>
                        <Slider
                          value={complianceUsers}
                          onValueChange={setComplianceUsers}
                          max={100}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>1 user</span>
                          <span>100+ users</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          {applicationName.toLowerCase().includes('controlcore') 
                            ? 'Fixed pricing for up to 3 government institution users. Additional users require custom quote.'
                            : 'Starter tier: 1 standard only, up to 99 users. Custom quotes required for 2+ standards, 100+ users, or app integrations.'
                          }
                        </p>
                      </div>
                    </div>
                  </>
                ) : isMultiomicsEngine ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-nebusis-primary" />
                        <Label className="text-base font-medium">Number of Omics Workflows</Label>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={selectedOmics === 1 ? "default" : "outline"}
                          size="lg"
                          onClick={() => setSelectedOmics(1)}
                          className={`h-16 flex flex-col justify-center ${selectedOmics === 1 ? 'bg-nebusis-primary hover:bg-nebusis-dark text-white' : 'hover:bg-nebusis-light'}`}
                        >
                          <span className="font-medium">1 Omic</span>
                          <span className="text-xs opacity-75">$1,500 setup</span>
                        </Button>
                        <Button
                          variant={selectedOmics === 2 ? "default" : "outline"}
                          size="lg"
                          onClick={() => setSelectedOmics(2)}
                          className={`h-16 flex flex-col justify-center ${selectedOmics === 2 ? 'bg-nebusis-primary hover:bg-nebusis-dark text-white' : 'hover:bg-nebusis-light'}`}
                        >
                          <span className="font-medium">2 Omics</span>
                          <span className="text-xs opacity-75">$2,250 setup</span>
                        </Button>
                        <Button
                          variant={selectedOmics === 3 ? "default" : "outline"}
                          size="lg"
                          onClick={() => setSelectedOmics(3)}
                          className={`h-16 flex flex-col justify-center ${selectedOmics === 3 ? 'bg-nebusis-primary hover:bg-nebusis-dark text-white' : 'hover:bg-nebusis-light'}`}
                        >
                          <span className="font-medium">3 Omics</span>
                          <span className="text-xs opacity-75">$3,000 setup</span>
                        </Button>
                        <Button
                          variant={selectedOmics >= 4 ? "default" : "outline"}
                          size="lg"
                          onClick={() => setSelectedOmics(4)}
                          className={`h-16 flex flex-col justify-center ${selectedOmics >= 4 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'hover:bg-orange-50 border-orange-300'}`}
                        >
                          <span className="font-medium">4+ Omics</span>
                          <span className="text-xs opacity-75">Custom Quote</span>
                        </Button>
                      </div>
                      
                      <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                        First omic: $1,500 setup, each additional: $750 setup. Select "4+ Omics" for custom quote.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Users className="h-5 w-5 text-nebusis-primary" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <Label>Laboratory Users</Label>
                          <span className="text-sm font-medium">{additionalUsers[0] + 1} users</span>
                        </div>
                        <Slider
                          value={additionalUsers}
                          onValueChange={setAdditionalUsers}
                          max={99}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>1 user</span>
                          <span>100+ users</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          $15/month per user. First user included in base pricing.
                        </p>
                      </div>
                    </div>
                  </>
                ) : isSelfCertPro ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-nebusis-primary" />
                        <Label className="text-base font-medium">Number of Standards/Frameworks</Label>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={selectedSelfCertStandards === 1 ? "default" : "outline"}
                          size="lg"
                          onClick={() => setSelectedSelfCertStandards(1)}
                          className={`h-16 flex flex-col justify-center ${selectedSelfCertStandards === 1 ? 'bg-nebusis-primary hover:bg-nebusis-dark text-white' : 'hover:bg-nebusis-light'}`}
                        >
                          <span className="font-medium">1 Standard</span>
                          <span className="text-xs opacity-75">$1,500 setup</span>
                        </Button>
                        <Button
                          variant={selectedSelfCertStandards === 2 ? "default" : "outline"}
                          size="lg"
                          onClick={() => setSelectedSelfCertStandards(2)}
                          className={`h-16 flex flex-col justify-center ${selectedSelfCertStandards === 2 ? 'bg-nebusis-primary hover:bg-nebusis-dark text-white' : 'hover:bg-nebusis-light'}`}
                        >
                          <span className="font-medium">2 Standards</span>
                          <span className="text-xs opacity-75">$2,250 setup</span>
                        </Button>
                        <Button
                          variant={selectedSelfCertStandards === 3 ? "default" : "outline"}
                          size="lg"
                          onClick={() => setSelectedSelfCertStandards(3)}
                          className={`h-16 flex flex-col justify-center ${selectedSelfCertStandards === 3 ? 'bg-nebusis-primary hover:bg-nebusis-dark text-white' : 'hover:bg-nebusis-light'}`}
                        >
                          <span className="font-medium">3 Standards</span>
                          <span className="text-xs opacity-75">$3,000 setup</span>
                        </Button>
                        <Button
                          variant={selectedSelfCertStandards >= 4 ? "default" : "outline"}
                          size="lg"
                          onClick={() => setSelectedSelfCertStandards(4)}
                          className={`h-16 flex flex-col justify-center ${selectedSelfCertStandards >= 4 ? 'bg-nebusis-primary hover:bg-nebusis-dark text-white' : 'hover:bg-nebusis-light'}`}
                        >
                          <span className="font-medium">4+ Standards</span>
                          <span className="text-xs opacity-75">Custom Quote</span>
                        </Button>
                      </div>
                      
                      <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                        First standard: $1,500 setup, each additional: $750 setup. 4+ standards require custom proposal.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-nebusis-primary" />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <Label className="text-base font-medium">Certification Users</Label>
                            <span className="text-sm font-medium text-nebusis-primary">{selfCertUsers[0] + 1} users</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-3">
                        <Slider
                          value={selfCertUsers}
                          onValueChange={setSelfCertUsers}
                          max={99}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>1 user</span>
                          <span>100+ users</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 bg-blue-50 p-3 rounded-md">
                        $15/month per user. First user included in base pricing.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <Users className="h-5 w-5 text-nebusis-primary" />
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <Label>Users</Label>
                        <span className="text-sm font-medium">{userCount[0]} users</span>
                      </div>
                      <Slider
                        value={userCount}
                        onValueChange={pricingModel === 'basic' ? undefined : setUserCount}
                        max={100}
                        min={pricingModel === 'basic' ? 1 : 2}
                        step={1}
                        className={`w-full ${pricingModel === 'basic' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={pricingModel === 'basic'}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{pricingModel === 'basic' ? '1 user' : '2 users'}</span>
                        <span>100+ users</span>
                      </div>
                      {pricingModel === 'basic' && (
                        <p className="text-xs text-gray-600 mt-2">
                          Basic plan is limited to 1 user only. For multiple users, select Small Team plan.
                        </p>
                      )}
                      {pricingModel === 'small-team' && (
                        <p className="text-xs text-gray-600 mt-2">
                          Small Team: $10/month per user (2+ users, billed annually)
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Training Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Optional Training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Building2 className="h-5 w-5 text-nebusis-primary" />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <Label>Training Days</Label>
                    <span className="text-sm font-medium">{trainingDays[0]} days</span>
                  </div>
                  <Slider
                    value={trainingDays}
                    onValueChange={setTrainingDays}
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>No training</span>
                    <span>10 days</span>
                  </div>
                </div>
              </div>
              
              {trainingDays[0] > 0 && (
                <div className="space-y-3">
                  <Label>Training Session Type</Label>
                  <Select value={trainingType} onValueChange={(value: 'quarter' | 'half' | 'full') => setTrainingType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarter">Quarter Day (25% cost)</SelectItem>
                      <SelectItem value="half">Half Day (50% cost)</SelectItem>
                      <SelectItem value="full">Full Day (100% cost)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600">
                    Live instructor-led training. First day: $1,500, subsequent days: $1,000 each.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ComplianceOne Integration Needs */}
          {isComplianceOne && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Integration Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="app-integration"
                    checked={needsAppIntegration}
                    onCheckedChange={setNeedsAppIntegration}
                  />
                  <Label htmlFor="app-integration" className="text-sm">
                    Need integration with other Nebusis® applications
                  </Label>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Integration with other apps requires custom configuration and pricing.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Enterprise Needs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Enterprise Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Multiple Applications Required</Label>
                  <Switch
                    checked={needsMultipleApps}
                    onCheckedChange={setNeedsMultipleApps}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Multiple Sites/Locations</Label>
                  <Switch
                    checked={needsMultipleSites}
                    onCheckedChange={setNeedsMultipleSites}
                  />
                </div>
                
                {isComplianceOne && (
                  <div className="flex items-center justify-between">
                    <Label>Multiple Standards/Complex Requirements</Label>
                    <Switch
                      checked={needsMultipleStandards}
                      onCheckedChange={setNeedsMultipleStandards}
                    />
                  </div>
                )}
              </div>
              
              {shouldShowEnterpriseForm() && (
                <div className="p-4 bg-nebusis-bg rounded-lg">
                  <h4 className="font-medium text-nebusis-primary mb-2">Enterprise Quote Required</h4>
                  <p className="text-sm text-gray-600">
                    Your requirements indicate you need a custom enterprise solution. Please use the "Request Enterprise Quote" button to provide detailed requirements.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quote Summary */}
        <div className="space-y-6">
          {shouldShowEnterpriseForm() ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Enterprise Quote Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-nebusis-primary mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Custom Enterprise Solution</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Your requirements need a tailored enterprise package with custom pricing.
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => setShowEnterpriseForm(true)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Request Enterprise Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {costs.requiresCustomQuote ? 'Budget Estimate' : costs.isEstimate ? 'Pricing Estimate' : 'Quote Summary'}
                </CardTitle>
                {costs.requiresCustomQuote && (
                  <p className="text-sm text-amber-600 mt-1">
                    Custom quote required for this configuration.
                  </p>
                )}
                {costs.isEstimate && !costs.requiresCustomQuote && (
                  <p className="text-sm text-amber-600 mt-1">
                    Pricing estimate - final quote may vary.
                  </p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {costs.setupFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm">Setup Fee (One-time)</span>
                      <span className="text-sm font-medium">${costs.setupFee.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {isComplianceOne ? 'Annual License' : `License (${costs.billingPeriod})`}
                    </span>
                    <span className="text-sm font-medium">
                      ${costs.recurringFee.toLocaleString()}
                      {!isComplianceOne && costs.billingPeriod === 'Monthly' && '/month'}
                      {isComplianceOne && '/year'}
                    </span>
                  </div>

                  {isComplianceOne && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm">Standards ({selectedStandards})</span>
                        <span className="text-sm text-gray-600">
                          {selectedStandards === 1 ? 'Base wizard price' : `+${selectedStandards - 1} additional (50% each)`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Users ({complianceUsers[0]})</span>
                        <span className="text-sm text-gray-600">
                          {complianceUsers[0] <= 3 ? 'Included' : `3 included + ${complianceUsers[0] - 3} additional`}
                        </span>
                      </div>
                    </>
                  )}

                  {!isComplianceOne && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm">Users ({userCount[0]})</span>
                        <span className="text-sm text-gray-600">
                          {pricingModel === 'basic' ? `$15/user/month (annual)` : 
                           userCount[0] <= 10 ? 'Included in team plan' : `10 included + ${userCount[0] - 10} additional`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Pricing Model</span>
                        <span className="text-sm text-gray-600 capitalize">{pricingModel.replace('-', ' ')}</span>
                      </div>
                    </>
                  )}

                  {costs.trainingCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm">
                        Training ({trainingDays[0]} {trainingType} day{trainingDays[0] > 1 ? 's' : ''})
                      </span>
                      <span className="text-sm font-medium">${costs.trainingCost.toLocaleString()}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-medium">{costs.isEstimate ? 'Estimated Total' : 'Total Cost'}</span>
                    <span className="font-bold text-lg text-nebusis-primary">
                      ${costs.total.toLocaleString()}
                      {costs.isEstimate && <span className="text-sm text-amber-600 ml-1">*</span>}
                    </span>
                  </div>

                  {!isComplianceOne && pricingModel === 'small-team' && (
                    <div className="text-center text-sm text-gray-600">
                      Annual recurring: ${costs.recurringFee.toLocaleString()}/year
                    </div>
                  )}

                  {pricingModel === 'basic' && (
                    <div className="text-center text-sm text-gray-600">
                      Annual billing required for basic plan
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-4">
                  {costs.requiresCustomQuote ? (
                    <>
                      <Button 
                        onClick={() => setShowEnterpriseForm(true)}
                        className="w-full"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Request Custom Quote
                      </Button>
                      <Button onClick={generateQuote} variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Estimate
                      </Button>
                    </>
                  ) : costs.isEstimate ? (
                    <>
                      <Button onClick={generateQuote} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generate Quote
                      </Button>
                      <Button onClick={addToCart} variant="outline" className="w-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <p className="text-xs text-amber-600 text-center">
                        Pricing estimate - final quote may vary
                      </p>
                    </>
                  ) : (
                    <>
                      <Button onClick={generateQuote} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generate Quote
                      </Button>
                      <Button onClick={addToCart} variant="outline" className="w-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Implementation Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Implementation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-nebusis-primary" />
                <span className="text-sm">
                  {isComplianceOne ? 'Setup: 5-10 business days' : 'Setup: 24-48 hours'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-nebusis-primary" />
                <span className="text-sm">Optional training available</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-nebusis-primary" />
                <span className="text-sm">Dedicated customer success</span>
              </div>
              {isComplianceOne && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-nebusis-primary" />
                  <span className="text-sm">Compliance consultation included</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enterprise Quote Modal */}
      <Dialog open={showEnterpriseForm} onOpenChange={setShowEnterpriseForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enterprise Quote Request</DialogTitle>
          </DialogHeader>
          <EnterpriseQuoteForm 
            onSuccess={() => setShowEnterpriseForm(false)}
            preselectedApplications={[applicationName]}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}