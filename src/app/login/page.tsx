
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Recycle, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/shared/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleMockSignIn = (role: "customer" | "collector") => {
    setLoading(true);
    // Mocking the delay and redirect as requested (bypass real sign in)
    setTimeout(() => {
      toast({
        title: "Access Granted",
        description: `Welcome to the ${role} portal.`,
      });

      if (role === "collector") {
        router.push("/collector");
      } else {
        router.push("/dashboard");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Card className="w-full max-w-md border-none shadow-2xl overflow-hidden">
          <CardHeader className="text-center bg-primary/5 pb-8">
            <div className="mx-auto bg-primary p-3 rounded-2xl w-fit mb-4">
              <Recycle className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold">Welcome to Scrapio</CardTitle>
            <CardDescription>Select your role to enter the portal</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8 h-12">
                <TabsTrigger value="customer" className="text-base gap-2">
                  <User className="h-4 w-4" /> Customer
                </TabsTrigger>
                <TabsTrigger value="collector" className="text-base gap-2">
                  <ShieldCheck className="h-4 w-4" /> Collector
                </TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-4">
                <div className="text-center space-y-2 mb-6">
                  <h3 className="font-bold text-lg">Customer Portal</h3>
                  <p className="text-sm text-muted-foreground">Book pickups, track recycling impact, and browse the marketplace.</p>
                </div>
                <Button 
                  className="w-full h-12 text-lg font-bold gap-3" 
                  onClick={() => handleMockSignIn("customer")}
                  disabled={loading}
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5 bg-white rounded-full p-0.5" />
                  Enter as Customer
                </Button>
              </TabsContent>

              <TabsContent value="collector" className="space-y-4">
                <div className="text-center space-y-2 mb-6">
                  <h3 className="font-bold text-lg text-secondary">Collector Portal</h3>
                  <p className="text-sm text-muted-foreground">Manage live pickup requests, navigate to locations, and grow your business.</p>
                </div>
                <Button 
                  variant="secondary"
                  className="w-full h-12 text-lg font-bold gap-3" 
                  onClick={() => handleMockSignIn("collector")}
                  disabled={loading}
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5 bg-white rounded-full p-0.5" />
                  Enter as Collector
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 border-t flex justify-center">
            <p className="text-xs text-muted-foreground text-center">
              Demo Mode: Direct access enabled for prototyping.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
