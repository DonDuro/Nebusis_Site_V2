import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { 
  ShoppingCart, Globe, Menu
} from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
// Asset path for static deployment
const nebusisLogoPath = "/assets/Nebusis Logo_1751572759736.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [location, setLocation] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  // Dynamic translation for navigation items
  const getNavigationItems = () => {
    return NAVIGATION_ITEMS.map(item => {
      let translatedLabel = item.label;
      
      // Translate main navigation labels
      switch(item.label) {
        case 'Business Apps':
          translatedLabel = t('nav.business-apps');
          break;
        case 'Sector Suites':
          translatedLabel = t('nav.sector-suites');
          break;
        case 'Digital Transformation':
          translatedLabel = t('nav.digital-transformation');
          break;
        case 'Training and Certification':
        case 'Nebusis® Training':
        case 'Nebusis® Academy':
          translatedLabel = t('nav.training-certification');
          break;
        case 'Video Gallery':
          translatedLabel = t('nav.video-gallery');
          break;
        case 'Blog':
          translatedLabel = t('nav.blog');
          break;
        case 'Support':
          translatedLabel = t('nav.support');
          break;
      }
      
      return {
        ...item,
        label: translatedLabel
      };
    });
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-nebusis py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600">{t('common.language')}:</span>
                <select 
                  className="bg-transparent text-gray-700 border-none focus:outline-none text-sm"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                >
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                  <option value="fr">FR</option>
                  <option value="pt">PT</option>
                  <option value="ar">AR</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-400 cursor-not-allowed flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {t('nav.cart')} (0)
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming Soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img 
                  src={nebusisLogoPath} 
                  alt="Nebusis Logo" 
                  className="h-10 w-auto max-w-none" 
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  {getNavigationItems().map((item) => (
                    <NavigationMenuItem key={item.label}>
                      {item.hasDropdown ? (
                        <>
                          <NavigationMenuTrigger className="text-gray-700 hover:bg-nebusis-primary hover:!text-white transition-colors !text-sm font-medium h-10 px-4 rounded-md">
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-[400px] p-4">
                              <div className="grid gap-2">
                                {item.dropdownItems?.map((dropdownItem) => (
                                  <NavigationMenuLink key={dropdownItem.label} asChild>
                                    <Link
                                      href={dropdownItem.href}
                                      className="block p-3 rounded-lg hover:bg-nebusis-primary hover:!text-white transition-colors"
                                    >
                                      <div className="font-medium">{dropdownItem.label}</div>
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link 
                            href={item.href}
                            className={`text-gray-700 hover:bg-nebusis-primary hover:!text-white transition-colors !text-sm font-medium h-10 px-4 flex items-center rounded-md ${
                              location === item.href ? 'text-nebusis' : ''
                            }`}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* CTA Buttons - Authentication removed for static site */}
            <div className="flex items-center space-x-4">

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col space-y-6 mt-6">
                    {/* Navigation Items */}
                    {getNavigationItems().map((item) => (
                      <div key={item.label}>
                        <Link 
                          href={item.href}
                          className="block text-lg font-medium text-gray-900 hover:text-nebusis transition-colors"
                        >
                          {item.label}
                        </Link>
                        {item.hasDropdown && item.dropdownItems && (
                          <div className="ml-4 mt-2 space-y-2">
                            {item.dropdownItems.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                href={dropdownItem.href}
                                className="block text-sm text-gray-600 hover:text-nebusis transition-colors"
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
