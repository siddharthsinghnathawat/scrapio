"use client";

import { useState, useEffect } from "react";
import { Recycle, Package, Clock, CheckCircle2, ChevronRight, Truck, TrendingUp, Sparkles, Leaf } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const BOOKINGS = [
  { id: "BK-102", type: "Metals", weight: "25kg", date: "2024-05-20", status: "In Progress", color: "from-blue-500/20 to-blue-500/5", iconColor: "text-blue-500" },
  { id: "BK-098", type: "Electronics", weight: "5kg", date: "2024-05-15", status: "Completed", color: "from-green-500/20 to-green-500/5", iconColor: "text-green-500" },
  { id: "BK-105", type: "Mixed", weight: "40kg", date: "2024-05-25", status: "Requested", color: "from-orange-500/20 to-orange-500/5", iconColor: "text-orange-500" },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    try {
      const data = localStorage.getItem("scrapio_user");
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.name) setUserName(parsed.name.split(' ')[0]);
      }
    } catch(e) {}
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-muted/20 pb-16">
      <Navbar />
      
      {/* Premium Dashboard Header */}
      <div className="relative w-full overflow-hidden border-b border-white/5 bg-background/50 backdrop-blur-3xl pt-8 pb-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 right-1/4 h-64 w-64 bg-primary/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Dashboard
            </div>
            <h1 className="font-headline text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-muted-foreground font-medium text-lg">Manage your collections and marketplace listings.</p>
          </div>
          <Button className="h-14 px-8 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] transition-all font-bold gap-2 text-md" asChild>
            <Link href="/book">
              <Truck className="h-5 w-5" /> Schedule Collection
            </Link>
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Quick Stats Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border border-white/10 shadow-2xl bg-background/60 backdrop-blur-xl group hover:border-white/20 transition-all duration-500">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <StatItem icon={<Recycle className="h-6 w-6 text-primary" />} label="Total Recycled" value="128 kg" />
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  <StatItem icon={<TrendingUp className="h-6 w-6 text-secondary" />} label="Total Earnings" value="₹42.50" />
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  <StatItem icon={<Package className="h-6 w-6 text-green-500" />} label="Active Listings" value="3 items" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-white/5 shadow-xl bg-gradient-to-br from-primary/80 to-primary/40 text-primary-foreground overflow-hidden relative group">
              <div className="absolute -right-10 -top-10 opacity-20 group-hover:rotate-12 transition-transform duration-700">
                <Leaf className="h-32 w-32" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Leaf className="h-5 w-5 drop-shadow-md" /> Eco Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-black drop-shadow-md">12<span className="text-lg font-bold ml-1 opacity-90">Trees</span></div>
                <p className="text-sm opacity-90 font-medium">Your recycling efforts have saved the equivalent of 12 full-grown trees this year!</p>
                <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                  <div className="bg-white h-2 rounded-full w-[65%] shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">Progress to next milestone</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="collections" className="w-full">
              <div className="p-1.5 rounded-xl bg-background/50 border border-white/5 backdrop-blur-md inline-block mb-6 shadow-lg">
                <TabsList className="bg-transparent h-12 w-full md:w-auto grid grid-cols-2 p-0 gap-1">
                  <TabsTrigger value="collections" className="text-sm font-bold rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-300">
                    Collection History
                  </TabsTrigger>
                  <TabsTrigger value="listings" className="text-sm font-bold rounded-lg data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary data-[state=active]:shadow-none transition-all duration-300">
                    My Listings
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="collections" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {BOOKINGS.map((booking) => (
                  <Card key={booking.id} className="border border-white/5 shadow-lg bg-background/40 backdrop-blur-md hover:border-white/10 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row items-center p-6 gap-6 relative">
                        {/* Hover Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${booking.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                        
                        <div className={`h-16 w-16 rounded-2xl bg-background border border-white/5 shadow-inner flex items-center justify-center shrink-0 z-10 box-border ring-1 ring-inset ring-white/10 group-hover:scale-105 transition-transform`}>
                          <Package className={`h-8 w-8 ${booking.iconColor}`} />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left z-10 w-full">
                          <div className="flex items-center justify-center md:justify-start gap-3 mb-1.5">
                            <span className="font-bold text-lg text-white/90">{booking.type}</span>
                            <Badge variant="outline" className="font-mono text-[10px] bg-white/5 border-white/10 tracking-widest">{booking.id}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground font-medium">
                            <span className="flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-md border border-white/5"><Truck className="h-3.5 w-3.5" /> {booking.weight}</span>
                            <span className="flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-md border border-white/5"><Clock className="h-3.5 w-3.5" /> {booking.date}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-end gap-3 z-10 w-full md:w-auto">
                          <Badge className={`${booking.status === 'Completed' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : booking.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'} border-none px-4 py-1.5 animate-pulse`}>
                            {booking.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="gap-1.5 hover:bg-white/5 hover:text-white rounded-lg group/btn w-full md:w-auto">
                            View Status <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="listings" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ListingCard 
                    title="Vintage Table" 
                    price="₹45" 
                    status="Active" 
                    image="https://picsum.photos/seed/tab-1/200/200" 
                  />
                  <ListingCard 
                    title="Old Monitor" 
                    price="₹20" 
                    status="Sold" 
                    image="https://picsum.photos/seed/mon-1/200/200" 
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
    <div className="flex items-center gap-4 hover:translate-x-1 transition-transform cursor-default">
      <div className="p-3 bg-background border border-white/5 rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">{label}</div>
        <div className="text-2xl font-black text-white/90">{value}</div>
      </div>
    </div>
  );
}

function ListingCard({ title, price, status, image }: { title: string, price: string, status: string, image: string }) {
  return (
    <Card className="border border-white/5 shadow-xl bg-background/40 backdrop-blur-md overflow-hidden flex group hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
      <div className="w-32 h-full relative overflow-hidden shrink-0 bg-muted">
         <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover max-w-full group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-lg text-white/90 truncate mr-2">{title}</h4>
            <span className="font-black text-secondary whitespace-nowrap">{price}</span>
          </div>
          <Badge variant={status === 'Sold' ? 'secondary' : 'default'} className="text-[10px] tracking-widest uppercase mb-4">
            {status}
          </Badge>
        </div>
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs bg-white/5 hover:bg-white/10 rounded-lg">Edit Listing</Button>
        </div>
      </div>
    </Card>
  );
}