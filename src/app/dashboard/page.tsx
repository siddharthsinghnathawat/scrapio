"use client";

import { Recycle, Package, Clock, CheckCircle2, ChevronRight, Truck } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BOOKINGS = [
  { id: "BK-102", type: "Metals", weight: "25kg", date: "2024-05-20", status: "In Progress", color: "bg-blue-500" },
  { id: "BK-098", type: "Electronics", weight: "5kg", date: "2024-05-15", status: "Completed", color: "bg-green-500" },
  { id: "BK-105", type: "Mixed", weight: "40kg", date: "2024-05-25", status: "Requested", color: "bg-orange-500" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">Manage your collections and marketplace listings.</p>
          </div>
          <Button size="lg" className="font-bold gap-2" asChild>
            <Link href="/book">
              <Truck className="h-5 w-5" /> New Collection
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <StatItem icon={<Recycle className="text-primary" />} label="Total Recycled" value="128 kg" />
                  <StatItem icon={<Badge variant="outline" className="text-primary">$</Badge>} label="Earnings" value="$42.50" />
                  <StatItem icon={<Package className="text-secondary" />} label="Listed Items" value="3" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg">Eco Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">12 trees</div>
                <p className="text-sm opacity-90">Your recycling efforts have saved the equivalent of 12 full-grown trees this year!</p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-[65%]" />
                </div>
                <p className="text-[10px] uppercase tracking-widest opacity-80">Progress to next milestone</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="collections" className="w-full">
              <TabsList className="bg-background w-full md:w-auto grid grid-cols-2 h-12 mb-6">
                <TabsTrigger value="collections" className="text-base">Collection History</TabsTrigger>
                <TabsTrigger value="listings" className="text-base">My Listings</TabsTrigger>
              </TabsList>

              <TabsContent value="collections" className="space-y-4">
                {BOOKINGS.map((booking) => (
                  <Card key={booking.id} className="border-none shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                        <div className={`h-16 w-16 rounded-2xl ${booking.color}/10 flex items-center justify-center shrink-0`}>
                          <Truck className={`h-8 w-8 text-foreground/80`} />
                        </div>
                        <div className="flex-1 space-y-1 text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <span className="font-bold text-lg">{booking.type} Collection</span>
                            <Badge variant="outline" className="font-mono text-[10px]">{booking.id}</Badge>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Package className="h-3.5 w-3.5" /> {booking.weight}</span>
                            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {booking.date}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-3">
                          <Badge className={`${booking.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'} border-none px-4 py-1`}>
                            {booking.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="gap-1.5">
                            View Status <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="listings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ListingCard 
                    title="Vintage Table" 
                    price="$45" 
                    status="Active" 
                    image="https://picsum.photos/seed/tab-1/100/100" 
                  />
                  <ListingCard 
                    title="Old Monitor" 
                    price="$20" 
                    status="Sold" 
                    image="https://picsum.photos/seed/mon-1/100/100" 
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-2 bg-muted rounded-lg">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}

function ListingCard({ title, price, status, image }: { title: string, price: string, status: string, image: string }) {
  return (
    <Card className="border-none shadow-sm overflow-hidden flex">
      <img src={image} alt={title} className="w-24 h-24 object-cover" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h4 className="font-bold">{title}</h4>
          <span className="font-bold text-primary">{price}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Badge variant={status === 'Sold' ? 'secondary' : 'default'} className="text-[10px]">
            {status}
          </Badge>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs">Edit Listing</Button>
        </div>
      </div>
    </Card>
  );
}