"use client";

import { Code2, Users2, Trophy, Rocket, BookOpen, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../animations/BackgroundGradient";
import { HoverCard } from "../animations/HoverCard";

const features = [
    {
        icon: Code2,
        title: "Technical Workshops",
        description: "Hands-on workshops on cutting-edge technologies and programming"
    },
    {
        icon: Users2,
        title: "Vibrant Community",
        description: "Join a network of tech enthusiasts and industry professionals"
    },
    {
        icon: Trophy,
        title: "Competitions",
        description: "Participate in hackathons and coding competitions"
    },
    {
        icon: Rocket,
        title: "Innovation Hub",
        description: "Work on real-world projects and innovative solutions"
    },
    {
        icon: BookOpen,
        title: "Learning Resources",
        description: "Access to IEEE's vast library of technical resources"
    },
    {
        icon: Globe,
        title: "Global Network",
        description: "Connect with IEEE members worldwide"
    }
];

export function Features() {
    return (
        <section className="relative py-24 overflow-hidden">
            <BackgroundGradient />
            
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-white text-center mb-16"
                >
                    What We <span className="text-blue-400">Offer</span>
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                key={index}
                            >
                                <HoverCard>
                                    <div className="bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                                        <motion.div 
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                            className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                        >
                                            <Icon className="h-6 w-6 text-blue-400" />
                                        </motion.div>
                                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                        <p className="text-gray-400">{feature.description}</p>
                                    </div>
                                </HoverCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
} 