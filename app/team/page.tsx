"use client";
import { Header1 } from "@/components/ui/header";
import { LinkedinIcon, MailIcon, GithubIcon, TwitterIcon, Code2, Users2, Trophy, Rocket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  github: string;
  twitter: string;
  email: string;
  department: string;
  bio: string;
  skills: string[];
  achievements: string[];
}

export default function TeamPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const departments = [
    "all",
    "Technical",
    "Management",
    "Design",
    "Content",
    "PR & Marketing"
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "prateek",
      role: "Technical Head",
      image: "/team/john.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "john@ieee.com",
      department: "Technical",
      bio: "Full-stack developer with a passion for AI and Machine Learning",
      skills: ["React", "Node.js", "Python", "TensorFlow"],
      achievements: ["Best Developer Award 2023", "3x Hackathon Winner"]
    },
    {
      name: "Shauryaman",
      role: "Design Lead",
      image: "/team/sarah.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "sarah@ieee.com",
      department: "Design",
      bio: "UI/UX enthusiast with expertise in creating intuitive user experiences",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      achievements: ["Design Excellence Award", "UI/UX Hackathon Winner"]
    },
    {
      name: "Raj Patel",
      role: "Management Head",
      image: "/team/raj.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "raj@ieee.com",
      department: "Management",
      bio: "Strategic planner with experience in organizing large-scale tech events",
      skills: ["Event Management", "Leadership", "Team Building", "Strategy"],
      achievements: ["Best Manager 2023", "Successful TechFest Organization"]
    },
    {
      name: "Priya Sharma",
      role: "Content Lead",
      image: "/team/priya.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "priya@ieee.com",
      department: "Content",
      bio: "Technical writer and content strategist with a flair for storytelling",
      skills: ["Technical Writing", "SEO", "Content Strategy", "Blogging"],
      achievements: ["Best Content Award", "1M+ Blog Views"]
    },
    {
      name: "Alex Chen",
      role: "PR & Marketing Head",
      image: "/team/alex.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "alex@ieee.com",
      department: "PR & Marketing",
      bio: "Digital marketing specialist focused on community growth",
      skills: ["Social Media", "Brand Strategy", "Analytics", "Community Building"],
      achievements: ["200% Community Growth", "Best Marketing Campaign 2023"]
    },
    {
      name: "sukham singh",
      role: "Technical Core",
      image: "/team/mike.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "mike@ieee.com",
      department: "Technical",
      bio: "Backend developer specializing in scalable systems",
      skills: ["Java", "Spring Boot", "AWS", "Microservices"],
      achievements: ["System Architecture Award", "Tech Blog Contributor"]
    },
    {
      name: "Lisa Wang",
      role: "Design Core",
      image: "/team/lisa.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "lisa@ieee.com",
      department: "Design",
      bio: "Motion designer and illustrator creating engaging visual experiences",
      skills: ["After Effects", "Illustration", "Animation", "3D Modeling"],
      achievements: ["Best Animation Award", "Featured Designer 2023"]
    },
    {
      name: "Aditya Kumar",
      role: "Management Core",
      image: "/team/aditya.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "aditya@ieee.com",
      department: "Management",
      bio: "Project coordinator with expertise in team leadership",
      skills: ["Project Management", "Agile", "Risk Management", "Budgeting"],
      achievements: ["Successful Hackathon Organization", "Leadership Award"]
    },
    {
      name: "Emma Davis",
      role: "Content Creator",
      image: "/team/emma.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "emma@ieee.com",
      department: "Content",
      bio: "Creative writer with a focus on technical documentation",
      skills: ["Content Writing", "Documentation", "Editing", "Social Media"],
      achievements: ["Best Blog Series", "Documentation Excellence Award"]
    },
    {
      name: "Tom Wilson",
      role: "PR Executive",
      image: "/team/tom.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "tom@ieee.com",
      department: "PR & Marketing",
      bio: "Public relations specialist with a background in tech communication",
      skills: ["Media Relations", "Event Promotion", "Branding", "Networking"],
      achievements: ["PR Campaign of the Year", "Media Coverage Record"]
    }
  ];

  const stats = [
    { icon: Code2, number: "30+", label: "Active Projects" },
    { icon: Users2, number: "50+", label: "Team Members" },
    { icon: Trophy, number: "20+", label: "Awards Won" },
    { icon: Rocket, number: "100+", label: "Events Organized" },
  ];

  const filteredMembers = teamMembers.filter(member => 
    selectedDepartment === "all" || member.department === selectedDepartment
  );

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
            Meet Our <span className="text-blue-400">Team</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white/70 text-center max-w-2xl mx-auto mb-12"
          >
            The passionate individuals driving innovation and excellence at IEEE BIT Mesra
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10"
              >
                <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {departments.map((dept, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-6 py-2 rounded-full text-sm transition-colors ${
                selectedDepartment === dept
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {dept === "all" ? "All Teams" : dept}
            </motion.button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 group"
            >
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400">{member.role}</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-white/70 text-sm">{member.bio}</p>
                
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Achievements:</h4>
                  <ul className="text-sm text-white/60 space-y-1">
                    {member.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Trophy className="w-4 h-4 text-blue-400 mt-0.5" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <motion.a
                    href={member.linkedin}
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-white transition"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={member.github}
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-white transition"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={member.twitter}
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-white transition"
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={member.email}
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

        {/* Join the Team CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm rounded-lg p-12 border border-white/10 mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Want to Join Our Team?</h2>
          <p className="text-white/70 mb-8">
            We're always looking for passionate individuals to join our community
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Apply Now
          </motion.button>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
} 