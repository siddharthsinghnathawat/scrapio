
import Link from "next/link";
import { Truck, ShoppingBag, Search, Recycle, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-12 pb-20 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left z-10">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs md:text-sm font-medium bg-secondary/10 text-secondary border border-secondary/20">
              <Recycle className="h-4 w-4 mr-2" />
              Your Local Green Hero
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Recycling <span className="text-primary">Simplified</span> <br />
              Right at Your Doorstep.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
              Turn your household scrap into savings. Book a pickup in seconds or browse our community marketplace for reusable treasures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 w-full sm:w-auto" asChild>
                <Link href="/login">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold w-full sm:w-auto" asChild>
                <Link href="/marketplace">
                  Browse Marketplace
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-video md:aspect-square lg:aspect-auto">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <Image
              src={heroImage?.imageUrl || "https://picsum.photos/seed/scrapio-hero/800/600"}
              alt="Sustainability recycling"
              width={800}
              height={600}
              className="relative rounded-2xl shadow-2xl object-cover border-4 border-white w-full h-full"
              priority
              data-ai-hint={heroImage?.imageHint || "recycling sustainability"}
            />
          </div>
        </div>
      </section>

      {/* Quick Steps */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16">How Scrapio Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Step number="01" title="Schedule" description="Select your scrap type and set a preferred time slot." />
            <Step number="02" title="Verify" description="A collector arrives to weigh and verify your scrap." />
            <Step number="03" title="Earn" description="Get paid instantly through secure digital transactions." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 md:py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            Ready to turn your scrap into savings?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-14 px-8 font-bold w-full sm:w-auto" asChild>
              <Link href="/login">Sign In Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Scrapio Recycling Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="text-5xl font-headline font-black text-primary/20">{number}</div>
      <h4 className="text-xl font-bold flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        {title}
      </h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
