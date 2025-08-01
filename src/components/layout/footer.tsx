import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, Globe, Users, UserPlus, Link2, HelpCircle
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
// Asset path for static deployment
const nebusisLogoPath = "/assets/Nebusis Logo_1751572759736.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={nebusisLogoPath} 
                alt="Nebusis Logo" 
                className="h-8 w-auto filter brightness-0 invert" 
              />
            </div>
            <div className="text-gray-400 space-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{COMPANY_INFO.website}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center">
              <Link2 className="h-5 w-5 mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/business-suite" className="text-gray-300 hover:text-white transition-colors">
                  Business Apps
                </Link>
              </li>
              <li>
                <Link href="/sector-suites" className="text-gray-300 hover:text-white transition-colors">
                  Sector Suites
                </Link>
              </li>
              <li>
                <Link href="/digital-transformation" className="text-gray-300 hover:text-white transition-colors">
                  Digital Transformation
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-gray-300 hover:text-white transition-colors">
                  Training & Certification
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/iso-compliance" className="text-gray-300 hover:text-white transition-colors">
                  ISO/IEC 17024 Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Join Us */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Join Us
            </h4>
            <div className="space-y-3">
              <ul className="space-y-2">
                <li>
                  <Link href="/join-us" className="text-gray-300 hover:text-white transition-colors">
                    Career Opportunities
                  </Link>
                </li>
                <li>
                  <Link href="/join-us" className="text-gray-300 hover:text-white transition-colors">
                    Partnership Inquiries
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h5 className="font-semibold text-lg mb-2">Stay Updated</h5>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest news and updates from Nebusis®
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-nebusis text-white hover:bg-[--nebusis-dark]">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 {COMPANY_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
