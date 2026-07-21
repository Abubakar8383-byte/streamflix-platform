import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && password === confirmPassword) {
      login(email);
      setLocation("/profiles");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/sidflix-bg2/1920/1080" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-6">
        <Link href="/" className="text-primary font-black text-3xl tracking-tighter uppercase" data-testid="link-home">
          SIDFLIX
        </Link>
      </header>

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl w-full max-w-md shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">Start your cinematic journey today.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 bg-white/5 border-white/10 text-white focus-visible:ring-primary focus-visible:border-primary transition-all text-base px-4"
                data-testid="input-email"
              />
              <Input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-14 bg-white/5 border-white/10 text-white focus-visible:ring-primary focus-visible:border-primary transition-all text-base px-4"
                data-testid="input-password"
              />
              <Input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-14 bg-white/5 border-white/10 text-white focus-visible:ring-primary focus-visible:border-primary transition-all text-base px-4"
                data-testid="input-confirm-password"
              />
            </div>
            
            <Button type="submit" size="lg" className="w-full h-12 text-lg font-semibold" data-testid="btn-submit">
              Sign Up
            </Button>
          </form>

          <div className="mt-8 text-center text-muted-foreground">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:underline transition-colors font-medium">
                Sign in.
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}