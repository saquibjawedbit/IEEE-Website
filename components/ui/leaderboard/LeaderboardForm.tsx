import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createUser } from "@/actions/createUser";
import { useAuth } from "@/contexts/AuthContext";

interface LeaderboardFormProps {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export function LeaderboardForm({ onClose, onSubmit }: LeaderboardFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    leetcodeHandle: "",
    codeforcesHandle: "",
    codechefHandle: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-fill email from logged in user
  useEffect(() => {
    if (user && user.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.leetcodeHandle.trim() && !formData.codeforcesHandle.trim() && !formData.codechefHandle.trim()) {
      newErrors.platforms = "At least one platform username is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        setSubmitSuccess(true);
        
        // Reset form after successful submission
        setFormData({
          name: "",
          leetcodeHandle: "",
          codeforcesHandle: "",
          codechefHandle: "",
          email: user?.email || "",
        });
        
        // Close the form after a short delay to show success message
        setTimeout(() => {
          onClose();
        }, 1500);
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ submit: "Failed to submit. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-6 w-full max-w-md relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-4">Join the Leaderboard</h2>
        
        {/* Important notice for users */}
        <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-300 font-medium">Important Information</p>
              <ul className="text-white/80 text-sm mt-1 list-disc pl-4 space-y-1">
                <li>Please enter <span className="text-blue-300 font-medium">all your platform usernames</span> at once to avoid any errors.</li>
                <li>Your email is automatically filled with your registered account email.</li>
                <li>Your profile will be updated with your competitive programming stats.</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Form content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-white/80 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white/70 focus:outline-none cursor-not-allowed pl-9"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            </div>
            <p className="text-white/50 text-xs mt-1">Email is automatically set to your account email</p>
          </div>
          
          <div>
            <label className="block text-white/80 mb-1">LeetCode Username</label>
            <input
              type="text"
              name="leetcodeHandle"
              value={formData.leetcodeHandle}
              onChange={handleChange}
              className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your LeetCode username"
            />
          </div>
          
          <div>
            <label className="block text-white/80 mb-1">CodeForces Username</label>
            <input
              type="text"
              name="codeforcesHandle"
              value={formData.codeforcesHandle}
              onChange={handleChange}
              className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your CodeForces username"
            />
          </div>
          
          <div>
            <label className="block text-white/80 mb-1">CodeChef Username</label>
            <input
              type="text"
              name="codechefHandle"
              value={formData.codechefHandle}
              onChange={handleChange}
              className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your CodeChef username"
            />
          </div>
          
          {errors.platforms && <p className="text-red-500 text-sm">{errors.platforms}</p>}
          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
          
          {submitSuccess ? (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center mt-6">
              <p className="text-green-400 font-medium">Successfully joined the leaderboard!</p>
              <p className="text-white/70 text-sm mt-1">Your profile will be updated shortly.</p>
            </div>
          ) : (
            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Join Leaderboard"}
              </Button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}