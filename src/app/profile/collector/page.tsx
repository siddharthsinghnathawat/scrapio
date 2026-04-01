"use client";
import CollectorNavbar from "@/components/shared/CollectorNavbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, MapPin, Phone, Star, ShieldCheck, Mail, Map, Clock, CheckCircle2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function CollectorProfile() {
  const [collectorData, setCollectorData] = useState({ name: "Collector", email: "partner@example.com" });

  useEffect(() => {
    try {
      const data = localStorage.getItem("scrapio_collector");
      if (data) {
        setCollectorData(JSON.parse(data));
      }
    } catch(e) {}
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-muted/20 pb-16">
      <CollectorNavbar />
      
      {/* Premium Hero Header for Collector */}
      <div className="relative h-64 w-full bg-gradient-to-r from-secondary/80 via-secondary to-primary/80 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-24 -left-24 h-96 w-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-32 w-32 bg-primary/30 rounded-full blur-2xl"></div>
        
        {/* Verification Banner */}
        <div className="absolute top-8 right-8 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 shadow-2xl">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          <span className="text-sm font-bold tracking-widest uppercase text-white">Verified</span>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-5xl -mt-24 relative z-10">
        
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - Collector Main */}
          <Card className="md:col-span-4 border border-white/10 shadow-2xl bg-background/60 backdrop-blur-xl group hover:shadow-secondary/5 transition-all duration-500">
            <CardHeader className="text-center pb-0 relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-secondary to-primary p-1 rounded-full flex items-center justify-center -mt-16 mb-4 shadow-xl group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center border-4 border-background overflow-hidden relative">
                  <div className="absolute inset-0 bg-secondary/10"></div>
                  <Truck className="h-12 w-12 text-secondary z-10" />
                </div>
              </div>
              <CardTitle className="text-2xl font-black bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{collectorData.name || 'Partner'}</CardTitle>
              <div className="flex items-center justify-center gap-1 mt-2 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current opacity-50" />
                <span className="text-sm text-muted-foreground ml-1 font-bold">(4.8)</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-secondary" />
                  </div>
                  <span className="text-muted-foreground truncate font-medium">{collectorData.email || 'partner@example.com'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">+91 91234 56780</span>
                </div>
                <div className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <Map className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-muted-foreground font-medium">Zone: West District</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-center">
                <div className="inline-flex items-center gap-2 text-green-500 font-bold text-sm mb-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Currently Active
                </div>
                <p className="text-xs text-muted-foreground">Ready for pickups in your zone.</p>
              </div>

              <Button className="w-full h-12 text-md font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Update Availability
              </Button>
            </CardContent>
          </Card>

          {/* Right Column - Ext. Stats & Activity */}
          <div className="md:col-span-8 space-y-8">
            
            {/* Stats Overview */}
            <Card className="border border-white/5 shadow-xl bg-gradient-to-br from-background to-muted overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Navigation className="h-6 w-6 text-secondary drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                  Collection Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 mt-2">
                <div className="p-6 rounded-2xl bg-secondary/10 border border-white/5 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-5">
                    <Truck className="h-32 w-32" />
                  </div>
                  <div className="text-4xl font-black text-secondary">345</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2 font-bold">Pickups Completed</div>
                </div>
                
                <div className="p-6 rounded-2xl bg-primary/10 border border-white/5 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-5">
                    <Recycle className="h-32 w-32" />
                  </div>
                  <div className="text-4xl font-black text-primary font-mono">2.4<span className="text-xl ml-1">Tons</span></div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2 font-bold">Material Processed</div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Verification */}
              <Card className="border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.05)] bg-background/40 backdrop-blur-md transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ShieldCheck className="h-5 w-5 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    Credentials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <VerificationItem title="ID Verification" desc="Govt ID Provided" />
                  <VerificationItem title="Vehicle Registration" desc="Plate #DL-14-1234" />
                  <VerificationItem title="Background Check" desc="Cleared Jan 2024" />
                </CardContent>
              </Card>

              {/* Today's Schedule */}
              <Card className="border border-white/5 shadow-xl bg-background/40 backdrop-blur-md hover:border-white/10 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-secondary drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative pl-6 border-l-2 border-secondary/20 space-y-4">
                    <ScheduleItem time="10:00 AM" location="Sustainability Park" status="Completed" />
                    <ScheduleItem time="2:30 PM" location="Downtown District" status="Pending" active />
                    <ScheduleItem time="5:00 PM" location="West District" status="Upcoming" />
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function VerificationItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex items-center gap-4 py-3 px-3 border border-white/5 hover:bg-white/5 rounded-xl transition-colors cursor-default">
      <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm truncate text-white/90">{title}</h4>
        <p className="text-xs text-muted-foreground truncate">{desc}</p>
      </div>
    </div>
  );
}

function ScheduleItem({ time, location, status, active = false }: { time: string, location: string, status: string, active?: boolean }) {
  return (
    <div className="relative">
      <div className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ${active ? 'bg-secondary ring-4 ring-secondary/30 animate-pulse' : 'bg-muted-foreground ring-4 ring-background'}`} />
      <div className={`p-3 rounded-xl border transition-colors ${active ? 'bg-secondary/10 border-secondary/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]' : 'bg-white/5 border-white/5'}`}>
        <div className="flex justify-between items-start mb-1">
          <h4 className={`font-bold text-sm ${active ? 'text-secondary font-black' : ''}`}>{time}</h4>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${status === 'Completed' ? 'text-green-500' : status === 'Pending' ? 'text-yellow-500' : 'text-muted-foreground'}`}>{status}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
