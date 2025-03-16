import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface LeaderboardStatsProps {
  stats: Stat[];
}

export function LeaderboardStats({ stats }: LeaderboardStatsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-3 md:p-6 flex flex-col items-center text-center"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 md:mb-4">
              <Icon className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
            </div>
            <div className="text-xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs md:text-sm text-white/60">{stat.label}</div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}