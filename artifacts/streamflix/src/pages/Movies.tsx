import { useState } from "react";
import { motion } from "framer-motion";
import { movies } from "@/data/movies";
import { MovieCard } from "@/components/MovieCard";

export default function Movies() {
  const allGenres = Array.from(
    new Set(movies.flatMap((m) => m.genres)),
  ).sort();

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredMovies = selectedGenre
    ? movies.filter((m) => m.genres.includes(selectedGenre))
    : movies;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20 pt-24 container mx-auto px-4 md:px-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Movies
      </h1>

      {/* Genre filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedGenre(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedGenre === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All
        </button>
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedGenre === genre
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMovies.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} index={i} />
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p className="text-muted-foreground text-center py-16">
          No movies found in this genre.
        </p>
      )}
    </motion.div>
  );
}