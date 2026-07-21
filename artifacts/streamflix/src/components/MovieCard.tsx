import { Movie } from "@/data/movies";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Play, Info, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const MovieCard = ({ movie, index = 0 }: { movie: Movie, index?: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex-none w-[160px] sm:w-[200px] md:w-[240px] aspect-[2/3] rounded-md overflow-hidden bg-muted cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-black/50"
      data-testid={`card-movie-${movie.id}`}
    >
      <Link href={`/movies/${movie.id}`} className="absolute inset-0 z-20">
        <span className="sr-only">View {movie.title}</span>
      </Link>
      
      <img 
        src={movie.posterUrl} 
        alt={movie.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      
      {/* Default Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Default Info */}
      <div className="absolute bottom-0 left-0 p-3 w-full transition-transform duration-300 group-hover:translate-y-[-8px]">
        <h3 className="text-white font-semibold text-sm sm:text-base truncate drop-shadow-md">{movie.title}</h3>
      </div>

      {/* Hover Info Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10 pointer-events-none">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-white/90">
            <span className="flex items-center text-yellow-400 gap-1"><Star className="w-3 h-3 fill-yellow-400" /> {movie.rating}</span>
            <span>•</span>
            <span>{movie.year}</span>
            <span>•</span>
            <span className="truncate">{movie.runtime}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {movie.genres.slice(0, 2).map(g => (
              <span key={g} className="text-[10px] px-1.5 py-0.5 rounded-sm bg-white/20 text-white backdrop-blur-sm">{g}</span>
            ))}
          </div>
          <div className="flex gap-2 pointer-events-auto">
            <Button size="icon" className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 text-white transition-transform hover:scale-110" asChild>
              <Link href={`/movies/${movie.id}`}><Play className="w-4 h-4 ml-0.5" /></Link>
            </Button>
            <Button size="icon" variant="outline" className="w-8 h-8 rounded-full border-white/40 text-white hover:bg-white/20 hover:text-white transition-transform hover:scale-110" asChild>
              <Link href={`/movies/${movie.id}`}><Info className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
