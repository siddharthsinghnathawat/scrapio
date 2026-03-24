"use client";

import { ShoppingBag, Search, Plus, Tag, MapPin, Heart } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ITEMS = [
  {
    id: 1,
    title: "Vintage Wooden Side Chair",
    price: 45,
    category: "Furniture",
    location: "Downtown",
    image: "https://scrapvendor.com/wp-content/uploads/2014/09/Home-Furniture-Scrap2.jpg",
    imageHint: "vintage chair"
  },
  {
    id: 2,
    title: "Eco-Friendly Glass Jar Set",
    price: 15,
    category: "Kitchen",
    location: "Westside",
    image: "https://tiimg.tistatic.com/fp/1/006/606/eco-friendly-disposable-juice-glass-180.jpg",
    imageHint: "glass jars"
  },
  {
    id: 3,
    title: "Retro Vinyl Player",
    price: 120,
    category: "Electronics",
    location: "East End",
    image: "https://picsum.photos/seed/vinyl/400/400",
    imageHint: "retro vinyl"
  },
  {
    id: 4,
    title: "NewsPaper",
    price: 3,
    category: "Decor",
    location: "Green Valley",
    image: "https://hariomad.com/blog/wp-content/uploads/2022/02/newspaper-advertising-service-500x500-1.png",
    imageHint: "bamboo lamp"
  },
  {
    id: 5,
    title: "Outdoor Iron Table",
    price: 80,
    category: "Garden",
    location: "Sunnyvale",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGa1Fj75Izc2ZJwisWhtKMARmqY8BcTbvcDA&s",
    imageHint: "iron table"
  },
  {
    id: 6,
    title: "Collection of Classic Books",
    price: 25,
    category: "Others",
    location: "Library Hill",
    image: "https://images.squarespace-cdn.com/content/v1/5876279bbebafb82a7c81c00/f4e17d6a-81db-4a04-9bda-63c86c517778/IMG_3105.jpg",
    imageHint: "classic books"
  }
];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");

  const filteredItems = ITEMS.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/30 pb-12">
      <Navbar />
      
      {/* Header & Controls */}
      <section className="bg-background border-b py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
                <ShoppingBag className="h-8 w-8 text-secondary" />
                Marketplace
              </h1>
              <p className="text-muted-foreground">Buy and sell reusable items to promote circular economy.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search items..." 
                  className="pl-10" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button className="gap-2 shrink-0">
                <Plus className="h-4 w-4" /> List Item
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
              <CardHeader className="p-0 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                  data-ai-hint={item.imageHint}
                />
                <Button variant="secondary" size="icon" className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="h-4 w-4" />
                </Button>
                <Badge className="absolute bottom-3 left-3 bg-white/90 text-foreground hover:bg-white/100 backdrop-blur border-none">
                  {item.category}
                </Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-lg leading-tight line-clamp-2">{item.title}</h3>
                  <div className="text-primary font-bold text-xl">₹{item.price}</div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {item.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" /> Reusable
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full font-semibold border-primary text-primary hover:bg-primary hover:text-white">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24 bg-background rounded-3xl mt-10">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold">No items found</h3>
            <p className="text-muted-foreground">Try adjusting your search or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}