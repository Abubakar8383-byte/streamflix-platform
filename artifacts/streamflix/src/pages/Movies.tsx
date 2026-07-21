import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MovieCard } from "@/components/MovieCard";
import { movies } from "@/data/movies";

const allGenres = ["All", ...Array.from(new Set(movies.flatMap(m => m.genres))).sort()];

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            movie.cast.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGenre = activeGenre === "All" || movie.genres.includes(activeGenre);
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, activeGenre]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-screen-2xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Browse Movies</h1>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles, actors..." 
            className="pl-9 bg-card/50 border-white/10 focus-visible:ring-primary h-10 w-full rounded-full"
            data-testid="input-search"
          />
        </div>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
        {allGenres.map(genre => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            data-testid={`filter-${genre}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeGenre === genre 
                ? "bg-primary text-primary-foreground" 
                : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-white/5"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <MovieCard movie={movie} index={index % 10} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredMovies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <Search className="w-12 h-12 mb-4 opacity-20" />
          <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
          <p>We couldn't find anything matching your search.</p>
        </div>
      )}
    </motion.div>
  );
}