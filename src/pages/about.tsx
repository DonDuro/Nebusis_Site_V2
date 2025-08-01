import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Users, Award, Globe, ArrowRight,
  Building, Calendar, Target
} from "lucide-react";
// Asset path updated for static deployment

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-nebusis-primary to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Nebusis<span className="text-yellow-400">®</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-3xl">
              Empowering organizations with intelligent automation and compliance solutions
            </p>
            
            {/* 3-Box Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Our Mission</h3>
                </div>
                <p className="text-blue-100">Simplifying complex business processes through intelligent automation and AI-powered solutions</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Global Reach</h3>
                </div>
                <p className="text-blue-100">Serving organizations worldwide with comprehensive business automation solutions</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Excellence</h3>
                </div>
                <p className="text-blue-100">Committed to delivering world-class solutions with exceptional quality and support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    From pioneering ISO compliance services in 1993 to leading the digital transformation of management systems today, 
                    Nebusis® represents over three decades of expertise in intelligent automation and regulatory excellence.
                  </p>
                </div>

                {/* Company Timeline */}
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-8 border-l-4 border-nebusis-primary">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-nebusis-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">1993</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">The Foundation of QSI Global Ventures</h3>
                        <p className="text-gray-700 leading-relaxed">
                          QSI is established in New Jersey to help organizations implement ISO-based quality management systems. 
                          It quickly grows into a leader in continual improvement, compliance, and training services throughout 
                          North America, primarily in the Northeast, the Caribbean, and Latin America. The company finds a special 
                          niche servicing the offshore operations of major US companies that had operations in Puerto Rico, Mexico, 
                          Costa Rica, and the Dominican Republic.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8 border-l-4 border-gray-400">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">1999</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Regional Expansion and Industry Specialization</h3>
                        <p className="text-gray-700 leading-relaxed">
                          By this time, QSI had serviced companies in almost every country in North, Central, South America 
                          and the Caribbean. The company solidifies its position as a trusted provider of ISO 9001 and ISO 14001 
                          implementation and auditing services for multinational corporations and government institutions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 border-l-4 border-purple-500">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">2000s</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Expansion and Fortune 500 Partnerships</h3>
                        <p className="text-gray-700 leading-relaxed">
                          By the mid-2000s, the company had already established a strong global presence, having delivered training, 
                          auditing, and certification services to more than 100 Fortune 500 companies across over 12 countries spanning 
                          the Far East, Europe, and the Americas. Its client portfolio included globally recognized organizations 
                          and institutions such as The Coca-Cola Corporation, various U.S. embassies, the Panama Canal Authority, 
                          and Intel Corporation. This international experience and trusted service delivery laid the foundation for 
                          the launch of Nebusis Cloud Services, LLC in 2017, bringing decades of management systems expertise into 
                          the digital era through advanced, standards-based technology solutions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-8 border-l-4 border-yellow-500">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">2017</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Launch of Nebusis® Cloud Services, LLC</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Nebusis® is formed as a dedicated technology company focused on digital transformation of management systems. 
                          The first 5 years were dedicated to developing the solutions and validating them via the QSI Global Ventures 
                          affiliates. The goal: replace static, paper-based compliance systems with intelligent, scalable software applications.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-8 border-l-4 border-teal-500">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">2022</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Public Launch of Nebusis® Management System</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Nebusis® officially launches to the public the Nebusis® Management System wizard for facilitating 
                          ISO 9001, ISO 27001, ISO 14001 and similar management system standards. This marks the transition 
                          from development and validation phase to commercial availability of intelligent compliance solutions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-nebusis-primary/10 to-blue-50 rounded-lg p-8 border-l-4 border-nebusis-primary">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-nebusis-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">2024</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Transformation Leadership and Major Partnerships</h3>
                        <p className="text-gray-700 leading-relaxed">
                          By 2024, Nebusis Cloud Services, LLC had reached significant milestones in its mission to lead digital 
                          transformation for compliance and management systems. A notable achievement was the delivery of advanced 
                          digital solutions to PepsiCo, supporting the full digitalization of its Environmental, Health & Safety (EHS) 
                          management system to ensure compliance with ISO 14001 and ISO 45001 standards. Nebusis also partnered with 
                          QSI Academy to support Google Corporation, providing digital transformation support and the global rollout 
                          of specialized security training programs for its international security workforce. Additionally, Nebusis 
                          played a strategic role in assisting the Government of the Dominican Republic with the digital transformation 
                          of its military and border control operations, helping to modernize and strengthen institutional capabilities 
                          in critical national security functions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">Our Founder</h2>
                
                <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 text-left">
                  <div className="flex-shrink-0">
                    <img 
                      src={celsoProfilePath} 
                      alt="Dr. Celso Alvarado" 
                      className="w-48 h-48 rounded-lg object-cover shadow-lg"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Dr. Celso Alvarado</h3>
                      <p className="text-lg text-nebusis-primary font-medium">
                        Founder & CEO, Nebusis® Cloud Services, LLC
                      </p>
                    </div>
                    
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Dr. Celso Alvarado is the founder of Nebusis® Cloud Services, LLC and a global authority on 
                        ISO management systems, digital transformation, and regulatory modernization.
                      </p>
                      
                      <p>
                        He holds a Ph.D. in Industrial Engineering with a specialization in management systems and 
                        emerging technologies such as artificial intelligence, blockchain, cloud computing, and cybersecurity. 
                        His extensive international experience spans more than 50 countries, where he has helped both 
                        governments and Fortune 500 companies transition to more resilient, compliant, and efficient operations.
                      </p>
                      
                      <p>
                        Dr. Alvarado has represented the United States on multiple ISO technical committees and contributed 
                        to the development of global standards in the fields of quality, sustainability, and security. 
                        He is also a Professor of Innovation and Entrepreneurship at New York University (NYU), and a 
                        frequent speaker on technology, governance, and enterprise innovation.
                      </p>
                      
                      <p className="font-medium text-gray-900">
                        Through Nebusis® Cloud Services, LLC, Dr. Alvarado brings together decades of hands-on experience 
                        and a bold vision for the future: intelligent compliance, built on trust, delivered through technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Client Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">Our Clients</h2>
                
                <div className="bg-gray-50 rounded-lg p-8">
                  <Building className="h-16 w-16 text-nebusis-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Trusted by Organizations Worldwide</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Government & Public Sector</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Federal agencies implementing ISO 27001 cybersecurity frameworks</li>
                        <li>• Municipal governments modernizing quality management systems</li>
                        <li>• International organizations streamlining compliance processes</li>
                        <li>• Public institutions across the Americas and Europe</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Fortune 500 & Multinational Corporations</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Manufacturing companies implementing ISO 9001 and ISO 14001</li>
                        <li>• Healthcare organizations ensuring regulatory compliance</li>
                        <li>• Financial services firms strengthening operational controls</li>
                        <li>• Technology companies scaling governance frameworks</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-3xl font-bold text-nebusis-primary mb-2">50+</div>
                        <div className="text-gray-600">Countries Served</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-nebusis-primary mb-2">30+</div>
                        <div className="text-gray-600">Years of Experience</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-nebusis-primary mb-2">3</div>
                        <div className="text-gray-600">Continents</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover how Nebusis® can help streamline your operations and achieve compliance excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-nebusis-primary hover:bg-nebusis-primary/90 text-white">
              <Link href="/business-suite">
                Explore Our Solutions
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-nebusis-primary text-nebusis-primary hover:bg-nebusis-primary hover:text-white">
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}