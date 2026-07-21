import { useParams } from "wouter";
import { motion } from "framer-motion";
import { movies } from "@/data/movies";
import { Play, Plus, ThumbsUp, Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/MovieCard";

export default function MovieDetails() {
  const { id } = useParams();
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-2xl">Movie not found</h1>
      </div>
    );
  }

  // Get related movies (same genre, excluding current)
  const relatedMovies = movies
    .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
    .slice(0, 6);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pb-20"
    >
      {/* Hero Backdrop */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <img 
          src={movie.backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-32 md:-mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-48 md:w-72 flex-shrink-0 shadow-2xl rounded-lg overflow-hidden border border-white/10 hidden md:block"
          >
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto" />
          </motion.div>

          {/* Details */}
          <div className="flex flex-col justify-end pt-10 md:pt-0 max-w-3xl">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-white mb-2"
            >
              {movie.title}
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-primary font-medium mb-4"
            >
              {movie.tagline}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/80 mb-6"
            >
              <div className="flex items-center text-yellow-500"><Star className="w-4 h-4 mr-1 fill-yellow-500" /> {movie.rating}</div>
              <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {movie.year}</div>
              <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {movie.runtime}</div>
              <div className="flex gap-2">
                {movie.genres.map(g => (
                  <span key={g} className="px-2 py-0.5 rounded bg-white/10 border border-white/10">{g}</span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <Button size="lg" className="rounded-full px-8 shadow-lg hover:scale-105 transition-transform" data-testid="btn-play">
                <Play className="w-5 h-5 mr-2 fill-current" /> Play
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:scale-105 transition-transform" data-testid="btn-add-list">
                <Plus className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:scale-105 transition-transform" data-testid="btn-like">
                <ThumbsUp className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-white/80 leading-relaxed"
            >
              {movie.description}
            </motion.p>
          </div>
        </div>

        {/* Cast */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Cast</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.cast.map(actor => (
              <div key={actor.name} className="flex flex-col items-center bg-card rounded-lg p-4 border border-white/5 hover:bg-card/80 transition-colors">
                <img src={actor.avatarUrl} alt={actor.name} className="w-20 h-20 rounded-full mb-3 bg-muted" />
                <span className="text-sm font-medium text-white text-center">{actor.name}</span>
                <span className="text-xs text-muted-foreground text-center">{actor.character}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related */}
        {relatedMovies.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">More Like This</h3>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-6 snap-x">
              {relatedMovies.map((m, i) => (
                <div key={m.id} className="snap-start scroll-ml-4">
                  <MovieCard movie={m} index={i} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}