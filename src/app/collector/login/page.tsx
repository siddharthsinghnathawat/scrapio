"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import CollectorNavbar from "@/components/shared/CollectorNavbar";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CollectorLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCollectorSignIn = () => {
    if (!name.trim() || !email.trim()) {
      toast({ title: "Validation Error", description: "Please enter your name and email.", variant: "destructive" });
      return;
    }
    setLoading(true);
    
    // Store collector data locally
    localStorage.setItem("scrapio_collector", JSON.stringify({ name, email, role: "collector" }));

    setTimeout(() => {
      toast({
        title: "Access Granted",
        description: `Welcome to the Collector portal.`,
      });

      router.push("/collector");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <CollectorNavbar />
      <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Card className="w-full max-w-md border-none shadow-2xl overflow-hidden">
          <CardHeader className="text-center bg-secondary/5 pb-8">
            <div className="mx-auto bg-secondary p-3 rounded-2xl w-fit mb-4">
              <Truck className="h-8 w-8 text-secondary-foreground" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold text-secondary">Collector Portal</CardTitle>
            <CardDescription>Secure access for verified collection partners</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="name">Partner Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Rajiv Kumar" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Partner Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="e.g. rajiv@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Button 
              variant="secondary"
              className="w-full h-12 text-lg font-bold gap-3" 
              onClick={handleCollectorSignIn}
              disabled={loading}
            >
              Sign In to Collector Portal
            </Button>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Looking for the customer portal?</p>
              <Button variant="outline" className="w-full h-10 gap-2" asChild>
                <Link href="/login">
                  Go to Customer Login
                </Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 border-t flex justify-center">
            <p className="text-xs text-muted-foreground text-center flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-green-500" /> Only verified partners can access this portal.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
