"use client";

import { Header1 } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Link2, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle 
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      // Send form data to our API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setFormStatus('sent');
      // Clear form data
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 9123388359", "+91 9876543210"],
      color: "text-green-400"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["ieee@bitmesra.ac.in"],
      color: "text-blue-400"
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["BIT Mesra, Ranchi", "Jharkhand, India - 835215"],
      color: "text-red-400"
    },
    
  ];

  const faqs = [
    {
      question: "How can I join IEEE BIT Mesra?",
      answer: "You can join by filling out the membership form on our website and passing the coding test."
    },
    {
      question: "What are the benefits of joining?",
      answer: "Members get access to exclusive workshops, events, networking opportunities, and IEEE resources."
    },
    {
      question: "Do you offer internship opportunities?",
      answer: "Yes, we regularly collaborate with industry partners to provide internship opportunities to our members."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900 relative">
      <Header1 />
      <Meteors number={20} />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 pt-24"
      >
        {/* Hero Section */}
        <div className="relative mb-16">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold text-white text-center mb-6"
          >
            Get in <span className="text-blue-400">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white/70 text-center max-w-2xl mx-auto"
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-rose-500/20 blur-3xl -z-10" />
        </div>

        {/* Contact Info Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col items-center text-center"
              >
                <Icon className={`w-8 h-8 ${info.color} mb-4`} />
                <h3 className="text-white text-lg font-semibold mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-white/60">{detail}</p>
                ))}
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          {/* Contact Form */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="text-blue-400 w-6 h-6" />
              <h2 className="text-blue-400 text-2xl">Send us a message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div whileHover={{ y: -2 }}>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <textarea
                  placeholder="Message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  formStatus === 'sending' ? 'opacity-70 cursor-wait' : ''
                }`}
                disabled={formStatus === 'sending'}
                type="submit"
              >
                {formStatus === 'sending' ? (
                  'Sending...'
                ) : formStatus === 'sent' ? (
                  'Message Sent!'
                ) : formStatus === 'error' ? (
                  'Error! Try Again'
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl text-blue-400 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <h3 className="text-white font-semibold">{faq.question}</h3>
                    <p className="text-white/60">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl text-blue-400 mb-6">Connect With Us</h2>
              <div className="flex gap-6">
                {[Instagram, Twitter, Facebook, Linkedin, Link2].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}