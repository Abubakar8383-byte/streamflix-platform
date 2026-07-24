import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Search, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const { profile, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setLocation("/login");
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-md border-b border-white/5" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* Left section */}
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/" className="flex items-center gap-2 z-50" data-testid="link-home">
            <span className="text-primary font-black text-2xl tracking-tighter uppercase">
              SIDFLIX
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-foreground/80 hover:text-white transition-colors" data-testid="nav-home">Home</Link>
            <Link href="/movies" className="text-foreground/80 hover:text-white transition-colors" data-testid="nav-movies">Movies</Link>
          </nav>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-white hidden sm:flex" asChild data-testid="btn-search">
            <Link href="/movies">
              <Search className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-white hidden sm:flex" data-testid="btn-notifications">
            <Bell className="w-5 h-5" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-sm" data-testid="btn-user-menu">
                  <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${profile.avatarSeed}`} alt={profile.name} className="h-8 w-8 rounded-sm object-cover bg-muted" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">{profile.name}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLocation("/profiles")} className="cursor-pointer" data-testid="menu-switch-profile">
                  Switch Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive" data-testid="menu-logout">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm" className="hidden sm:flex" data-testid="btn-login">
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden text-foreground/80" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="btn-mobile-menu">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-4 text-sm font-medium">
              <Link href="/" className="text-foreground/80 hover:text-white p-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/movies" className="text-foreground/80 hover:text-white p-2" onClick={() => setMobileMenuOpen(false)}>Movies</Link>
              {!profile && <Link href="/login" className="text-primary p-2" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
