"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Header1() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { title: "Events", href: "/events" },
    { title: "Alumni", href: "/alumni" },
    { title: "Workshop", href: "/workshop" },
    { title: "About Us", href: "/about-us" },
    { title: "Our Team", href: "/team" },
    { title: "Contact Us", href: "/contact" },
  ];

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "py-2" : "py-4"
    )}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className={cn(
          "rounded-full border border-white/10 transition-all duration-300",
          isScrolled ? "bg-black/50" : "bg-black/20",
          "backdrop-blur-md"
        )}>
          <div className="flex items-center justify-between px-4 py-2">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="IEEE Logo" 
                width={40} 
                height={40} 
                className="transition-transform duration-300 hover:scale-110"
                priority 
              />
              <span className="font-semibold text-white hidden sm:block">
                 BIT Mesra
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-1">
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink>
                          <Button 
                            variant="ghost" 
                            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full px-4"
                          >
                            {item.title}
                          </Button>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              <Button 
                variant="default" 
                className="ml-4 bg-blue-500 hover:bg-blue-600 rounded-full"
              >
                Join Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              onClick={() => setOpen(!isOpen)}
              className="lg:hidden text-white/70 hover:text-white hover:bg-white/10"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden border-t border-white/10">
              <nav className="flex flex-col gap-2 p-4">
                {navigationItems.map((item) => (
                  <Link 
                    key={item.title}
                    href={item.href}
                    className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.title}</span>
                    <MoveRight className="w-4 h-4 opacity-50" />
                  </Link>
                ))}
                <Button 
                  variant="default" 
                  className="mt-2 bg-blue-500 hover:bg-blue-600 rounded-lg w-full"
                >
                  Join Us
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Header1 };
