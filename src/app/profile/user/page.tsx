"use client";
import Navbar from "@/components/shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, Phone, Mail, Award, TreePine, Leaf, Gift, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export default function UserProfile() {
  const [userData, setUserData] = useState({ name: "User", email: "user@example.com" });

  useEffect(() => {
    try {
      const data = localStorage.getItem("scrapio_user");
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch(e) {}
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-muted/20 pb-16">
      <Navbar />
      
      {/* Premium Hero Header */}
      <div className="relative h-64 w-full bg-gradient-to-r from-primary/80 via-primary to-secondary/80 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -bottom-24 -right-24 h-96 w-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 h-32 w-32 bg-secondary/30 rounded-full blur-2xl"></div>
      </div>

      <main className="container mx-auto px-4 max-w-5xl -mt-24 relative z-10">
        
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - Profile Main */}
          <Card className="md:col-span-4 border border-white/10 shadow-2xl bg-background/60 backdrop-blur-xl group hover:shadow-primary/5 transition-all duration-500">
            <CardHeader className="text-center pb-0 relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary p-1 rounded-full flex items-center justify-center -mt-16 mb-4 shadow-xl group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center border-4 border-background">
                  <User className="h-14 w-14 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-black bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{userData.name || 'Eco Warrior'}</CardTitle>
              <p className="text-primary font-bold text-sm tracking-widest uppercase mt-1 flex items-center justify-center gap-1">
                <Leaf className="h-3.5 w-3.5" /> Eco-Warrior
              </p>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground truncate font-medium">{userData.email || 'user@example.com'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-secondary" />
                  </div>
                  <span className="text-muted-foreground font-medium">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-muted-foreground font-medium">123 Green Lane, Sustainability Park</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/5">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-muted-foreground font-medium uppercase tracking-wider">Level 4 Progress</span>
                  <span className="text-primary font-bold">75%</span>
                </div>
                <Progress value={75} className="h-2 bg-white/5" indicatorClassName="bg-gradient-to-r from-primary to-secondary" />
              </div>

            </CardContent>
          </Card>

          {/* Right Column - Stats & Impact */}
          <div className="md:col-span-8 space-y-8">
            
            {/* Impact Banner */}
            <Card className="border border-white/5 shadow-xl bg-gradient-to-br from-background to-muted overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TreePine className="h-6 w-6 text-primary drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                  My Lifetime Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <StatCard value="128" unit="kg" label="Recycled" color="primary" />
                <StatCard value="₹42.50" unit="" label="Earnings" color="secondary" />
                <StatCard value="15" unit="Trees" label="Saved" color="green-500" />
                <StatCard value="32" unit="kg" label="CO2 Off" color="blue-400" />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Achievements */}
              <Card className="border border-white/5 shadow-xl bg-background/40 backdrop-blur-md hover:border-white/10 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="h-5 w-5 text-secondary drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <AchievementItem 
                    icon={<Star className="h-5 w-5 text-yellow-500" />} 
                    title="Top Earner" 
                    desc="Reached ₹50 in a single pickup" 
                    date="2 Days Ago" 
                  />
                  <AchievementItem 
                    icon={<Leaf className="h-5 w-5 text-green-500" />} 
                    title="Green Starter" 
                    desc="Completed 5 successful pickups" 
                    date="1 Week Ago" 
                  />
                  <AchievementItem 
                    icon={<Gift className="h-5 w-5 text-purple-500" />} 
                    title="Community Hero" 
                    desc="Donated items to local charity" 
                    date="1 Month Ago" 
                  />
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border border-white/5 shadow-xl bg-background/40 backdrop-blur-md hover:border-white/10 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-primary drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative pl-6 border-l-2 border-primary/20 space-y-6">
                    <ActivityItem title="E-Waste Collected" weight="15kg" time="Today, 2:30 PM" status="Completed" />
                    <ActivityItem title="Marketplace Sale" weight="Vintage Chair" time="Yesterday" status="Sold" color="secondary" />
                    <ActivityItem title="Paper Pickup" weight="12kg" time="May 18, 2024" status="Completed" />
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

function StatCard({ value, unit, label, color }: { value: string, unit: string, label: string, color: string }) {
  // Use tailwind arbitrary values for dynamic color matching in a simplified way
  const colorMap: Record<string, string> = {
    'primary': 'text-primary',
    'secondary': 'text-secondary',
    'green-500': 'text-green-500',
    'blue-400': 'text-blue-400'
  };
  
  const bgMap: Record<string, string> = {
    'primary': 'bg-primary/10',
    'secondary': 'bg-secondary/10',
    'green-500': 'bg-green-500/10',
    'blue-400': 'bg-blue-400/10'
  };

  return (
    <div className={`p-4 rounded-2xl ${bgMap[color]} border border-white/5 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default text-center`}>
      <div className={`text-2xl font-black ${colorMap[color]}`}>{value}<span className="text-sm font-bold opacity-80 ml-1">{unit}</span></div>
      <div className="text-[10px] text-muted-foreground uppercase opacity-80 tracking-widest mt-1 font-bold">{label}</div>
    </div>
  );
}

function AchievementItem({ icon, title, desc, date }: { icon: React.ReactNode, title: string, desc: string, date: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-default">
      <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm truncate">{title}</h4>
        <p className="text-xs text-muted-foreground truncate">{desc}</p>
      </div>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{date}</span>
    </div>
  );
}

function ActivityItem({ title, weight, time, status, color = "primary" }: { title: string, weight: string, time: string, status: string, color?: string }) {
  const isPrimary = color === "primary";
  return (
    <div className="relative">
      <div className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full ${isPrimary ? 'bg-primary' : 'bg-secondary'} ring-4 ring-background`} />
      <div className="bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-xl border border-white/5">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-sm">{title}</h4>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isPrimary ? 'text-primary' : 'text-secondary'}`}>{status}</span>
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{weight}</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
