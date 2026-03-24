
"use client";

import { useState } from "react";
import { Search, Info, Recycle, Trash2, IndianRupee, ShoppingBag } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRecyclingInfo } from "@/ai/flows/ai-recycling-info-tool";

// Local database of recycling information as fallback
const RECYCLING_DATA: Record<string, {
  isRecyclable: boolean;
  category: string;
  scrapValue: string;
  suggestions: string;
  notes: string;
}> = {
  "cardboard": {
    isRecyclable: true,
    category: "Paper & Cardboard",
    scrapValue: "Low",
    suggestions: "Reuse for moving or storage boxes.",
    notes: "Ensure it is dry and free of oil/food stains. Flatten boxes to save space."
  },
  "newspaper": {
    isRecyclable: true,
    category: "Paper",
    scrapValue: "Low",
    suggestions: "Can be used for cleaning windows or as packing material.",
    notes: "Keep dry. Remove any plastic wrap from delivery."
  },
  "iron": {
    isRecyclable: true,
    category: "Metals",
    scrapValue: "Medium",
    suggestions: "Not typically suitable for reuse if heavily rusted.",
    notes: "Commonly accepted at all scrap yards. Weight contributes significantly to value."
  },
  "copper": {
    isRecyclable: true,
    category: "Metals",
    scrapValue: "High",
    suggestions: "Valuable scrap, always sell to a recycler.",
    notes: "Copper wire and piping are among the highest value scrap materials."
  },
  "aluminum": {
    isRecyclable: true,
    category: "Metals",
    scrapValue: "Medium",
    suggestions: "Cans are highly recyclable.",
    notes: "Easy to collect and recycle. Check for food residue on foil."
  },
  "laptop": {
    isRecyclable: true,
    category: "Electronics",
    scrapValue: "Medium",
    suggestions: "Consider donating if still functional or refurbishing.",
    notes: "Contains hazardous materials. Must be disposed of at an e-waste facility."
  },
  "phone": {
    isRecyclable: true,
    category: "Electronics",
    scrapValue: "Low to Medium",
    suggestions: "Sell to a trade-in program or donate to charity.",
    notes: "Ensure all personal data is wiped before recycling."
  },
  "plastic bottle": {
    isRecyclable: true,
    category: "Plastics",
    scrapValue: "Very Low",
    suggestions: "Reuse for DIY gardening or storage.",
    notes: "Check the recycling number (1 or 2 are most common). Rinse before disposal."
  }
};

export default function RecyclingGuidePage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof RECYCLING_DATA[string] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const searchKey = query.toLowerCase().trim();
    if (!searchKey) return;

    setIsLoading(true);
    setNotFound(false);
    
    try {
      // First try real AI
      const aiResult = await getRecyclingInfo({ itemDescription: searchKey });
      
      if (aiResult) {
        setResult({
          isRecyclable: aiResult.isRecyclable,
          category: aiResult.recyclingCategory,
          scrapValue: aiResult.scrapValueEstimate,
          suggestions: aiResult.reusableSuggestions,
          notes: aiResult.additionalNotes
        });
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error("AI Assistant Error:", error);
      // Fallback to local database if AI fails
    }

    // Fallback logic
    const foundKey = Object.keys(RECYCLING_DATA).find(key => 
      searchKey.includes(key) || key.includes(searchKey)
    );

    if (foundKey) {
      setResult(RECYCLING_DATA[foundKey]);
    } else {
      setResult(null);
      setNotFound(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex p-3 bg-primary/10 rounded-full mb-2">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight">Recycling Guide</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find out if an item is recyclable, its category, and estimated scrap value from our database.
          </p>
        </div>

        <Card className="border-none shadow-xl overflow-hidden mb-8">
          <CardContent className="p-6 md:p-10 bg-background">
            <form onSubmit={handleSearch} className="flex gap-4">
              <Input 
                placeholder="Search items (e.g., 'iron', 'cardboard', 'laptop')" 
                className="h-14 text-lg bg-muted/50 border-none focus-visible:ring-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button 
                size="lg" 
                className="h-14 px-8 font-bold gap-2 shrink-0" 
                disabled={isLoading}
                onClick={() => handleSearch()}
              >
                <Search className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isLoading ? 'Searching...' : 'Search'}</span>
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className={`${result.isRecyclable ? 'bg-primary/10' : 'bg-destructive/10'}`}>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {result.isRecyclable ? <Recycle className="h-5 w-5 text-primary" /> : <Trash2 className="h-5 w-5 text-destructive" />}
                      Recyclable?
                    </span>
                    <Badge variant={result.isRecyclable ? "default" : "destructive"} className="text-lg px-4 py-1">
                      {result.isRecyclable ? "Yes" : "No"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-xs uppercase text-muted-foreground tracking-wider mb-1 block">Category</Label>
                    <p className="text-xl font-bold">{result.category}</p>
                  </div>
                  <div>
                    <Label className="text-xs uppercase text-muted-foreground tracking-wider mb-1 block">Estimated Scrap Value</Label>
                    <div className="flex items-center gap-2 text-primary">
                      <IndianRupee className="h-5 w-5" />
                      <span className="text-xl font-bold">{result.scrapValue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="bg-secondary/10">
                  <CardTitle className="flex items-center gap-2 text-secondary">
                    <ShoppingBag className="h-5 w-5" />
                    Reuse Suggestion
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {result.suggestions}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Additional Notes & Disposal Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {result.notes}
                </p>
                {result.isRecyclable && (
                  <Button className="mt-6 w-full md:w-auto" asChild>
                    <a href="/book">Book Collection for this Item</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {notFound && (
          <div className="text-center py-12 bg-background rounded-3xl border-2 border-dashed">
            <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-bold">Item not found</h3>
            <p className="text-muted-foreground">Try a simpler term like "metal", "paper", or "plastic".</p>
          </div>
        )}

        {!result && !notFound && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
            <SampleCard text="cardboard" onClick={(t) => { setQuery(t); handleSearch(); }} />
            <SampleCard text="copper wire" onClick={(t) => { setQuery(t); handleSearch(); }} />
            <SampleCard text="laptop" onClick={(t) => { setQuery(t); handleSearch(); }} />
          </div>
        )}
      </main>
    </div>
  );
}

function SampleCard({ text, onClick }: { text: string, onClick: (t: string) => void }) {
  return (
    <Card 
      className="p-4 cursor-pointer hover:border-primary/50 transition-colors border-dashed border-2 bg-transparent"
      onClick={() => onClick(text)}
    >
      <p className="text-sm font-medium italic text-center">"{text}"</p>
    </Card>
  );
}

function Label({ className, children }: { className?: string, children: React.ReactNode }) {
  return <span className={className}>{children}</span>;
}
