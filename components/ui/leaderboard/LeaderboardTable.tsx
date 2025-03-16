
import { ArrowUpDown, User } from "lucide-react";
import Image from "next/image";
import { Participant } from "@/app/leaderboard/page";
import { motion } from "framer-motion";

interface LeaderboardTableProps {
  participants: Participant[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  handleSort: (column: string) => void;
  isLoading: boolean;
  platform?: string;
}

export function LeaderboardTable({ 
  participants, 
  sortBy, 
  sortOrder, 
  handleSort,
  isLoading,
  platform = 'overall'
}: LeaderboardTableProps) {
  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return (
      <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortOrder === "asc" ? "rotate-180" : ""}`} />
    );
  };

  const getRowColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-transparent";
    if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-transparent";
    if (rank === 3) return "bg-gradient-to-r from-amber-700/20 to-transparent";
    return "";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Determine which columns to show based on platform
  const renderTableHeaders = () => {
    if (platform === 'leetcode') {
      return (
        <tr className="border-b border-white/10">
          <th className="py-3 px-4 text-left">Rank</th>
          <th className="py-3 px-4 text-left">Participant</th>
          <th className="py-3 px-4 text-left">LeetCode Username</th>
          <th 
            className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
            onClick={() => handleSort("leetcodeRating")}
          >
            Rating {getSortIcon("leetcodeRating")}
          </th>
          <th 
            className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
            onClick={() => handleSort("leetcodeProblemsSolved")}
          >
            Problems Solved {getSortIcon("leetcodeProblemsSolved")}
          </th>
        </tr>
      );
    } else if (platform === 'codeforces') {
      return (
        <tr className="border-b border-white/10">
          <th className="py-3 px-4 text-left">Rank</th>
          <th className="py-3 px-4 text-left">Participant</th>
          <th className="py-3 px-4 text-left">CodeForces Username</th>
          <th 
            className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
            onClick={() => handleSort("codeforcesRating")}
          >
            Rating {getSortIcon("codeforcesRating")}
          </th>
          <th 
            className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
            onClick={() => handleSort("codeforcesProblemsSolved")}
          >
            Problems Solved {getSortIcon("codeforcesProblemsSolved")}
          </th>
        </tr>
      );
    } else if (platform === 'codechef') {
      return (
        <tr className="border-b border-white/10">
          <th className="py-3 px-4 text-left">Rank</th>
          <th className="py-3 px-4 text-left">Participant</th>
          <th className="py-3 px-4 text-left">CodeChef Username</th>
          <th 
            className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
            onClick={() => handleSort("codechefRating")}
          >
            Rating {getSortIcon("codechefRating")}
          </th>
          <th 
            className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
            onClick={() => handleSort("codechefProblemsSolved")}
          >
            Problems Solved {getSortIcon("codechefProblemsSolved")}
          </th>
        </tr>
      );
    } else {
      return (
        <tr className="border-b border-white/10">
          <th className="py-3 px-4 text-left">Rank</th>
          <th className="py-3 px-4 text-left">Participant</th>
          <th 
            className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
            onClick={() => handleSort("leetcodeRating")}
          >
            LeetCode Rating {getSortIcon("leetcodeRating")}
          </th>
          <th 
            className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
            onClick={() => handleSort("codeforcesRating")}
          >
            CodeForces Rating {getSortIcon("codeforcesRating")}
          </th>
          <th 
            className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
            onClick={() => handleSort("codechefRating")}
          >
            CodeChef Rating {getSortIcon("codechefRating")}
          </th>
          <th 
            className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
            onClick={() => handleSort("totalScore")}
          >
            Total Score {getSortIcon("totalScore")}
          </th>
        </tr>
      );
    }
  };

  // Render table rows based on platform
  const renderTableRows = () => {
    return participants.map((participant, index) => {
      const rankToShow = participant.platformRank || participant.rank || index + 1;
      
      return (
        <motion.tr
          key={participant.id || index}
          className={`border-b border-white/10 ${getRowColor(rankToShow)}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <td className="py-3 px-4">
            {rankToShow}
            {rankToShow <= 3 && (
              <span className="ml-2">
                {rankToShow === 1 && "🥇"}
                {rankToShow === 2 && "🥈"}
                {rankToShow === 3 && "🥉"}
              </span>
            )}
          </td>
          <td className="py-3 px-4 flex items-center gap-3">
            {participant.avatar ? (
              <Image 
                src={participant.avatar} 
                alt={participant.name} 
                width={32} 
                height={32} 
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
            <span>{participant.name}</span>
          </td>
          
          {platform === 'leetcode' ? (
            <>
              <td className="py-3 px-4">
                {participant.leetcodeHandle ? (
                  <a 
                    href={`https://leetcode.com/${participant.leetcodeHandle}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {participant.leetcodeHandle}
                  </a>
                ) : 'N/A'}
              </td>
              <td className="py-3 px-4">
                <span className={`${getRatingColor('leetcode', participant.leetcodeRating || 0)}`}>
                  {participant.leetcodeRating || 'N/A'}
                </span>
              </td>
              <td className="py-3 px-4">{participant.leetcodeProblemsSolved || 0}</td>
            </>
          ) : platform === 'codeforces' ? (
            <>
              <td className="py-3 px-4">
                {participant.codeforcesHandle ? (
                  <a 
                    href={`https://codeforces.com/profile/${participant.codeforcesHandle}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {participant.codeforcesHandle}
                  </a>
                ) : 'N/A'}
              </td>
              <td className="py-3 px-4">
                <span className={`${getRatingColor('codeforces', participant.codeforcesRating || 0)}`}>
                  {participant.codeforcesRating || 'N/A'}
                </span>
              </td>
              <td className="py-3 px-4">{participant.codeforcesProblemsSolved || 0}</td>
            </>
          ) : platform === 'codechef' ? (
            <>
              <td className="py-3 px-4">
                {participant.codechefHandle ? (
                  <a 
                    href={`https://www.codechef.com/users/${participant.codechefHandle}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {participant.codechefHandle}
                  </a>
                ) : 'N/A'}
              </td>
              <td className="py-3 px-4">
                <span className={`${getRatingColor('codechef', participant.codechefRating || 0)}`}>
                  {participant.codechefRating || 'N/A'}
                </span>
              </td>
              <td className="py-3 px-4">{participant.codechefProblemsSolved || 0}</td>
            </>
          ) : (
            <>
              <td className="py-3 px-4">
                <span className={`${getRatingColor('leetcode', participant.leetcodeRating || 0)}`}>
                  {participant.leetcodeRating || 'N/A'}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className={`${getRatingColor('codeforces', participant.codeforcesRating || 0)}`}>
                  {participant.codeforcesRating || 'N/A'}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className={`${getRatingColor('codechef', participant.codechefRating || 0)}`}>
                  {participant.codechefRating || 'N/A'}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="font-bold text-blue-400">
                  {participant.totalScore || 0}
                </span>
              </td>
            </>
          )}
        </motion.tr>
      );
    });
  };

  // Function to get color based on rating
  const getRatingColor = (platform: string, rating: number): string => {
    if (platform === 'leetcode') {
      if (rating >= 2400) return "text-red-500 font-bold";
      if (rating >= 2000) return "text-orange-500 font-bold";
      if (rating >= 1600) return "text-yellow-500 font-bold";
      if (rating >= 1200) return "text-green-500 font-bold";
      if (rating > 0) return "text-gray-400 font-bold";
      return "text-gray-500";
    } 
    else if (platform === 'codeforces') {
      if (rating >= 2400) return "text-red-500 font-bold";
      if (rating >= 2100) return "text-orange-500 font-bold";
      if (rating >= 1900) return "text-purple-500 font-bold";
      if (rating >= 1600) return "text-blue-500 font-bold";
      if (rating >= 1400) return "text-cyan-500 font-bold";
      if (rating >= 1200) return "text-green-500 font-bold";
      if (rating > 0) return "text-gray-400 font-bold";
      return "text-gray-500";
    }
    else if (platform === 'codechef') {
      if (rating >= 2500) return "text-red-500 font-bold";
      if (rating >= 2000) return "text-orange-500 font-bold";
      if (rating >= 1800) return "text-yellow-500 font-bold";
      if (rating >= 1600) return "text-blue-500 font-bold";
      if (rating >= 1400) return "text-green-500 font-bold";
      if (rating > 0) return "text-gray-400 font-bold";
      return "text-gray-500";
    }
    return "";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          {renderTableHeaders()}
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
}