"use client";
import { Header1 } from "@/components/ui/header";
import { Meteors } from "@/components/ui/meteor";
import { BackgroundSparkles } from "@/components/ui/animations/BackgroundSparkles";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Calendar, Users, Clock, Trophy, BookOpen, Target } from "lucide-react";
import { useRef } from "react";
import { Footer } from "@/components/ui/footer";

interface Workshop {
  number: string;
  title: string;
  duration: string;
  coursePlanning: {
    day: string;
    content: string;
  }[];
}

export default function WorkshopPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  const workshops: Workshop[] = [
    {
      number: "1",
      title: "INTRODUCTION TO DATA SCIENCE",
      duration: "2 days",
      coursePlanning: [
        {
          day: "Day 1",
          content: "What is Data Science, Applications of Data Science, Python Libraries for Data Science, NumPy- Arrays, Standard Data Types, UFuncs, Aggregates, Broadcasting, Pandas- Series Object, DataFrame Object, Handling Missing Data, Trade-Offs in Missing Data Conventions, Missing Data in Pandas, Operating on Null Values, Combining Datasets: Concat and Append, Aggregation and Grouping, Matplotlib"
        },
        {
          day: "Day 2",
          content: "Linear Regression with Boston Housing Price Dataset, Logistic Regression with Titanic Dataset"
        }
      ]
    },
    {
      number: "2",
      title: "C/C++ WORKSHOP",
      duration: "3 days",
      coursePlanning: [
        {
          day: "Day 1",
          content: "Brief history of C, Constants and Variables, Keywords, Data Types in C, Operators, Storage Class, Functions and Conditional statements"
        },
        {
          day: "Day 2",
          content: "Looping Statements, Introduction to Arrays and Strings in C"
        },
        {
          day: "Day 3",
          content: "Pointers in C and Transition from C to C++"
        }
      ]
    },
    {
      number: "3",
      title: "DATA STRUCTURES WORKSHOP",
      duration: "3 days",
      coursePlanning: [
        {
          day: "Day 1",
          content: "Introduction to Data Structures, Stacks, Queues, Linked Lists, Linked Stacks and Linked Queues."
        },
        {
          day: "Day 2",
          content: "Trees, Binary Tree, Binary Tree Traversal, Binary Search Tree and Operations on BST."
        },
        {
          day: "Day 3",
          content: "Introduction to Graphs, Terminologies, Representation of Graphs, BFS, DFS, Dijkstra's Algorithm, Weighted Graphs, Spanning Trees, Prim's and Kruskal's Algorithm."
        }
      ]
    }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Students Trained" },
    { icon: Clock, value: "48+", label: "Hours of Content" },
    { icon: Trophy, value: "15+", label: "Projects Built" },
    { icon: BookOpen, value: "6+", label: "Domains Covered" },
  ];

  const benefits = [
    {
      title: "Hands-on Experience",
      description: "Work on real-world projects and gain practical experience",
      icon: Target,
    },
    {
      title: "Expert Mentorship",
      description: "Learn from industry professionals and experienced developers",
      icon: Users,
    },
    {
      title: "Certification",
      description: "Receive recognized certificates upon completion",
      icon: Trophy,
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900 relative overflow-hidden">
      <BackgroundSparkles />
      <Header1 />
      
      {/* Hero Section */}
      <motion.div 
        style={{ y }}
        className="pt-24 px-4 md:px-8"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Technical <span className="text-blue-400">Workshops</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            Enhance your technical skills with our intensive workshops led by industry experts
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20"
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

        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Our <span className="text-blue-400">Workshops?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                >
                  <Icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/60">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Workshops Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Available <span className="text-blue-400">Workshops</span>
          </h2>
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.number}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#0A0A2C]/80 rounded-lg p-6 backdrop-blur-sm border border-white/10 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-rose-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-rose-500/10 transition-all duration-500" />
              
              <div className="flex items-start gap-6 relative z-10">
                <motion.div 
                  className="text-8xl font-bold text-white/10"
                  whileHover={{ scale: 1.1, color: "rgba(59, 130, 246, 0.2)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {workshop.number}
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {workshop.title}
                    </h2>
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="flex items-center text-blue-400"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm bg-blue-500/10 px-3 py-1 rounded-full">
                          {workshop.duration}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-blue-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Course Planning
                    </h3>
                    {workshop.coursePlanning.map((day, idx) => (
                      <motion.div 
                        key={day.day}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                        className="text-white/80 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <span className="font-semibold text-blue-400">{day.day}:</span> {day.content}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center gap-2 group"
                    >
                      Join Now 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 border border-white/20 text-white rounded-full hover:bg-white/10 transition flex items-center gap-2 group"
                    >
                      <span>Resources</span>
                      <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-white/70 mb-8">Join our workshops and take your first step towards technical excellence</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center gap-2 mx-auto"
          >
            Register Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
      <Footer />
      <Meteors number={20} />
    </div>
  );
} 