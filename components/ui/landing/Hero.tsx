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
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-4">
                <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
                    <Link href="/about-us">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    <Link href="/events">View Events</Link>
                </Button>
            </div>
        </div>
    );
}

export { Hero };
