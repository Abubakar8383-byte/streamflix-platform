import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { useLocation } from "wouter";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [location] = useLocation();
  const hideNavbar = ["/login", "/signup", "/profiles"].includes(location);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
};
