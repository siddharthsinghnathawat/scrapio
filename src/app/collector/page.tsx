"use client";

import { useState } from "react";
import { Truck, MapPin, Calendar, Clock, CheckCircle2, XCircle, Phone, MessageSquare, Package, Navigation, AlertCircle } from "lucide-react";
import CollectorNavbar from "@/components/shared/CollectorNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const REQUESTS = [
  { id: "RQ-771", customer: "Abhay Sharma", address: "123 Green Lane, Sustainability Park", type: "Metals & Electronics", weight: "35kg", time: "Today, 2:00 PM", distance: "1.2 km" },
  { id: "RQ-775", customer: "Arun Patel", address: "45 Eco Way, West District", type: "Old Newspapers", weight: "12kg", time: "Today, 4:30 PM", distance: "3.5 km" },
  { id: "RQ-780", customer: "Bunny Singh", address: "89 Recycling St, Downtown", type: "Mixed Plastics", weight: "20kg", time: "Tomorrow, 10:00 AM", distance: "5.8 km" },
  { id: "RQ-782", customer: "Vikram Reddy", address: "12 Skynet Blvd, Future City", type: "Electronics", weight: "15kg", time: "Tomorrow, 11:30 AM", distance: "2.1 km" },
];

export default function CollectorPortal() {
  const { toast } = useToast();
  const [activeRequests, setActiveRequests] = useState(REQUESTS);

  const handleAction = (id: string, action: 'accept' | 'decline') => {
    setActiveRequests(prev => prev.filter(r => r.id !== id));
    toast({
      title: action === 'accept' ? "Request Accepted" : "Request Declined",
      description: action === 'accept' ? "Proceed to the customer's location." : "The request was removed.",
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-muted/20 pb-16">
      <CollectorNavbar />
      
      {/* Premium Dashboard Header */}
      <div className="relative w-full overflow-hidden border-b border-white/5 bg-background/50 backdrop-blur-3xl pt-8 pb-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 right-1/4 h-64 w-64 bg-secondary/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-3">
              <AlertCircle className="h-3.5 w-3.5 animate-pulse" /> Live Feed
            </div>
            <h1 className="font-headline text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-2">
              Pickup Requests
            </h1>
            <p className="text-muted-foreground font-medium text-lg">Accept and manage collection requests in your zone.</p>
          </div>
          <div className="flex gap-4">
             <Card className="bg-background/40 backdrop-blur-md border border-white/10 shadow-lg px-6 py-3 flex items-center gap-4">
               <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Available Jobs</div>
                  <div className="text-2xl font-black text-secondary">{activeRequests.length}</div>
               </div>
             </Card>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {activeRequests.length === 0 ? (
              <Card className="border border-white/5 shadow-xl bg-background/40 backdrop-blur-md p-12 text-center animate-in fade-in duration-500">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4 opacity-70" />
                <h3 className="text-2xl font-bold mb-2">All Caught Up!</h3>
                <p className="text-muted-foreground">There are no more active requests in your zone currently. Take a break!</p>
              </Card>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeRequests.map((request) => (
                  <Card key={request.id} className="border border-white/5 shadow-xl bg-background/40 backdrop-blur-md hover:border-white/10 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 bg-white/5 border-b border-white/5 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <div className="flex items-center gap-4 z-10">
                         <div className="h-12 w-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            <Package className="h-6 w-6 text-secondary" />
                         </div>
                         <div>
                           <CardTitle className="text-xl font-bold text-white/90">{request.type}</CardTitle>
                           <div className="flex flex-wrap items-center gap-2 mt-2">
                             <Badge variant="outline" className="text-[10px] font-mono tracking-widest bg-background/50 border-white/10 text-muted-foreground">
                               {request.id}
                             </Badge>
                             <span className="text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 px-2 py-0.5 rounded-md shadow-sm">
                               {request.weight}
                             </span>
                           </div>
                         </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 z-10">
                        <div className="flex items-center gap-1.5 text-sm font-bold bg-background/50 px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
                          <Navigation className="h-4 w-4 text-green-500 animate-pulse" />
                          {request.distance}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 bg-background p-1.5 rounded-md border border-white/5 shadow-inner"><MapPin className="h-4 w-4 text-muted-foreground" /></div>
                            <div>
                              <p className="font-bold text-sm text-white/90 mb-1">{request.customer}</p>
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{request.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="bg-background p-1.5 rounded-md border border-white/5 shadow-inner"><Clock className="h-4 w-4 text-secondary drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" /></div>
                            <p className="text-sm font-bold text-white/90">{request.time}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-start md:justify-end items-end h-full">
                           <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl bg-background shadow-inner border-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white shrink-0 group/icon transition-all">
                             <Phone className="h-4 w-4 group-hover/icon:scale-110 group-hover/icon:text-green-500 transition-all" />
                           </Button>
                           <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl bg-background shadow-inner border-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white shrink-0 group/icon transition-all">
                             <MessageSquare className="h-4 w-4 group-hover/icon:scale-110 text-secondary transition-all" />
                           </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 pt-5 border-t border-white/5">
                        <Button 
                          onClick={() => handleAction(request.id, 'accept')} 
                          className="flex-1 h-12 font-bold text-md rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all group/btn"
                        >
                          <CheckCircle2 className="mr-2 h-5 w-5 group-hover/btn:scale-110 transition-transform" /> Accept Request
                        </Button>
                        <Button 
                          onClick={() => handleAction(request.id, 'decline')} 
                          variant="ghost"
                          className="flex-1 h-12 font-bold bg-background/50 border border-white/5 hover:bg-white/5 hover:text-destructive text-muted-foreground rounded-xl transition-all group/btn"
                        >
                          <XCircle className="mr-2 h-5 w-5 group-hover/btn:scale-110 transition-transform" /> Decline
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border border-white/5 shadow-2xl bg-gradient-to-br from-background to-muted overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" />
              <CardHeader className="pb-4 relative z-10">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" /> Active Zone Map
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 p-0 relative border-t border-white/5">
                <div className="absolute inset-0 bg-secondary/10 mix-blend-overlay z-10 pointer-events-none transition-opacity group-hover:opacity-0 duration-1000" />
                <iframe 
                  className="w-full h-full opacity-70 grayscale invert transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-90 group-hover:invert-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.846511516089!2d77.0602937!3d28.6010492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04d2e89647ab%3A0xe54fb7aabf686940!2sSector%209%2C%20Dwarka%2C%20Delhi%2C%20110077!5e0!3m2!1sen!2sin!4v1716301118126!5m2!1sen!2sin" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="bg-background/90 backdrop-blur-xl p-3.5 rounded-xl border border-white/10 shadow-2xl text-center font-bold text-sm flex items-center justify-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    West District Zone • Online
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
