"use client";
import { Header1 } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Users, Trophy, Target, BookOpen, Rocket, Heart } from "lucide-react";

export default function AboutUsPage() {
  const milestones = [
    { year: "2018", title: "Club Founded", description: "Started with 20 passionate members" },
    { year: "2019", title: "First Hackathon", description: "Hosted 200+ participants from across India" },
    { year: "2020", title: "Virtual Transition", description: "Successfully adapted to online events" },
    { year: "2021", title: "Global Recognition", description: "Featured in IEEE Spotlight" },
    { year: "2022", title: "Innovation Hub", description: "Launched state-of-the-art coding lab" },
    { year: "2023", title: "Record Growth", description: "500+ active members and growing" },
  ];

  const values = [
    { icon: Code, title: "Innovation", description: "Pushing boundaries in technology" },
    { icon: Users, title: "Community", description: "Building strong tech networks" },
    { icon: Heart, title: "Inclusivity", description: "Welcome to all skill levels" },
    { icon: Target, title: "Excellence", description: "Striving for quality in everything" },
  ];

  const achievements = [
    "Best IEEE Student Branch 2023",
    "National Hackathon Champions",
    "100+ Technical Workshops Conducted",
    "50+ Research Papers Published",
    "Industry Partnership Excellence Award",
    "Community Impact Recognition",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900 relative">
      <Header1 />
      <Meteors number={20} />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 pt-24"
      >
        <div className="relative">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold text-white mb-6 text-center"
          >
            About <span className="text-blue-400">IEEE BIT Mesra</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white/70 text-center max-w-2xl mx-auto mb-12"
          >
            Fostering innovation and technical excellence since 2018
          </motion.p>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-rose-500/20 blur-3xl -z-10" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative rounded-2xl overflow-hidden group"
          >
            <Image
              src="/team-photo.jpg"
              alt="IEEE Team"
              width={600}
              height={400}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-4xl text-blue-400 font-bold">Who are we?</h2>
            <h3 className="text-2xl text-white font-semibold">
              Empowering the next generation of tech innovators
            </h3>
            <p className="text-gray-400 leading-relaxed">
              IEEE Student Branch at BIT Mesra is a vibrant community of tech enthusiasts, innovators, and future leaders. We're dedicated to fostering technical excellence, innovation, and professional growth among students through hands-on projects, workshops, hackathons, and industry connections.
            </p>
            <motion.div
              whileHover={{ x: 5 }}
              className="inline-block"
            >
              <Link 
                href="/team"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
              >
                Meet our team <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Our Values */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our <span className="text-blue-400">Values</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                >
                  <Icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-white/60">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our <span className="text-blue-400">Journey</span></h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/10" />
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 text-right">
                  <div className="text-blue-400 text-xl font-bold mb-2">{milestone.year}</div>
                  <h3 className="text-white text-lg font-semibold mb-1">{milestone.title}</h3>
                  <p className="text-white/60">{milestone.description}</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-blue-400 relative z-10" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 mb-20"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our <span className="text-blue-400">Achievements</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
              >
                <Trophy className="w-6 h-6 text-blue-400 mb-4" />
                <p className="text-white">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Us CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm rounded-lg p-12 border border-white/10 mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-white/70 mb-8">Be part of something bigger. Join us in our mission to innovate and excel.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center gap-2 mx-auto"
          >
            Become a Member
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
} 