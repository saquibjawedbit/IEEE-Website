"use client";
import { Header1 } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import { BackgroundSparkles } from "@/components/ui/animations/BackgroundSparkles";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Trophy,
  Medal,
  Code,
  Search,
  Filter,
  ArrowUpDown,
  Github,
  RefreshCw,
  User,
  Sparkles,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LeaderboardTable } from "@/components/ui/leaderboard/LeaderboardTable";
import { LeaderboardForm } from "@/components/ui/leaderboard/LeaderboardForm";
import { LeaderboardStats } from "@/components/ui/leaderboard/LeaderboardStats";
import { TopPerformers } from "@/components/ui/leaderboard/TopPerformers";
import { Tabs as UITabs, TabsContent as UITabsContent, TabsList as UITabsList, TabsTrigger as UITabsTrigger } from "@/components/ui/tabs";
import { updateAllUsersRating as updateUsersRating } from "@/actions/updateAllUserRating";
import { getUser } from "@/actions/getUser";
import { createUser } from "@/actions/createUser";
import { User as userType } from "@prisma/client";
import { prisma } from "@/lib";
import { get } from "http";
import { useAuth } from "@/contexts/AuthContext";

export interface Participant {
  id: string;
  name: string;
  leetcodeHandle?: string;
  codeforcesHandle?: string;
  codechefHandle?: string;
  leetcodeRating?: number;
  leetcodeProblemsSolved?: number;
  codeforcesRating?: number;
  codeforcesProblemsSolved?: number;
  codechefRating?: number;
  codechefProblemsSolved?: number;
  totalScore?: number;
  rank?: number;
  avatar?: string;
  lastUpdated: string;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [participants, setParticipants] = useState<userType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("totalScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("overall");

  // Fetch participants data from Supabase


  useEffect(() => {
    async function fetchParticipants() {
      try {
        setIsLoading(true);
        const users = await getUser();

        // Map database users to Participant interface
        const mappedUsers = users.map(user => {
          // Calculate score only from platforms where the user has provided handles
          const calculatedScore = 
            (user.leetcodeHandle && user.leetcodeHandle !== "none" ? (user.leetcodeRating || 0) + (user.leetcodeProblemsSolved || 0) * 2 : 0) +
            (user.codeforcesHandle && user.codeforcesHandle !== "none" ? (user.codeforcesRating || 0) + (user.codeforcesProblemsSolved || 0) * 2 : 0) +
            (user.codechefHandle && user.codechefHandle !== "none" ? (user.codechefRating || 0) + (user.codechefProblemsSolved || 0) * 2 : 0);
          
          const totalScore = user.totalScore || calculatedScore;
          
          return {
            id: user.id,
            name: user.name,
            leetcodeHandle: user.leetcodeHandle !== "none" ? user.leetcodeHandle : undefined,
            codeforcesHandle: user.codeforcesHandle !== "none" ? user.codeforcesHandle : undefined,
            codechefHandle: user.codechefHandle !== "none" ? user.codechefHandle : undefined,
            leetcodeRating: user.leetcodeHandle !== "none" ? user.leetcodeRating : undefined,
            leetcodeProblemsSolved: user.leetcodeHandle !== "none" ? user.leetcodeProblemsSolved : undefined,
            codeforcesRating: user.codeforcesHandle !== "none" ? user.codeforcesRating : undefined,
            codeforcesProblemsSolved: user.codeforcesHandle !== "none" ? user.codeforcesProblemsSolved : undefined,
            codechefRating: user.codechefHandle !== "none" ? user.codechefRating : undefined,
            codechefProblemsSolved: user.codechefHandle !== "none" ? user.codechefProblemsSolved : undefined,
            totalScore: totalScore,
            avatar: user.image,
            lastUpdated: new Date().toISOString()
          };
        });

        // Sort users by total score in descending order
        const sortedUsers = [...mappedUsers].sort((a, b) => 
          (b.totalScore || 0) - (a.totalScore || 0)
        );

        // Add rank to each user based on sorted position
        const rankedUsers = sortedUsers.map((user, index) => ({
          ...user,
          rank: index + 1
        }));

        setParticipants(rankedUsers);
      } catch (error) {
        console.error('Failed to fetch participants:', error);
      } finally {
        setIsLoading(false);
      }
    }

    // Always fetch participants regardless of auth state
    fetchParticipants();
  }, []); // Fetch participants on component mount


  // Function to handle sorting
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  // Function to filter participants based on search query
  const filteredParticipants = participants.filter(participant =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.leetcodeHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.codeforcesHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.codechefHandle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to sort participants
  const getSortedParticipants = (platform: string = 'overall') => {
    let sortedList = [...filteredParticipants];

    if (platform === 'leetcode') {
      // Sort by LeetCode rating
      sortedList.sort((a, b) => (b.leetcodeRating || 0) - (a.leetcodeRating || 0));
      // Add LeetCode-specific rank
      return sortedList.map((participant, index) => ({
        ...participant,
        platformRank: index + 1
      }));
    } else if (platform === 'codeforces') {
      // Sort by CodeForces rating
      sortedList.sort((a, b) => (b.codeforcesRating || 0) - (a.codeforcesRating || 0));
      // Add CodeForces-specific rank
      return sortedList.map((participant, index) => ({
        ...participant,
        platformRank: index + 1
      }));
    } else if (platform === 'codechef') {
      // Sort by CodeChef rating
      sortedList.sort((a, b) => (b.codechefRating || 0) - (a.codechefRating || 0));
      // Add CodeChef-specific rank
      return sortedList.map((participant, index) => ({
        ...participant,
        platformRank: index + 1
      }));
    } else {
      // Overall sorting based on selected sort criteria
      return [...filteredParticipants].sort((a, b) => {
        let aValue, bValue;

        switch (sortBy) {
          case "name":
            aValue = a.name || '';
            bValue = b.name || '';
            return sortOrder === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          case "leetcodeRating":
            aValue = a.leetcodeRating || 0;
            bValue = b.leetcodeRating || 0;
            break;
          case "leetcodeProblemsSolved":
            aValue = a.leetcodeProblemsSolved || 0;
            bValue = b.leetcodeProblemsSolved || 0;
            break;
          case "codeforcesRating":
            aValue = a.codeforcesRating || 0;
            bValue = b.codeforcesRating || 0;
            break;
          case "codeforcesProblemsSolved":
            aValue = a.codeforcesProblemsSolved || 0;
            bValue = b.codeforcesProblemsSolved || 0;
            break;
          case "codechefRating":
            aValue = a.codechefRating || 0;
            bValue = b.codechefRating || 0;
            break;
          case "codechefProblemsSolved":
            aValue = a.codechefProblemsSolved || 0;
            bValue = b.codechefProblemsSolved || 0;
            break;
          case "totalScore":
            aValue = a.totalScore || 0;
            bValue = b.totalScore || 0;
            break;
          default:
            aValue = a.totalScore || 0;
            bValue = b.totalScore || 0;
        }

        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }).map((participant, index) => ({
        ...participant,
        rank: index + 1 // Assign rank based on sorted position
      }));
    }
  };

  // Get platform-specific top performers
  const getTopPerformers = (platform: string) => {
    if (platform === 'leetcode') {
      return [...participants]
        .sort((a, b) => b.leetcodeRating - a.leetcodeRating)
        .slice(0, 3);
    } else if (platform === 'codeforces') {
      return [...participants]
        .sort((a, b) => b.codeforcesRating - a.codeforcesRating)
        .slice(0, 3);
    } else if (platform === 'codechef') {
      return [...participants]
        .sort((a, b) => b.codechefRating - a.codechefRating)
        .slice(0, 3);
    } else {
      return participants.slice(0, 3);
    }
  };

  // Function to handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Update all users' ratings
      await updateUsersRating();
      
      // Fetch updated user data
      const users = await getUser();
      
      const mappedUsers = users.map(user => {
        // Calculate score only from platforms where the user has provided handles
        const calculatedScore = 
          (user.leetcodeHandle && user.leetcodeHandle !== "none" ? (user.leetcodeRating || 0) + (user.leetcodeProblemsSolved || 0) * 2 : 0) +
          (user.codeforcesHandle && user.codeforcesHandle !== "none" ? (user.codeforcesRating || 0) + (user.codeforcesProblemsSolved || 0) * 2 : 0) +
          (user.codechefHandle && user.codechefHandle !== "none" ? (user.codechefRating || 0) + (user.codechefProblemsSolved || 0) * 2 : 0);
        
        const totalScore = user.totalScore || calculatedScore;
        
        return {
          id: user.id,
          name: user.name,
          leetcodeHandle: user.leetcodeHandle !== "none" ? user.leetcodeHandle : undefined,
          codeforcesHandle: user.codeforcesHandle !== "none" ? user.codeforcesHandle : undefined,
          codechefHandle: user.codechefHandle !== "none" ? user.codechefHandle : undefined,
          leetcodeRating: user.leetcodeHandle !== "none" ? user.leetcodeRating : undefined,
          leetcodeProblemsSolved: user.leetcodeHandle !== "none" ? user.leetcodeProblemsSolved : undefined,
          codeforcesRating: user.codeforcesHandle !== "none" ? user.codeforcesRating : undefined,
          codeforcesProblemsSolved: user.codeforcesHandle !== "none" ? user.codeforcesProblemsSolved : undefined,
          codechefRating: user.codechefHandle !== "none" ? user.codechefRating : undefined,
          codechefProblemsSolved: user.codechefHandle !== "none" ? user.codechefProblemsSolved : undefined,
          totalScore: totalScore,
          avatar: user.image,
          lastUpdated: new Date().toISOString()
        };
      });

      // Sort users by total score in descending order
      const sortedUsers = [...mappedUsers].sort((a, b) => 
        (b.totalScore || 0) - (a.totalScore || 0)
      );

      // Add rank to each user based on sorted position
      const rankedUsers = sortedUsers.map((user, index) => ({
        ...user,
        rank: index + 1
      }));

      setParticipants(rankedUsers);
    } catch (error) {
      console.error('Failed to refresh participants:', error);
      // Don't change the current data on error
    } finally {
      setRefreshing(false);
    }
  };

  // Calculate stats
  const getStats = (platform: string = 'overall') => {
    if (platform === 'leetcode') {
      const leetcodeUsers = participants.filter(p => p.leetcodeHandle);
      const highestRating = leetcodeUsers.length > 0 
        ? Math.max(...leetcodeUsers.map(p => p.leetcodeRating || 0)) 
        : 0;
      const totalProblems = leetcodeUsers.reduce((sum, p) => sum + (p.leetcodeProblemsSolved || 0), 0);
      const avgProblems = leetcodeUsers.length > 0 
        ? Math.round(totalProblems / leetcodeUsers.length) 
        : 0;
      
      return [
        {
          icon: User,
          value: leetcodeUsers.length.toString(),
          label: "LeetCode Users"
        },
        {
          icon: Code,
          value: totalProblems.toString(),
          label: "Problems Solved"
        },
        {
          icon: Trophy,
          value: highestRating.toString(),
          label: "Highest Rating"
        },
        {
          icon: Sparkles,
          value: avgProblems.toString(),
          label: "Avg. Problems"
        }
      ];
    } else if (platform === 'codeforces') {
      // Similar pattern for codeforces
      const codeforcesUsers = participants.filter(p => p.codeforcesHandle);
      const highestRating = codeforcesUsers.length > 0 
        ? Math.max(...codeforcesUsers.map(p => p.codeforcesRating || 0)) 
        : 0;
      const totalProblems = codeforcesUsers.reduce((sum, p) => sum + (p.codeforcesProblemsSolved || 0), 0);
      const avgProblems = codeforcesUsers.length > 0 
        ? Math.round(totalProblems / codeforcesUsers.length) 
        : 0;
      
      return [
        {
          icon: User,
          value: participants.filter(p => p.codeforcesHandle).length.toString(),
          label: "CodeForces Users"
        },
        {
          icon: Code,
          value: participants.reduce((sum, p) => sum + p.codeforcesProblemsSolved, 0).toString(),
          label: "Problems Solved"
        },
        {
          icon: Trophy,
          value: Math.max(...participants.map(p => p.codeforcesRating || 0)).toString(),
          label: "Highest Rating"
        },
        {
          icon: Sparkles,
          value: Math.round(participants.reduce((sum, p) => sum + p.codeforcesProblemsSolved, 0) /
            Math.max(participants.filter(p => p.codeforcesHandle).length, 1)).toString(),
          label: "Avg. Problems"
        }
      ];
    } else if (platform === 'codechefHandle') {
      return [
        {
          icon: User,
          value: participants.filter(p => p.codechefProblemsSolved).length.toString(),
          label: "CodeChef Users"
        },
        {
          icon: Code,
          value: participants.reduce((sum, p) => sum + p.codechefProblemsSolved, 0).toString(),
          label: "Problems Solved"
        },
        {
          icon: Trophy,
          value: Math.max(...participants.map(p => p.codechefRating || 0)).toString(),
          label: "Highest Rating"
        },
        {
          icon: Sparkles,
          value: Math.round(participants.reduce((sum, p) => sum + p.codechefProblemsSolved, 0) /
            Math.max(participants.filter(p => p.codechefHandle).length, 1)).toString(),
          label: "Avg. Problems"
        }
      ];
    } else {
      // Overall stats
      return [
        {
          icon: User,
          value: participants.length.toString(),
          label: "Participants"
        },
        {
          icon: Code,
          value: participants.reduce((sum, p) => sum + p.leetcodeProblemsSolved + p.codeforcesProblemsSolved + p.codechefProblemsSolved, 0).toString(),
          label: "Problems Solved"
        },
        {
          icon: Trophy,
          value: Math.max(...participants.map(p => p.totalScore)).toString(),
          label: "Highest Score"
        },
        {
          icon: Sparkles,
          value: Math.max(...participants.map(p => p.leetcodeRating)).toString(),
          label: "Top LeetCode Rating"
        }
      ];
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900">
      <BackgroundSparkles />
      <Header1 />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"></div>
          <Meteors number={10} />
        </div>

        <motion.div
          style={{ y }}
          className="container mx-auto px-4 pt-24 pb-20 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-8"
          >
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-bold text-white mb-6"
            >
              Coding <span className="text-blue-400">Leaderboard</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-lg mb-8"
            >
              Track your progress and compete with fellow coders across multiple platforms
            </motion.p>
            
            {/* New Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Compete</h3>
                <p className="text-white/70">
                  Challenge yourself against other coders and climb the ranks
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                  <Code className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Track Progress</h3>
                <p className="text-white/70">
                  Monitor your performance across LeetCode, CodeForces, and CodeChef
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-4">
                  <Medal className="h-8 w-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Earn Recognition</h3>
                <p className="text-white/70">
                  Get featured as a top performer and showcase your skills
                </p>
              </motion.div>
            </div>
            
            {/* How It Works Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center mb-4 relative">
                    <span className="text-xl font-bold text-white">1</span>
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-blue-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Join the Leaderboard</h3>
                  <p className="text-white/70 text-sm">
                    Sign in and add your coding platform usernames
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center mb-4 relative">
                    <span className="text-xl font-bold text-white">2</span>
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-purple-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    ></motion.div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Solve Problems</h3>
                  <p className="text-white/70 text-sm">
                    Complete challenges on LeetCode, CodeForces, and CodeChef
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-rose-500/30 flex items-center justify-center mb-4 relative">
                    <span className="text-xl font-bold text-white">3</span>
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-rose-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    ></motion.div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Rise in Ranks</h3>
                  <p className="text-white/70 text-sm">
                    Watch your position improve as you solve more problems
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Platform Tabs */}
      <UITabs defaultValue="overall" onValueChange={setActiveTab} className="w-full mb-8 px-4 md:px-0">
        <UITabsList className="grid grid-cols-4 max-w-2xl mx-auto">
          <UITabsTrigger value="overall" className="data-[state=active]:bg-blue-600 text-xs md:text-sm">Overall</UITabsTrigger>
          <UITabsTrigger value="leetcode" className="data-[state=active]:bg-blue-600 text-xs md:text-sm">LeetCode</UITabsTrigger>
          <UITabsTrigger value="codeforces" className="data-[state=active]:bg-blue-600 text-xs md:text-sm">CodeForces</UITabsTrigger>
          <UITabsTrigger value="codechef" className="data-[state=active]:bg-blue-600 text-xs md:text-sm">CodeChef</UITabsTrigger>
        </UITabsList>

        {/* Overall Tab Content */}
        <UITabsContent value="overall" className="mt-6 px-2 md:px-0">
          {/* Stats Section */}
          <LeaderboardStats stats={getStats('overall')} />

          {/* Top Performers */}
          <TopPerformers participants={getTopPerformers('overall')} />

          {/* Main Content */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-3 md:p-6 mt-16">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search participants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>

                <div className="flex gap-2 w-full md:w-auto">
                  {user && (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
                    >
                      Join Leaderboard
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <LeaderboardTable
                participants={getSortedParticipants('overall')}
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
                isLoading={isLoading}
              />
            </div>
          </div>
        </UITabsContent>

        {/* LeetCode Tab Content */}
        <UITabsContent value="leetcode" className="mt-6 px-2 md:px-0">
          {/* Stats Section */}
          <LeaderboardStats stats={getStats('leetcode')} />

          {/* Top Performers */}
          <TopPerformers participants={getTopPerformers('leetcode')} />

          {/* Main Content */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-3 md:p-6 mt-16">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search LeetCode users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            {/* LeetCode Leaderboard Table */}
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-2 md:px-4 text-left">Rank</th>
                    <th className="py-3 px-2 md:px-4 text-left">Participant</th>
                    <th className="py-3 px-2 md:px-4 text-left">Username</th>
                    <th className="py-3 px-2 md:px-4 text-left">Rating</th>
                    <th className="py-3 px-2 md:px-4 text-left">Problems</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedParticipants('leetcode').map((participant, index) => (
                    <motion.tr
                      key={participant.id || index}
                      className={`border-b border-white/10 ${index < 3 ? "bg-gradient-to-r from-blue-500/20 to-transparent" : ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="py-3 px-2 md:px-4">
                        {index + 1}
                        {index < 3 && (
                          <span className="ml-1 md:ml-2">
                            {index === 0 && "🥇"}
                            {index === 1 && "🥈"}
                            {index === 2 && "🥉"}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 md:px-4 flex items-center gap-2 md:gap-3">
                        {participant.avatar ? (
                          <Image
                            src={participant.avatar}
                            alt={participant.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-400" />
                          </div>
                        )}
                        <span>{participant.name}</span>
                      </td>
                      <td className="py-3 px-2 md:px-4">{participant.leetcodeHandle}</td>
                      <td className="py-3 px-2 md:px-4">{participant.leetcodeRating}</td>
                      <td className="py-3 px-2 md:px-4">{participant.leetcodeProblemsSolved}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </UITabsContent>

        {/* CodeForces Tab Content */}
        <UITabsContent value="codeforces" className="mt-6 px-2 md:px-0">
          {/* Stats Section */}
          <LeaderboardStats stats={getStats('codeforces')} />

          {/* Top Performers */}
          <TopPerformers participants={getTopPerformers('codeforces')} />

          {/* Main Content */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-3 md:p-6 mt-16">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search CodeForces users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            {/* CodeForces Leaderboard Table */}
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-2 md:px-4 text-left">Rank</th>
                    <th className="py-3 px-2 md:px-4 text-left">Participant</th>
                    <th className="py-3 px-2 md:px-4 text-left">Username</th>
                    <th className="py-3 px-2 md:px-4 text-left">Rating</th>
                    <th className="py-3 px-2 md:px-4 text-left">Problems</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedParticipants('codeforces').map((participant, index) => (
                    <motion.tr
                      key={participant.id || index}
                      className={`border-b border-white/10 ${index < 3 ? "bg-gradient-to-r from-blue-500/20 to-transparent" : ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="py-3 px-2 md:px-4">
                        {index + 1}
                        {index < 3 && (
                          <span className="ml-1 md:ml-2">
                            {index === 0 && "🥇"}
                            {index === 1 && "🥈"}
                            {index === 2 && "🥉"}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 md:px-4 flex items-center gap-2 md:gap-3">
                        {participant.avatar ? (
                          <img
                            src={participant.avatar}
                            alt={participant.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-400" />
                          </div>
                        )}
                        <span>{participant.name}</span>
                      </td>
                      <td className="py-3 px-2 md:px-4">{participant.codeforcesHandle}</td>
                      <td className="py-3 px-2 md:px-4">{participant.codeforcesRating}</td>
                      <td className="py-3 px-2 md:px-4">{participant.codeforcesProblemsSolved}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </UITabsContent>

        {/* CodeChef Tab Content */}
        <UITabsContent value="codechef" className="mt-6 px-2 md:px-0">
          {/* Stats Section */}
          <LeaderboardStats stats={getStats('codechef')} />

          {/* Top Performers */}
          <TopPerformers participants={getTopPerformers('codechef')} />

          {/* Main Content */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-3 md:p-6 mt-16">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                <div className="relative flex-1 w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search CodeChef users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            {/* CodeChef Leaderboard Table */}
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-2 md:px-4 text-left">Rank</th>
                    <th className="py-3 px-2 md:px-4 text-left">Participant</th>
                    <th className="py-3 px-2 md:px-4 text-left">Username</th>
                    <th className="py-3 px-2 md:px-4 text-left">Rating</th>
                    <th className="py-3 px-2 md:px-4 text-left">Problems</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedParticipants('codechef').map((participant, index) => (
                    <motion.tr
                      key={participant.id || index}
                      className={`border-b border-white/10 ${index < 3 ? "bg-gradient-to-r from-blue-500/20 to-transparent" : ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="py-3 px-2 md:px-4">
                        {index + 1}
                        {index < 3 && (
                          <span className="ml-1 md:ml-2">
                            {index === 0 && "🥇"}
                            {index === 1 && "🥈"}
                            {index === 2 && "🥉"}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 md:px-4 flex items-center gap-2 md:gap-3">
                        {participant.avatar ? (
                          <img
                            src={participant.avatar}
                            alt={participant.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-400" />
                          </div>
                        )}
                        <span>{participant.name}</span>
                      </td>
                      <td className="py-3 px-2 md:px-4">{participant.codechefHandle}</td>
                      <td className="py-3 px-2 md:px-4">{participant.codechefRating}</td>
                      <td className="py-3 px-2 md:px-4">{"-"}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </UITabsContent>
      </UITabs>

      {/* Leaderboard Form Modal */}
      {showForm && (
        <LeaderboardForm
          onClose={() => setShowForm(false)}
          onSubmit={async (data) => {
            try {
              // Use the createUser server action directly
              const result = await createUser({
                name: data.name,
                email: data.email,
                leetcodeHandle: data.leetcodeHandle || "none",
                codeforcesHandle: data.codeforcesHandle || "none",
                codechefHandle: data.codechefHandle || "none"
              });
              
              if (!result.success) {
                throw new Error(result.error || "Failed to create user");
              }
              
              // Refresh data to show the new entry
              await handleRefresh();
              setShowForm(false);
            } catch (error) {
              console.error('Failed to add participant:', error);
              // Show error message to user
              alert('Failed to add participant. Please try again.');
            }
          }}
        />
      )}

      {/* Meteors Effect */}
      <Meteors number={20} />

      <Footer />
    </div>
  );
}