import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Search, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const { user, profile, logout } = useAuth();
  const [, setLocation] = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    setLocation("/login");
  };

  // --------------------------------------------------
  // PROFILE AVATAR
  // Must match the same DiceBear style ("micah") and params
  // used in Profiles.tsx, or the avatar will look different
  // between the profile-select screen and the navbar.
  // --------------------------------------------------

  const avatarSeed = profile?.avatarSeed || "AbuKhan99";

  const avatarUrl =
    `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(
      avatarSeed
    )}&facialHairProbability=100` +
    `&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-black/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6 lg:gap-10">
          <Link
            href="/"
            className="flex items-center z-50"
            data-testid="link-home"
          >
            <span className="text-red-600 hover:text-red-500 font-black text-2xl tracking-wider uppercase transition-colors">
              SIDFLIX
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors"
              data-testid="nav-home"
            >
              Home
            </Link>

            <Link
              href="/movies"
              className="text-white/80 hover:text-white transition-colors"
              data-testid="nav-movies"
            >
              Movies
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/10 hidden sm:flex"
            asChild
            data-testid="btn-search"
          >
            <Link href="/movies">
              <Search className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/10 hidden sm:flex"
            data-testid="btn-notifications"
          >
            <Bell className="w-5 h-5" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-white/30 bg-zinc-800 p-0 hover:border-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Open profile menu"
                  data-testid="btn-profile"
                >
                  <img
                    src={avatarUrl}
                    alt={profile?.name || "Profile"}
                    width={40}
                    height={40}
                    className="block h-10 w-10 object-cover"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 bg-zinc-900 border-white/10 text-white"
              >
                <DropdownMenuLabel className="text-white">
                  {profile?.name || user.email || "User"}
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                  onClick={() => setLocation("/profiles")}
                  className="cursor-pointer focus:bg-white/10 focus:text-white"
                >
                  Switch Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 cursor-pointer focus:bg-red-500/10 focus:text-red-500"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              data-testid="btn-sign-in"
            >
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="btn-mobile-menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2 text-sm font-medium">
              <Link
                href="/"
                className="text-white/80 hover:text-white p-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/movies"
                className="text-white/80 hover:text-white p-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Movies
              </Link>

              {!user && (
                <Link
                  href="/login"
                  className="text-red-500 hover:text-red-400 p-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}

              {user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLocation("/profiles");
                  }}
                  className="text-white/80 hover:text-white text-left p-3"
                >
                  Switch Profile
                </button>
              )}

              {user && (
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-400 text-left p-3"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
