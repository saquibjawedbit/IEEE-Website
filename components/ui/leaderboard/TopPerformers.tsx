import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, Medal } from "lucide-react";
import { Participant } from "@/app/leaderboard/page";

interface TopPerformersProps {
  participants: Participant[];
}

export function TopPerformers({ participants }: TopPerformersProps) {
  // Ensure we have at most 3 participants
  const topThree = participants.slice(0, 3);
  
  // If we have less than 3 participants, fill with empty slots
  while (topThree.length < 3) {
    topThree.push(null as any);
  }
  
  // Rearrange to put 1st place in the middle, 2nd on the left, 3rd on the right
  const arranged = [
    topThree[1] || null, // 2nd place
    topThree[0] || null, // 1st place
    topThree[2] || null, // 3rd place
  ];
  
  return (
    <div className="mt-12">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-8 text-center">Top Performers</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {arranged.map((participant, index) => {
          // Determine position (1st, 2nd, 3rd)
          const position = index === 1 ? 0 : index === 0 ? 1 : 2;
          
          // Styling based on position
          const isFirst = position === 0;
          const cardSize = isFirst ? "w-full md:w-64 h-auto" : "w-full md:w-56 h-auto";
          const avatarSize = isFirst ? "w-16 h-16 md:w-24 md:h-24" : "w-12 h-12 md:w-20 md:h-20";
          const nameSize = isFirst ? "text-lg md:text-xl" : "text-base md:text-lg";
          const scoreSize = isFirst ? "text-2xl md:text-3xl" : "text-xl md:text-2xl";
          
          // Medal emoji
          const medal = position === 0 ? "🥇" : position === 1 ? "🥈" : "🥉";
          
          return (
            <motion.div
              key={position}
              className={`${cardSize} bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 md:p-6 flex flex-col items-center ${isFirst ? "md:-mt-4" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: position * 0.1 }}
            >
              {participant ? (
                <>
                  <div className="relative mb-4">
                    <div className={`${avatarSize} rounded-full bg-blue-500/20 flex items-center justify-center overflow-hidden`}>
                      {participant.avatar ? (
                        <Image
                          src={participant.avatar}
                          alt={participant.name}
                          width={isFirst ? 96 : 80}
                          height={isFirst ? 96 : 80}
                          className="rounded-full"
                        />
                      ) : (
                        <Trophy className={`${isFirst ? "w-12 h-12" : "w-10 h-10"} text-blue-400`} />
                      )}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center text-xl">
                      {medal}
                    </div>
                  </div>
                  
                  <h3 className={`${nameSize} font-bold text-white mb-1 text-center truncate max-w-full`}>{participant.name}</h3>
                  
                  <div className="text-white/60 text-xs md:text-sm mb-3 text-center truncate max-w-full">
                    @{participant.leetcodeHandle || participant.codeforcesHandle || participant.codechefHandle || "unknown"}
                  </div>
                  
                  <div className={`${scoreSize} font-bold text-blue-400 mb-1`}>
                    {participant.totalScore || participant.leetcodeRating || participant.codeforcesRating || participant.codechefRating || 0}
                  </div>
                  
                  <div className="text-white/60 text-xs md:text-sm">
                    {participant.leetcodeProblemsSolved || participant.codeforcesProblemsSolved || 0} problems solved
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className={`${avatarSize} rounded-full bg-white/5 flex items-center justify-center mb-4`}>
                    <Medal className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-white/40 text-center">No participant yet</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}