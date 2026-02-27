
"use client";

import Link from "next/link";
import { Recycle, User, Menu, ShoppingBag, Truck, Search, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push("/");
    }
  };

  const navLinks = [
    { href: "/book", label: "Book Pickup", icon: Truck },
    { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
    { href: "/ai-assistant", label: "Recycling Guide", icon: Search },
    { href: "/dashboard", label: "My Profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg transition-transform group-hover:rotate-12">
            <Recycle className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">
            Scrapio
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link href="/collector">
              Collector Portal
            </Link>
          </Button>
          {user ? (
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          ) : (
            <Button size="sm" className="gap-2" asChild>
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="pb-4 border-b">
                   <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Menu</p>
                   {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 py-3 text-lg font-medium hover:text-primary transition-colors"
                    >
                      <link.icon className="h-5 w-5 text-primary" />
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Portals</p>
                  <Button className="w-full justify-start gap-3" variant="outline" asChild>
                     <Link href="/collector" onClick={() => setIsOpen(false)}>
                      <Truck className="h-5 w-5" /> Collector Portal
                    </Link>
                  </Button>
                  
                  {user ? (
                    <Button className="w-full justify-start gap-3 text-destructive" variant="ghost" onClick={handleSignOut}>
                      <LogOut className="h-5 w-5" /> Sign Out
                    </Button>
                  ) : (
                    <Button className="w-full justify-start gap-3" asChild>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <User className="h-5 w-5" /> Sign In
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
