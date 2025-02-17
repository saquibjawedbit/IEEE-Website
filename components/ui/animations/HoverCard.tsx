"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverCard({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        translateY: -5,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={cn(
        "relative group",
        className
      )}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500" />
      {children}
    </motion.div>
  );
} 