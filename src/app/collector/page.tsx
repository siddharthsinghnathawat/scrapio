
"use client";

import { useState } from "react";
import { Truck, MapPin, Calendar, Clock, CheckCircle2, XCircle, Phone, MessageSquare, Package } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const REQUESTS = [
  { id: "RQ-771", customer: "John Doe", address: "123 Green Lane, Sustainability Park", type: "Metals & Electronics", weight: "35kg", time: "Today, 2:00 PM", distance: "1.2 km" },
  { id: "RQ-775", customer: "Jane Smith", address: "45 Eco Way, West District", type: "Old Newspapers", weight: "12kg", time: "Today, 4:30 PM", distance: "3.5 km" },
  { id: "RQ-780", customer: "Michael Brown", address: "89 Recycling St, Downtown", type: "Mixed Plastics", weight: "20kg", time: "Tomorrow, 10:00 AM", distance: "5.8 km" },
  { id: "RQ-782", customer: "Sarah Connor", address: "12 Skynet Blvd, Future City", type: "Electronics", weight: "15kg", time: "Tomorrow, 11:30 AM", distance: "2.1 km" },
  { id: "RQ-785", customer: "Bruce Wayne", address: "1007 Mountain Dr, Gotham", type: "Mixed Metals", weight: "150kg", time: "Today, 8:00 PM", distance: "12 km" },
  { id: "RQ-788", customer: "Clark Kent", address: "344 Clinton St, Metropolis", type: "Old Magazines", weight: "45kg", time: "Today, 5:00 PM", distance: "1.5 km" },
  { id: "RQ-790", customer: "Peter Parker", address: "20 Ingram St, Queens", type: "Electronics", weight: "8kg", time: "Tomorrow, 2:00 PM", distance: "4.2 km" },
  { id: "RQ-792", customer: "Diana Prince", address: "1 Gateway Center, DC", type: "Mixed Scrap", weight: "60kg", time: "Wednesday, 10:00 AM", distance: "6.7 km" },
  { id: "RQ-795", customer: "Tony Stark", address: "10880 Malibu Point, CA", type: "Large Appliances", weight: "200kg", time: "Thursday, 9:00 AM", distance: "25 km" },
  { id: "RQ-798", customer: "Steve Rogers", address: "569 Leaman Pl, Brooklyn", type: "Metals", weight: "10kg", time: "Today, 3:30 PM", distance: "0.8 km" }
];

export default function CollectorPortal() {
  const { toast } = useToast();
  const [activeRequests, setActiveRequests] = useState(REQUESTS);

  const handleAction = (id: string, action: 'accept' | 'decline') => {
    setActiveRequests(prev => prev.filter(r => r.id !== id));
    toast({
      title: action === 'accept' ? "Request Accepted" : "Request Declined",
      description: action === 'accept' ? "Please proceed to the customer's location." : "The request has been removed from your list.",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="w-full md:w-auto">
            <div className="inline-flex items-center gap-2 text-primary font-bold mb-1">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Live Requests
            </div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Collector Portal</h1>
            <p className="text-muted-foreground">Manage your incoming scrap collection requests.</p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
             <Card className="flex-1 md:flex-initial px-4 md:px-6 py-2 border-none shadow-sm flex items-center justify-between md:justify-center gap-4">
                <div className="text-center">
                  <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Accepted</div>
                  <div className="text-lg md:text-xl font-bold text-primary">0</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Pending</div>
                  <div className="text-lg md:text-xl font-bold text-secondary">{activeRequests.length}</div>
                </div>
             </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
          {activeRequests.map((req) => (
            <Card key={req.id} className="border-none shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="flex flex-col lg:flex-row">
                <div className="bg-primary/5 p-6 lg:w-64 flex flex-col justify-center items-center text-center gap-2 shrink-0">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Distance</div>
                    <div className="text-2xl font-black text-primary">{req.distance}</div>
                  </div>
                </div>
                <div className="p-6 flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xl">{req.customer}</h3>
                        <Badge variant="outline" className="text-[10px] font-mono">{req.id}</Badge>
                      </div>
                      <p className="text-muted-foreground flex items-center gap-1.5 text-sm md:text-base">
                        <MapPin className="h-4 w-4 text-primary shrink-0" /> {req.address}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 shrink-0">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 shrink-0">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <hr className="border-muted" />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                    <InfoBox icon={<Package className="h-4 w-4" />} label="Scrap Type" value={req.type} />
                    <InfoBox icon={<CheckCircle2 className="h-4 w-4" />} label="Approx. Weight" value={req.weight} />
                    <InfoBox icon={<Calendar className="h-4 w-4" />} label="Scheduled Date" value={req.time.split(',')[0]} />
                    <InfoBox icon={<Clock className="h-4 w-4" />} label="Preferred Time" value={req.time.split(',')[1]} />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      className="flex-1 h-12 text-lg font-bold gap-2" 
                      onClick={() => handleAction(req.id, 'accept')}
                    >
                      <CheckCircle2 className="h-5 w-5" /> Accept Pickup
                    </Button>
                    <Button 
                      variant="outline" 
                      className="sm:w-32 h-12 text-destructive border-destructive hover:bg-destructive hover:text-white"
                      onClick={() => handleAction(req.id, 'decline')}
                    >
                      <XCircle className="h-5 w-5 mr-2" /> Decline
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {activeRequests.length === 0 && (
             <div className="text-center py-20 bg-background rounded-3xl border-2 border-dashed">
                <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-2xl font-bold">All caught up!</h3>
                <p className="text-muted-foreground">No pending requests in your area at the moment.</p>
                <Button variant="outline" className="mt-6" onClick={() => setActiveRequests(REQUESTS)}>Refresh List</Button>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

function InfoBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] uppercase tracking-wider font-bold">
        {icon} {label}
      </div>
      <div className="font-bold text-xs md:text-sm line-clamp-1">{value}</div>
    </div>
  );
}
