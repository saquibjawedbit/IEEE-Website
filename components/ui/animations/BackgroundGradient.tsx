"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BackgroundGradient({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-rose-500/20 blur-3xl",
        className
      )}
    />
  );
} 