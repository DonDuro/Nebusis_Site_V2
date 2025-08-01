import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { ChevronDown } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.hasDropdown ? (
              <>
                <NavigationMenuTrigger 
                  className={`text-gray-700 hover:bg-nebusis-primary hover:text-white transition-colors font-medium px-3 py-2 rounded-md ${
                    location.startsWith(item.href) ? 'text-nebusis bg-nebusis-bg' : ''
                  }`}
                >
                  {item.label}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4">
                    <div className="grid gap-2">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <NavigationMenuLink key={dropdownItem.label} asChild>
                          <Link
                            href={dropdownItem.href}
                            className="block p-3 rounded-lg hover:bg-nebusis-primary hover:text-white transition-colors"
                          >
                            <div className="font-medium text-gray-900">
                              {dropdownItem.label}
                            </div>
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
                  className={`text-gray-700 hover:bg-nebusis-primary hover:text-white transition-colors font-medium px-3 py-2 rounded-md ${
                    location === item.href ? 'text-nebusis bg-nebusis-bg' : ''
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
  );
}
