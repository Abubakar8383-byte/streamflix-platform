import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function extractApiError(err: unknown): string {
  if (err && typeof err === "object" && "data" in err) {
    const data = (err as { data: unknown }).data;
    if (data && typeof data === "object" && "error" in data) {
      return String((data as { error: string }).error);
    }
  }
  return "Something went wrong. Please try again.";
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(email, password);
      setLocation("/profiles");
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setIsSubmitting(false);
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
                disabled={isSubmitting}
                className="h-14 bg-white/5 border-white/10 text-white focus-visible:ring-primary focus-visible:border-primary transition-all text-base px-4"
                data-testid="input-email"
              />
              <Input
                type="password"
                placeholder="Password (min. 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
                className="h-14 bg-white/5 border-white/10 text-white focus-visible:ring-primary focus-visible:border-primary transition-all text-base px-4"
                data-testid="input-password"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isSubmitting}
                className="h-14 bg-white/5 border-white/10 text-white focus-visible:ring-primary focus-visible:border-primary transition-all text-base px-4"
                data-testid="input-confirm-password"
              />
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-destructive/15 border border-destructive/30 px-4 py-3 text-sm text-destructive"
                data-testid="text-error"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-lg font-semibold"
              disabled={isSubmitting}
              data-testid="btn-submit"
            >
              {isSubmitting ? "Creating account…" : "Sign Up"}
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
