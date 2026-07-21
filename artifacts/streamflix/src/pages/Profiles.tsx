import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect } from "react";

const profilesList = [
  { name: "Alex", avatarSeed: "Alex2" },
  { name: "Jamie", avatarSeed: "Jamie3" },
  { name: "Sam", avatarSeed: "Sam4" }
];

export default function Profiles() {
  const { selectProfile, user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  if (!user) return null;

  const handleSelect = (name: string, seed: string) => {
    selectProfile(name, seed);
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-center text-white mb-10 md:mb-16 tracking-tight">
          Who's watching?
        </h1>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {profilesList.map((profile, index) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-4 cursor-pointer group"
              onClick={() => handleSelect(profile.name, profile.avatarSeed)}
              data-testid={`profile-${profile.name}`}
            >
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-md overflow-hidden relative border-2 border-transparent group-hover:border-white transition-all duration-300">
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors z-10" />
                <img 
                  src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${profile.avatarSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-muted-foreground group-hover:text-white text-lg md:text-xl transition-colors font-medium">
                {profile.name}
              </span>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: profilesList.length * 0.1 }}
            className="flex flex-col items-center gap-4 cursor-pointer group"
          >
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-md border-2 border-transparent group-hover:bg-white/10 transition-all duration-300 flex items-center justify-center bg-card">
              <Plus className="w-12 h-12 text-muted-foreground group-hover:text-white transition-colors" />
            </div>
            <span className="text-muted-foreground group-hover:text-white text-lg md:text-xl transition-colors font-medium">
              Add Profile
            </span>
          </motion.div>
        </div>

        <div className="mt-20 flex justify-center">
          <button className="px-6 py-2 border border-muted-foreground text-muted-foreground hover:border-white hover:text-white tracking-widest uppercase text-sm font-medium transition-colors">
            Manage Profiles
          </button>
        </div>
      </motion.div>
    </div>
  );
}