import { useState, useEffect } from "react";
import { Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Briefcase, 
  Factory, 
  Zap, 
  GraduationCap,

  CheckCircle
} from "lucide-react";
// Asset path updated for static deployment
// Asset path updated for static deployment
// Asset path updated for static deployment
// Asset path updated for static deployment

// Professional carousel slides data
const CAROUSEL_SLIDES = [
  {
    id: 'business-apps',
    title: 'Business Apps',
    subtitle: '20+ Intelligent Applications',
    description: 'Comprehensive SaaS applications covering compliance, finance, HR, legal, operations, and communication for complete digital transformation.',
    cta: 'Explore Business Apps',
    href: '/business-suite',
    image: (
      <img 
        src={businessAppsImage} 
        alt="Business Apps Professional Team" 
        className="w-full h-full object-cover"
      />
    ),
    stats: ['ComplianceOne Live', '22 Apps in Development', 'AI-Powered Automation'],
    highlights: ['ISO Compliance Management', 'Financial Operations', 'HR & Workforce Management', 'Legal & Contract Management']
  },
  {
    id: 'sector-suites',
    title: 'Sector Suites',
    subtitle: '11 Industry-Specific Bundles',
    description: 'Tailored application bundles designed for specific industries including healthcare, manufacturing, government, and retail sectors.',
    cta: 'View Sector Suites',
    href: '/sector-suites',
    image: (
      <img 
        src={sectorSuitesImage} 
        alt="Sector Suites Healthcare Professional" 
        className="w-full h-full object-cover"
      />
    ),
    stats: ['11 Industry Bundles', 'Specialized Applications', 'Compliance Focused'],
    highlights: ['Healthcare & Life Sciences', 'Manufacturing & Industrial', 'Financial Services', 'Government & Public Sector']
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    subtitle: 'Strategic Consulting Services',
    description: 'Expert consulting for digital transformation, custom development, system integration, and strategic technology planning.',
    cta: 'Learn About Services',
    href: '/digital-transformation',
    image: (
      <img 
        src={digitalTransformationImage} 
        alt="Digital Transformation Professional" 
        className="w-full h-full object-cover"
      />
    ),
    stats: ['Strategic Planning', 'Custom Development', 'System Integration'],
    highlights: ['Legacy System Modernization', 'Digital Strategy Development', 'Technology Architecture', 'Process Automation']
  },
  {
    id: 'training-certification',
    title: 'Training & Certification',
    subtitle: '16 Professional Programs',
    description: 'ISO/IEC 17024 compliant certification programs covering compliance, digital transformation, AI, and business management.',
    cta: 'View Training Programs',
    href: '/certifications',
    image: (
      <img 
        src={trainingCertificationImage} 
        alt="E-Learning Training Professional" 
        className="w-full h-full object-cover"
      />
    ),
    stats: ['ISO/IEC 17024 Compliant', '16 Hour Programs', '$295 Per Program'],
    highlights: ['Business Process Management', 'AI Assessment Specialist', 'Digital Transformation Expert', 'Compliance Technology Specialist']
  }
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 8000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollTo = (index: number) => emblaApi && emblaApi.scrollTo(index);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative h-screen overflow-hidden">
        <div ref={emblaRef} className="h-full">
          <div className="flex h-full">
            {CAROUSEL_SLIDES.map((slide, index) => (
              <div key={slide.id} className="relative flex-none w-full h-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                  {slide.image}
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="text-left text-white max-w-2xl bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                      <Badge className="bg-nebusis-primary/90 text-white px-4 py-2 text-sm font-semibold mb-6 inline-block shadow-lg">
                        {slide.subtitle}
                      </Badge>
                      
                      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        <span className="text-white">Nebusis</span><span className="text-yellow-400">®</span>
                        <br />
                        <span className="text-white">{slide.title}</span>
                      </h1>
                      
                      <p className="text-lg md:text-xl mb-8 text-gray-100 leading-relaxed">
                        {slide.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex flex-wrap gap-3 mb-8">
                        {slide.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg shadow-md">
                            <span className="font-semibold text-sm">{stat}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* CTA Button */}
                      <Button asChild size="lg" className="bg-nebusis-primary hover:bg-nebusis-primary/90 text-white font-bold text-lg px-8 py-4 shadow-xl mb-8">
                        <Link href={slide.href}>
                          {slide.cta}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      
                      {/* Key Highlights */}
                      <div className="grid grid-cols-2 gap-3 max-w-lg">
                        {slide.highlights.map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className="flex items-center text-sm bg-white/10 px-3 py-2 rounded-lg">
                            <CheckCircle className="h-4 w-4 mr-2 text-yellow-400 flex-shrink-0" />
                            <span className="text-white">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="bg-white bg-opacity-20 backdrop-blur-sm border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="bg-white bg-opacity-20 backdrop-blur-sm border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-3">
            {CAROUSEL_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Slide Navigation Labels */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-8">
            {CAROUSEL_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => scrollTo(index)}
                className={`text-sm font-medium transition-all duration-300 drop-shadow-sm ${
                  index === selectedIndex 
                    ? 'text-white font-bold' 
                    : 'text-white/70 hover:text-white/90'
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Digital Transformation Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From intelligent applications to expert consulting, Nebusis<span className="text-yellow-400">®</span> provides everything your organization needs for comprehensive digital transformation.
            </p>
          </div>
          
          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300">
              <div className="w-20 h-20 bg-nebusis-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Briefcase className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-3">20+</div>
              <div className="text-gray-600 font-medium">Business Applications</div>
            </div>
            <div className="text-center bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300">
              <div className="w-20 h-20 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Factory className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-3">11</div>
              <div className="text-gray-600 font-medium">Industry Sector Suites</div>
            </div>
            <div className="text-center bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300">
              <div className="w-20 h-20 bg-nebusis-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-3">7</div>
              <div className="text-gray-600 font-medium">Transformation Services</div>
            </div>
            <div className="text-center bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300">
              <div className="w-20 h-20 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-3">16</div>
              <div className="text-gray-600 font-medium">Training Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-nebusis-primary text-white px-6 py-3 text-sm font-semibold mb-8 shadow-lg">
                ✓ Now Available
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Start with Nebusis<span className="text-yellow-400">®</span> ComplianceOne
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Our flagship application is live and ready to transform your compliance management. 
                Powered by AI-driven Management System Wizards supporting ISO 9001, ISO/IEC 27001, 
                ISO/IEC 42001, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" className="bg-nebusis-primary hover:bg-nebusis-primary/90 text-white px-8 py-4 text-lg font-semibold shadow-lg">
                  <Link href="/business-suite/complianceone">
                    Explore ComplianceOne
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  <Link href="/demos">
                    Request Demo
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200">
              <div className="space-y-8">
                {/* Key Features */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose ComplianceOne?</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-nebusis-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">AI</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Management System Wizards</h4>
                        <p className="text-gray-600">Automated guidance for ISO 9001, ISO/IEC 27001, ISO/IEC 42001, and more</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-nebusis-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">13</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Comprehensive 13-Module System</h4>
                        <p className="text-gray-600">Complete compliance management from planning to continuous improvement</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-nebusis-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Simplify ISO Certification</h4>
                        <p className="text-gray-600">Streamline the achievement and maintenance of ISO certifications with automated workflows</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <h4 className="font-bold text-gray-900 mb-3">Ready to Get Started?</h4>
                  <p className="text-gray-600 mb-4">Transform your compliance management with our flagship solution</p>
                  <Button asChild className="bg-nebusis-primary hover:bg-nebusis-primary/90 text-white font-semibold">
                    <Link href="/business-suite/complianceone">
                      Learn More About ComplianceOne
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-nebusis-primary to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join leading organizations that trust Nebusis<span className="text-yellow-400">®</span> for their digital transformation journey.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-white text-nebusis-primary hover:bg-gray-100 font-bold px-10 py-4 text-lg shadow-xl">
              <Link href="/business-suite">
                Start with Business Apps
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}