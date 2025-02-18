import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function Hero() {
    return (
        <div className="relative">
            <HeroGeometric
                badge="IEEE"
                title1="Student Branch"
                title2="BIT Mesra"
                // subtitle="Advancing Technology for Humanity"
            />
            
            {/* Call to Action Buttons */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-4">
                <Button 
                    asChild 
                    size="lg" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg"
                >
                    <Link href="/about-us">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-white/80 text-black font-semibold hover:bg-white/10 hover:border-white shadow-lg backdrop-blur-sm"
                >
                    <Link href="/events">View Events</Link>
                </Button>
            </div>
        </div>
    );
}

export { Hero };
