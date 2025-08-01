import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, Star, Users, BarChart3, Settings, ArrowRight, Store } from 'lucide-react';
import { Link } from 'wouter';

export default function BodegaMonsterDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-white bg-opacity-5 rounded-full"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Store className="h-5 w-5 text-blue-200" />
              <span className="font-semibold">Small Retail Solution</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Nebusis® <span className="text-blue-200">BodegaMonster</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-4xl leading-relaxed">
              A powerful, all-in-one platform to digitize and streamline your store operations
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <div className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Nebusis® BodegaMonster is a comprehensive, cloud-based software solution designed specifically for small and medium-sized retail food businesses—such as convenience stores, neighborhood markets, bodegas, and independent supermarkets.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Built on the robust architecture of the Nebusis® Business Suite, BodegaMonster integrates essential business functions into a single, easy-to-use platform. From inventory and financial management to staff scheduling and customer loyalty, this solution empowers store owners to modernize operations, reduce inefficiencies, and boost profitability.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Modules Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Modules and Functionality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SmartBooks Module */}
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Nebusis® SmartBooks</CardTitle>
                    <CardDescription>Financial Management and Accounting</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• POS-linked sales and cash flow tracking</li>
                  <li>• Real-time profit and loss reports</li>
                  <li>• Tax reporting tools and digital invoicing</li>
                  <li>• Daily earnings snapshots and trend analytics</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">Benefits:</p>
                  <p className="text-sm text-blue-600">Simplifies bookkeeping, improves financial visibility, and helps ensure tax compliance.</p>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Wizard Module */}
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Nebusis® Inventory Wizard</CardTitle>
                    <CardDescription>Inventory and Stock Optimization</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Product tracking with real-time stock levels</li>
                  <li>• Alerts for low stock and expiration dates</li>
                  <li>• Automatic reordering from preferred suppliers</li>
                  <li>• Integrated barcode scanning</li>
                </ul>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">Benefits:</p>
                  <p className="text-sm text-green-600">Reduces waste, prevents stockouts, and ensures better control over inventory.</p>
                </div>
              </CardContent>
            </Card>

            {/* Engage Module */}
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Nebusis® Engage</CardTitle>
                    <CardDescription>Customer Relationship and Loyalty Management</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Loyalty programs and point systems</li>
                  <li>• Targeted promotions via SMS, email, and WhatsApp</li>
                  <li>• Localized marketing campaigns</li>
                  <li>• Customer behavior tracking and analytics</li>
                </ul>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700 font-medium">Benefits:</p>
                  <p className="text-sm text-purple-600">Increases repeat business, boosts sales, and enhances customer retention.</p>
                </div>
              </CardContent>
            </Card>

            {/* PeopleCore Module */}
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Nebusis® PeopleCore</CardTitle>
                    <CardDescription>Staff Management and Payroll</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Shift scheduling and time tracking</li>
                  <li>• Geolocated digital clock-in/out</li>
                  <li>• Payroll automation (weekly, biweekly, or monthly)</li>
                  <li>• Labor compliance notifications and reports</li>
                </ul>
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-700 font-medium">Benefits:</p>
                  <p className="text-sm text-orange-600">Optimizes staffing, reduces admin time, and minimizes labor-related risks.</p>
                </div>
              </CardContent>
            </Card>

            {/* Workflow Engine Module */}
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Settings className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Nebusis® Workflow Engine</CardTitle>
                    <CardDescription>Operations Automation and Task Management</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Opening and closing procedure templates</li>
                  <li>• Cash register reconciliation workflows</li>
                  <li>• Vendor delivery and receiving checklists</li>
                  <li>• Daily operations tracking and staff accountability</li>
                </ul>
                <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                  <p className="text-sm text-teal-700 font-medium">Benefits:</p>
                  <p className="text-sm text-teal-600">Standardizes operations, reduces errors, and enforces consistency.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Advantages Section */}
        <div className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">Key Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Modular Design</h3>
                  <p className="text-gray-600">Tailor the solution to the store's size and needs</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mobile-Compatible</h3>
                  <p className="text-gray-600">Accessible from tablets, phones, or POS systems</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Offline Resilience</h3>
                  <p className="text-gray-600">Core features function even with temporary connectivity loss</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multilingual Interface</h3>
                  <p className="text-gray-600">English and Spanish available</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Best Practice Aligned</h3>
                  <p className="text-gray-600">Built to support quality, compliance, and operational control</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Target Industries Section */}
        <div className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">Target Industries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Ideal Use Cases</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>A small supermarket seeking better inventory control and financial transparency</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>A bodega needing payroll automation and daily cash reconciliation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>A multi-location convenience store rolling out a loyalty program to grow customer retention</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Target Users</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Store className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-blue-700">Independent Supermarkets</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <ShoppingCart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-700">Bodegas & Corner Stores</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-purple-700">Convenience Store Chains</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-orange-700">Franchise Operations</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Store?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of small retail businesses that have modernized their operations with Nebusis® BodegaMonster
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4">
                  Request Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4">
                  Get Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Sector Suites */}
        <div className="text-center mt-8">
          <Button variant="ghost" asChild>
            <Link href="/sector-suites">
              ← Back to Sector Suites
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}