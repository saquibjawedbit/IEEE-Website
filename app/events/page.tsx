"use client";
import { EventCard } from "@/components/ui/events/EventCard";
import { Header1 } from "@/components/ui/header";
import { Meteors } from "@/components/ui/meteor";
import { BackgroundSparkles } from "@/components/ui/animations/BackgroundSparkles";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Users, Trophy, Code, Target, GitBranch, Cpu, Timer } from "lucide-react";
import { useRef } from "react";
import { Footer } from "@/components/ui/footer";

interface Event {
  title: string;
  date: string;
  status: "LIVE" | "UPCOMING" | "COMPLETED";
  description: string;
  registrations: string;
  remainingTime: string | null;
  type: "Hackathon" | "Workshop" | "Competition" | "Meetup";
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  techStack: string[];
  prizes?: string[];
  teamSize?: string;
  venue: string;
}

export default function EventsPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const events: Event[] = [
    {
      title: "Mega Project Hackathon",
      date: "Wednesday, January 29",
      status: "LIVE",
      description: "48-hour hackathon to build innovative solutions for real-world problems",
      registrations: "100+ registrations",
      remainingTime: null,
      type: "Hackathon",
      skillLevel: "Intermediate",
      techStack: ["React", "Node.js", "Python", "AWS"],
      prizes: ["₹50,000", "₹30,000", "₹20,000"],
      teamSize: "2-4 members",
      venue: "Main Auditorium"
    },
    {
      title: "L.E.A.D - Leadership in Engineering",
      date: "Friday, February 16",
      status: "UPCOMING",
      description: "Technical leadership workshop with industry experts",
      registrations: "100+ registrations",
      remainingTime: "35d 2h remaining",
      type: "Workshop",
      skillLevel: "Advanced",
      techStack: ["System Design", "Architecture", "Team Management"],
      venue: "Virtual"
    },
    {
      title: "Coding Weekender",
      date: "Wednesday, January 29",
      status: "UPCOMING",
      description: "Weekend-long competitive coding challenge",
      registrations: "100+ registrations",
      remainingTime: "18d 8h remaining",
      type: "Competition",
      skillLevel: "Beginner",
      techStack: ["C++", "Java", "Python", "DSA"],
      prizes: ["₹10,000", "₹7,000", "₹5,000"],
      teamSize: "Individual",
      venue: "Lab Complex"
    }
  ];

  const stats = [
    { icon: Trophy, value: "20+", label: "Events Conducted" },
    { icon: Users, value: "1000+", label: "Student Participants" },
    { icon: Code, value: "50K+", label: "Lines of Code" },
    { icon: GitBranch, value: "100+", label: "Projects Built" },
  ];

  const categories = [
    { icon: Cpu, label: "Hackathons" },
    { icon: Code, label: "Competitions" },
    { icon: Users, label: "Workshops" },
    { icon: Target, label: "Meetups" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900 relative overflow-hidden">
      <BackgroundSparkles />
      <Header1 />
      
      {/* Hero Section */}
      <motion.div 
        style={{ y }}
        className="container mx-auto px-4 pt-24"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold text-white mb-6"
          >
            Upcoming <span className="text-blue-400">Events</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            Join our technical events and showcase your skills
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10"
              >
                <Icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all"
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <div className="absolute inset-0 bg-grid opacity-20 -z-10" />
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 rounded-lg" />
              
              <div className="bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="flex items-center gap-2 text-blue-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{event.date}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {event.title}
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                    {event.type}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                    {event.skillLevel}
                  </span>
                </div>
                
                {event.status === "LIVE" && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-500 text-sm">LIVE NOW</span>
                  </div>
                )}
                
                {event.remainingTime && (
                  <div className="flex items-center gap-2 mb-4">
                    <Timer className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm">{event.remainingTime}</span>
                  </div>
                )}
                
                <p className="text-white/70 mb-4">{event.description}</p>
                
                {event.techStack && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-white/80 mb-2">Tech Stack:</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.techStack.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {event.prizes && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-white/80 mb-2">Prizes:</h3>
                    <div className="flex gap-2">
                      {event.prizes.map((prize, i) => (
                        <span key={i} className="text-sm text-yellow-400">
                          {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"} {prize}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                  <span>{event.registrations}</span>
                  {event.teamSize && <span>{event.teamSize}</span>}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span>📍 {event.venue}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto text-center mt-20 mb-12 bg-white/5 backdrop-blur-sm rounded-lg p-12 border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Want to Host an Event?</h2>
          <p className="text-white/70 mb-8">Have an idea for a technical event? Let's make it happen!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Submit Proposal
          </motion.button>
        </motion.div>
      </motion.div>
      <Footer />
      <Meteors number={20} />
    </div>
  );
} 