
"use client";

import { useState } from "react";
import { Truck, Calendar, ArrowRight, Package, MapPin } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function BookPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Booking Successful!",
        description: "A collector will contact you shortly to confirm the pickup.",
      });
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-1 max-w-4xl">
        <div className="mb-8 space-y-2">
          <h1 className="font-headline text-3xl font-bold tracking-tight">Book a Collection</h1>
          <p className="text-muted-foreground">Fill in the details below to schedule a scrap pickup van.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 shadow-sm border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" /> Pickup Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scrapType">Scrap Category</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metal">Metals (Iron, Alum, etc.)</SelectItem>
                        <SelectItem value="paper">Paper & Cardboard</SelectItem>
                        <SelectItem value="plastics">Plastics</SelectItem>
                        <SelectItem value="electronics">Electronics (E-waste)</SelectItem>
                        <SelectItem value="appliances">Large Appliances</SelectItem>
                        <SelectItem value="multi">Mixed Scrap</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Approx. Quantity (kg)</Label>
                    <Input id="weight" type="number" placeholder="e.g. 15" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <div className="relative">
                      <Input id="date" type="date" required className="pl-10" />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time Slot</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                        <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Pickup Address</Label>
                  <div className="relative">
                    <Textarea id="address" placeholder="Enter your full address" required className="pl-10 min-h-[100px]" />
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="e.g. Broken fridge, heavy metal items..." />
                </div>

                <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
                  {loading ? "Processing..." : "Confirm Booking"} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-sm border-none bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg">Estimation Help</CardTitle>
                <CardDescription className="text-primary-foreground/80">Unsure about your scrap value?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">Use our recycling guide to identify materials and get a general scrap value estimate before booking.</p>
                <Button variant="secondary" className="w-full" asChild>
                  <a href="/ai-assistant">View Recycling Guide</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-none">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" /> Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3 text-muted-foreground">
                  <li className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Separate wet waste from dry scrap.
                  </li>
                  <li className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Ensure heavy items are accessible.
                  </li>
                  <li className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Remove batteries from electronics if possible.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
