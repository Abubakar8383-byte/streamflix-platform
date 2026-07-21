import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  email: string;
};

type Profile = {
  name: string;
  avatarSeed: string;
};

type AuthState = {
  user: User | null;
  profile: Profile | null;
  login: (email: string) => void;
  logout: () => void;
  selectProfile: (name: string, avatarSeed: string) => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const profilesList = [
  { name: "Alex", avatarSeed: "Alex" },
  { name: "Jamie", avatarSeed: "Jamie" },
  { name: "Sam", avatarSeed: "Sam" }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("sidflix_user");
    const storedProfile = localStorage.getItem("sidflix_profile");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    const newUser = { email };
    setUser(newUser);
    localStorage.setItem("sidflix_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("sidflix_user");
    localStorage.removeItem("sidflix_profile");
  };

  const selectProfile = (name: string, avatarSeed: string) => {
    const newProfile = { name, avatarSeed };
    setProfile(newProfile);
    localStorage.setItem("sidflix_profile", JSON.stringify(newProfile));
  };

  if (isLoading) {
    return null; // Or a sleek loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, selectProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
