"use client";

import Link from "next/link";
import { Menu, Truck, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function CollectorNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mockUser, setMockUser] = useState(false);
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMockUser(!!localStorage.getItem("scrapio_collector"));
  }, []);

  const handleSignOut = async () => {
    localStorage.removeItem("scrapio_collector");
    setMockUser(false);
    if (auth && user) {
      await signOut(auth);
    }
    router.push("/collector/login");
  };

  const navLinks = [
    { href: "/collector", label: "Live Requests", icon: Truck },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-secondary/10 backdrop-blur supports-[backdrop-filter]:bg-secondary/5 border-secondary/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-secondary p-1.5 rounded-lg transition-transform group-hover:rotate-12 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
            <Truck className="h-6 w-6 text-secondary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-secondary">
            Scrapio<span className="text-muted-foreground text-sm ml-2 hidden sm:inline-block">Collector</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold transition-colors hover:text-secondary flex items-center gap-1.5"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
          <div className="w-px h-6 bg-border mx-2"></div>
          {user || mockUser ? (
            <Button variant="ghost" size="sm" className="gap-2 text-destructive hover:bg-destructive/10" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          ) : (
            <Button size="sm" className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-secondary hover:text-secondary hover:bg-secondary/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-secondary/20">
              <div className="flex flex-col gap-6 mt-8">
                <div className="pb-4 border-b border-white/5">
                   <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Collector Menu</p>
                   {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 py-3 text-lg font-medium hover:text-secondary transition-colors"
                    >
                      <link.icon className="h-5 w-5 text-secondary" />
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {user || mockUser ? (
                    <Button className="w-full justify-start gap-3 text-destructive hover:bg-destructive hover:text-destructive-foreground" variant="outline" onClick={handleSignOut}>
                      <LogOut className="h-5 w-5" /> Sign Out
                    </Button>
                  ) : (
                    <Button className="w-full justify-start gap-3 bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Truck className="h-5 w-5" /> Sign In
                      </Link>
                    </Button>
                  )}
                  <Button className="w-full justify-start gap-3" variant="ghost" asChild>
                     <Link href="/" onClick={() => setIsOpen(false)}>
                      Back to Main Site
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
