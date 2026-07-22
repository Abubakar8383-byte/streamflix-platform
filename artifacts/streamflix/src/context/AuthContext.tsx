import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAuthMe,
  useAuthLogin,
  useAuthSignup,
  useAuthLogout,
  getAuthMeQueryKey,
} from "@workspace/api-client-react";
import type { AuthUser } from "@workspace/api-client-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Profile = {
  name: string;
  avatarSeed: string;
};

type AuthState = {
  user: AuthUser | null;
  profile: Profile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  selectProfile: (name: string, avatarSeed: string) => void;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthState | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  // Fetch current user from the server on mount.
  // 401 responses are treated as "not authenticated" (isError=true, data=undefined).
  const { data: authUser, isPending } = useAuthMe({
    query: {
      queryKey: getAuthMeQueryKey(),
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  });

  // Profile is a local UI preference (which avatar the user picked).
  // It is stored in localStorage and cleared on logout.
  const [profile, setProfile] = useState<Profile | null>(() => {
    try {
      const stored = localStorage.getItem("sidflix_profile");
      return stored ? (JSON.parse(stored) as Profile) : null;
    } catch {
      return null;
    }
  });

  const loginMutation = useAuthLogin();
  const signupMutation = useAuthSignup();
  const logoutMutation = useAuthLogout();

  const login = async (email: string, password: string): Promise<void> => {
    const user = await loginMutation.mutateAsync({ data: { email, password } });
    queryClient.setQueryData(getAuthMeQueryKey(), user);
  };

  const signup = async (email: string, password: string): Promise<void> => {
    const user = await signupMutation.mutateAsync({ data: { email, password } });
    queryClient.setQueryData(getAuthMeQueryKey(), user);
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Even if the server call fails, clear local state
    }
    queryClient.setQueryData(getAuthMeQueryKey(), undefined);
    setProfile(null);
    localStorage.removeItem("sidflix_profile");
  };

  const selectProfile = (name: string, avatarSeed: string) => {
    const newProfile = { name, avatarSeed };
    setProfile(newProfile);
    localStorage.setItem("sidflix_profile", JSON.stringify(newProfile));
  };

  // Block rendering until we know the auth state (avoids UI flicker)
  if (isPending) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user: authUser ?? null,
        // Only expose profile when user is authenticated
        profile: authUser ? profile : null,
        login,
        signup,
        logout,
        selectProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
