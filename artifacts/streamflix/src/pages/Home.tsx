import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { categories } from "@/data/movies";
import { MovieCard } from "@/components/MovieCard";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const featuredMovie = categories[0].movies.find(m => m.featured) || categories[0].movies[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-end pb-24">
        {/* Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredMovie.backdropUrl} 
            alt={featuredMovie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-8 flex flex-col md:w-2/3 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
              {featuredMovie.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-md font-medium">
              {featuredMovie.tagline}
            </p>
            <p className="text-muted-foreground line-clamp-3 mb-8 max-w-lg">
              {featuredMovie.description}
            </p>
            
            <div className="flex items-center gap-4">
              <Button size="lg" className="px-8 text-base rounded-full shadow-lg hover:scale-105 transition-transform" asChild data-testid="btn-hero-play">
                <Link href={`/movies/${featuredMovie.id}`}>
                  <Play className="w-5 h-5 mr-2 fill-current" /> Play Now
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="px-8 text-base rounded-full bg-white/20 hover:bg-white/30 text-white border-none shadow-lg hover:scale-105 transition-transform backdrop-blur-md" asChild data-testid="btn-hero-info">
                <Link href={`/movies/${featuredMovie.id}`}>
                  <Info className="w-5 h-5 mr-2" /> More Info
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rows */}
      <div className="flex flex-col gap-10 -mt-10 relative z-20">
        {categories.map((category, i) => (
          <section key={category.id} className="w-full px-4 md:px-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pl-2 border-l-4 border-primary">
              {category.title}
            </h2>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-6 pt-2 snap-x">
                {category.movies.map((movie, j) => (
                  <div key={movie.id} className="snap-start scroll-ml-4">
                    <MovieCard movie={movie} index={j} />
                  </div>
                ))}
              </div>
              {/* Fade edges for scroll indication */}
              <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  );
}