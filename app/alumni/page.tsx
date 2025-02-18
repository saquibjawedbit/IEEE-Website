"use client";
import { Header1 } from "@/components/ui/header";
import { LinkedinIcon, MailIcon, Building2, MapPin, Quote, ArrowRight, Search, Filter } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import { useState } from "react";

interface AlumniProfile {
  name: string;
  role: string;
  company: string;
  location: string;
  batch: string;
  description: string;
  achievements: string[];
  image: string;
  linkedin: string;
  email: string;
}

export default function AlumniPage() {
  const [selectedBatch, setSelectedBatch] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const alumni: AlumniProfile[] = [
    {
      name: "Prateek Kumar",
      role: "Senior Software Engineer",
      company: "Texas Instruments",
      location: "Dallas, USA",
      batch: "2020",
      description: "Specializing in embedded systems and IoT solutions. Leading a team of 5 engineers.",
      achievements: [
        "Led development of critical firmware updates",
        "Patent holder for IoT innovation",
        "Published in IEEE journal"
      ],
      image: "/alumni/prateek.jpg",
      linkedin: "https://linkedin.com",
      email: "mailto:prateek@gmail.com"
    },
    {
      name: "Shukham Singh",
      role: "Software Development Engineer",
      company: "Amazon",
      location: "Seattle, USA",
      batch: "2021",
      description: "Working on AWS cloud infrastructure and distributed systems.",
      achievements: [
        "Optimized cloud computing costs by 30%",
        "Developed high-scale microservices",
        "AWS certified solutions architect"
      ],
      image: "/alumni/shukham.jpg",
      linkedin: "https://linkedin.com",
      email: "mailto:shukham@gmail.com"
    },
  ];

  const stats = [
    { number: "500+", label: "Alumni Network" },
    { number: "40+", label: "Countries" },
    { number: "200+", label: "Companies" },
    { number: "50+", label: "Entrepreneurs" },
  ];

  const batches = ["all", "2021", "2020", "2019", "2018"];

  const filteredAlumni = alumni.filter(profile => {
    const batchMatch = selectedBatch === "all" || profile.batch === selectedBatch;
    const searchMatch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       profile.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       profile.role.toLowerCase().includes(searchQuery.toLowerCase());
    return batchMatch && searchMatch;
  });

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
            Our <span className="text-blue-400">Alumni</span> Network
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white/70 text-center max-w-2xl mx-auto mb-12"
          >
            Connect with our distinguished alumni making waves across the globe
          </motion.p>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-rose-500/20 blur-3xl -z-10" />
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10"
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search alumni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-white/60 w-4 h-4" />
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {batches.map(batch => (
                  <option key={batch} value={batch} className="bg-[#0A0A2C]">
                    {batch === "all" ? "All Batches" : `Batch ${batch}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {filteredAlumni.map((profile, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden group"
            >
              <div className="aspect-square relative">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                <div className="space-y-2">
                  <h3 className="text-blue-400">{profile.role}</h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Building2 className="w-4 h-4" />
                    {profile.company}
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                </div>
                <p className="text-white/70 text-sm">{profile.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white">Achievements:</h4>
                  <ul className="text-sm text-white/60 space-y-1">
                    {profile.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-400 mt-2" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4">
                  <motion.a 
                    href={profile.linkedin}
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-white transition"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </motion.a>
                  <motion.a 
                    href={profile.email}
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-white transition"
                  >
                    <MailIcon className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connect CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm rounded-lg p-12 border border-white/10 mb-20"
        >
          <Quote className="w-8 h-8 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Are You an Alumni?</h2>
          <p className="text-white/70 mb-8">Join our exclusive alumni network and stay connected with your alma mater</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center gap-2 mx-auto"
          >
            Connect With Us
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
} 