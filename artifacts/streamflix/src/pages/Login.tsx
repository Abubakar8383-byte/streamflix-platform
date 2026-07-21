import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      setLocation("/profiles");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/streamflix-bg/1920/1080" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-6">
        <Link href="/" className="text-primary font-black text-3xl tracking-tighter uppercase" data-testid="link-home">
          StreamFlix
        </Link>
      </header>

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl w-full max-w-md shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Email or phone number" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 bg-white/5 border-white/10 text-white focus-visible:ring-primary focus-visible:border-primary transition-all text-base px-4"
                  data-testid="input-email"
                />
              </div>
              <div className="relative">
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 bg-white/5 border-white/10 text-white focus-visible:ring-primary focus-visible:border-primary transition-all text-base px-4"
                  data-testid="input-password"
                />
              </div>
            </div>
            
            <Button type="submit" size="lg" className="w-full h-12 text-lg font-semibold" data-testid="btn-submit">
              Sign In
            </Button>
            
            <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" className="rounded border-white/20 bg-transparent text-primary focus:ring-primary/20 accent-primary" />
                Remember me
              </label>
              <a href="#" className="hover:underline hover:text-white transition-colors">Need help?</a>
            </div>
          </form>

          <div className="mt-16 text-muted-foreground">
            <p>
              New to StreamFlix?{" "}
              <Link href="/signup" className="text-white hover:underline transition-colors font-medium">
                Sign up now.
              </Link>
            </p>
            <p className="mt-4 text-xs text-muted-foreground/60 leading-relaxed">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}