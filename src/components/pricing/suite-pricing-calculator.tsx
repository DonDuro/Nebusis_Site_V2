import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, Calculator, Users, Calendar, Play, ShoppingCart } from 'lucide-react';
import SuiteDemoRequestDialog from '../forms/suite-demo-request-dialog';
import SuiteQuoteRequestDialog from '../forms/suite-quote-request-dialog';

// Training options with service limits - pricing above limits requires custom quote
const TRAINING_OPTIONS = [
  { id: 'basic', name: 'Basic Training Package', price: 2500, description: 'Essential remote training for core features', limit: 'Up to 15 students, 2 training days' },
  { id: 'comprehensive', name: 'Comprehensive Training Package', price: 5000, description: 'Complete remote training for all features', limit: 'Up to 25 students, 5 training days' },
  { id: 'custom', name: 'Custom Training Program', price: 7500, description: 'Tailored remote training for specific needs', limit: 'Up to 20 students, 4 training days' },
  { id: 'certification', name: 'Certification Program', price: 3500, description: 'Official remote certification for your team', limit: 'Up to 12 students, 3 training days' }
];

// Project support services with scope limits
const PROJECT_SUPPORT = [
  { id: 'setup', name: 'Setup & Configuration', price: 3000, description: 'Professional remote setup and configuration', limit: '5 service days, standard config' },
  { id: 'integration', name: 'System Integration', price: 5000, description: 'Custom remote integrations with existing systems', limit: '8 service days, up to 3 systems' },
  { id: 'migration', name: 'Data Migration', price: 4000, description: 'Remote data migration from existing systems', limit: '6 service days, up to 100GB data' },
  { id: 'consulting', name: 'Implementation Consulting', price: 6000, description: 'Expert remote guidance throughout implementation', limit: '10 service days, 40 consulting hours' }
];

interface SuitePricingData {
  starter: { 
    price: number; 
    setupFee?: number;
    features: string[]; 
  };
  professional: { 
    price: number; 
    setupFee?: number;
    features: string[]; 
  };
  enterprise: { 
    price: string; 
    features: string[]; 
  };
}

interface SuitePricingCalculatorProps {
  suiteName: string;
  pricing: SuitePricingData;
  onRequestQuote?: (data: any) => void;
  onRequestDemo?: () => void;
}

export default function SuitePricingCalculator({ 
  suiteName, 
  pricing, 
  onRequestQuote, 
  onRequestDemo 
}: SuitePricingCalculatorProps) {
  const [selectedTier, setSelectedTier] = useState<'starter' | 'professional' | 'enterprise'>('professional');
  const [userCount, setUserCount] = useState<string>('25');
  const [contractLength, setContractLength] = useState<string>('1');
  const [trainingOptions, setTrainingOptions] = useState<string[]>([]);
  const [projectSupport, setProjectSupport] = useState<string[]>([]);

  const currentTierData = pricing[selectedTier];
  
  // Calculate total cost based on selections
  const calculateTotalCost = () => {
    if (selectedTier === 'enterprise') {
      return { type: 'quote', message: 'Custom Quote Required' };
    }

    const basePrice = currentTierData.price as number;
    const setupFee = ('setupFee' in currentTierData ? currentTierData.setupFee : 0) || 0;
    const contractMultiplier = parseInt(contractLength);
    
    // Apply user-based pricing adjustments
    let userMultiplier = 1;
    const users = parseInt(userCount);
    
    if (selectedTier === 'starter') {
      if (users > 25) userMultiplier = 1.5;
    } else if (selectedTier === 'professional') {
      if (users > 100) userMultiplier = 1.3;
      else if (users > 50) userMultiplier = 1.15;
    }

    // Apply contract length discounts
    let discount = 0;
    if (contractMultiplier >= 3) discount = 0.15; // 15% off for 3+ years
    else if (contractMultiplier >= 2) discount = 0.10; // 10% off for 2+ years

    const adjustedPrice = basePrice * userMultiplier;
    const discountedPrice = adjustedPrice * (1 - discount);
    const totalAnnual = discountedPrice * contractMultiplier;
    
    // Calculate training costs
    const trainingCosts = trainingOptions.reduce((sum, optionId) => {
      const option = TRAINING_OPTIONS.find(t => t.id === optionId);
      return sum + (option?.price || 0);
    }, 0);
    
    // Calculate project support costs
    const supportCosts = projectSupport.reduce((sum, optionId) => {
      const option = PROJECT_SUPPORT.find(s => s.id === optionId);
      return sum + (option?.price || 0);
    }, 0);
    
    const totalWithSetup = totalAnnual + setupFee + trainingCosts + supportCosts;

    return {
      type: 'price',
      basePrice: adjustedPrice,
      discountedPrice,
      totalAnnual,
      setupFee,
      trainingCosts,
      supportCosts,
      totalWithSetup,
      discount,
      savings: contractMultiplier > 1 ? (adjustedPrice * contractMultiplier) - totalAnnual : 0
    };
  };

  const cost = calculateTotalCost();

  const handleRequestQuote = () => {
    const quoteData = {
      suiteName,
      tier: selectedTier,
      userCount: parseInt(userCount),
      contractLength: parseInt(contractLength),
      ...(cost.type === 'price' ? {
        estimatedCost: cost.totalWithSetup,
        annualCost: cost.discountedPrice,
        setupFee: cost.setupFee
      } : {})
    };
    
    onRequestQuote?.(quoteData);
  };

  return (
    <div className="space-y-6">
      {/* Tier Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Suite Pricing Calculator
          </CardTitle>
          <CardDescription>
            Configure your {suiteName} to see estimated pricing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tier Selection */}
          <div>
            <Label className="text-base font-medium">Select Plan</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {Object.entries(pricing).map(([tier, details]) => (
                <Card 
                  key={tier}
                  className={`cursor-pointer transition-all ${
                    selectedTier === tier 
                      ? 'border-blue-500 border-2 bg-blue-50' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTier(tier as any)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg capitalize">{tier}</CardTitle>
                      {tier === 'professional' && (
                        <Badge variant="secondary">Popular</Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {typeof details.price === 'string' ? details.price : `$${details.price.toLocaleString()}`}
                      {typeof details.price === 'number' && <span className="text-sm font-normal text-gray-600">/year</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1">
                      {details.features.slice(0, 3).map((feature: string, index: number) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {selectedTier !== 'enterprise' && (
            <>
              {/* User Count Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="userCount" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Number of Users
                  </Label>
                  <Select value={userCount} onValueChange={setUserCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 users</SelectItem>
                      <SelectItem value="25">25 users</SelectItem>
                      <SelectItem value="50">50 users</SelectItem>
                      <SelectItem value="75">75 users</SelectItem>
                      <SelectItem value="100">100 users</SelectItem>
                      <SelectItem value="150">150 users</SelectItem>
                      <SelectItem value="200">200+ users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Contract Length */}
                <div>
                  <Label htmlFor="contractLength" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Contract Length
                  </Label>
                  <Select value={contractLength} onValueChange={setContractLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contract length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="2">2 years (10% discount)</SelectItem>
                      <SelectItem value="3">3 years (15% discount)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Training Options */}
              <div>
                <h4 className="font-semibold mb-2">Training Options (Optional)</h4>
                <p className="text-sm text-blue-600 mb-4">All training services are delivered remotely via secure video conferencing</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TRAINING_OPTIONS.map(option => (
                    <div key={option.id} className="flex items-start space-x-3">
                      <Checkbox 
                        id={`training-${option.id}`}
                        checked={trainingOptions.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setTrainingOptions([...trainingOptions, option.id]);
                          } else {
                            setTrainingOptions(trainingOptions.filter(id => id !== option.id));
                          }
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor={`training-${option.id}`} className="text-sm font-medium cursor-pointer">
                          {option.name}
                        </Label>
                        <p className="text-sm text-gray-600">{option.description}</p>
                        <p className="text-xs text-gray-500 mb-1">{option.limit}</p>
                        <p className="text-sm font-semibold text-blue-600">${option.price.toLocaleString()}</p>
                        <p className="text-xs text-orange-600 mt-1">Additional students or days require custom quote</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Support Services */}
              <div>
                <h4 className="font-semibold mb-2">Project Support Services (Optional)</h4>
                <p className="text-sm text-blue-600 mb-4">All project support services are delivered remotely by certified specialists</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROJECT_SUPPORT.map(option => (
                    <div key={option.id} className="flex items-start space-x-3">
                      <Checkbox 
                        id={`support-${option.id}`}
                        checked={projectSupport.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProjectSupport([...projectSupport, option.id]);
                          } else {
                            setProjectSupport(projectSupport.filter(id => id !== option.id));
                          }
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor={`support-${option.id}`} className="text-sm font-medium cursor-pointer">
                          {option.name}
                        </Label>
                        <p className="text-sm text-gray-600">{option.description}</p>
                        <p className="text-xs text-gray-500 mb-1">{option.limit}</p>
                        <p className="text-sm font-semibold text-blue-600">${option.price.toLocaleString()}</p>
                        <p className="text-xs text-orange-600 mt-1">Additional days or scope require custom quote</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-4">Cost Breakdown</h4>
                <div className="space-y-3">
                  {cost.type === 'price' && 'basePrice' in cost && (
                    <>
                      <div className="flex justify-between">
                        <span>Annual License ({userCount} users)</span>
                        <span>${cost.basePrice.toLocaleString()}</span>
                      </div>
                      {cost.discount && cost.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Multi-year discount ({(cost.discount * 100).toFixed(0)}%)</span>
                          <span>-${cost.savings?.toLocaleString() || '0'}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Total Contract Value ({contractLength} year{contractLength !== '1' ? 's' : ''})</span>
                        <span className="font-semibold">${cost.totalAnnual?.toLocaleString() || '0'}</span>
                      </div>
                      {cost.setupFee && cost.setupFee > 0 && (
                        <div className="flex justify-between">
                          <span>One-time Setup Fee</span>
                          <span>${cost.setupFee.toLocaleString()}</span>
                        </div>
                      )}
                      {cost.trainingCosts && cost.trainingCosts > 0 && (
                        <div className="flex justify-between">
                          <span>Training Services</span>
                          <span>${cost.trainingCosts.toLocaleString()}</span>
                        </div>
                      )}
                      {cost.supportCosts && cost.supportCosts > 0 && (
                        <div className="flex justify-between">
                          <span>Project Support Services</span>
                          <span>${cost.supportCosts.toLocaleString()}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Estimate</span>
                        <span className="text-blue-600">${cost.totalWithSetup?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Monthly equivalent: ${((cost.totalWithSetup || 0) / (parseInt(contractLength) * 12)).toLocaleString()}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {selectedTier === 'enterprise' && (
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <h4 className="font-semibold text-blue-900 mb-2">Enterprise Custom Quote</h4>
              <p className="text-blue-700 mb-4">
                Enterprise solutions are customized based on your specific requirements, user count, and integration needs.
              </p>
              <div className="text-sm text-blue-600">
                Includes: Unlimited users, custom modules, dedicated support, and on-site training
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <SuiteQuoteRequestDialog 
              suiteName={suiteName}
              initialData={cost.type === 'price' ? {
                userCount: parseInt(userCount),
                contractLength: parseInt(contractLength)
              } : undefined}
            >
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {selectedTier === 'enterprise' ? 'Request Custom Quote' : 'Get Detailed Quote'}
              </Button>
            </SuiteQuoteRequestDialog>
            <SuiteDemoRequestDialog suiteName={suiteName}>
              <Button variant="outline" className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                Request Demo
              </Button>
            </SuiteDemoRequestDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}