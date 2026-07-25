import { useParams } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { movies } from "@/data/movies";
import { Play, Plus, ThumbsUp, Star, Clock, Calendar, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/MovieCard";

export default function MovieDetails() {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#141414]">
        <h1 className="text-2xl font-semibold">Movie not found</h1>
      </div>
    );
  }

  // Related movies by matching genres
  const relatedMovies = movies
    .filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)))
    .slice(0, 6);

  // Fallback defaults for Parents Guide if data is missing on specific movies
  const parentsGuideData = (movie as any).parentsGuide || {
    violence: { level: "Moderate", score: 60 },
    sexNudity: { level: "Mild", score: 25 },
    profanity: { level: "Moderate", score: 50 },
    alcoholDrugs: { level: "Mild", score: 20 },
    frightening: { level: "Severe", score: 85 },
    summary: "Contains action sequences, suspense, and thematic elements appropriate for mature audiences.",
  };

  const getSeverityColor = (score: number) => {
    if (score >= 70) return "bg-red-600";
    if (score >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#141414] text-white pb-20"
    >
      {/* 1. Hero Backdrop Section */}
      <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        {/* Netflix Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-40 md:-mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-48 md:w-72 flex-shrink-0 shadow-2xl rounded-md overflow-hidden border border-white/10 hidden md:block"
          >
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto" />
          </motion.div>

          {/* Details */}
          <div className="flex flex-col justify-end pt-8 md:pt-0 max-w-3xl">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-2 text-white"
            >
              {movie.title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-red-500 font-medium mb-4"
            >
              {movie.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-300 mb-6"
            >
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 mr-1 fill-yellow-400" /> {movie.rating}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" /> {movie.year}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-gray-400" /> {movie.runtime}
              </div>
              <span className="px-2 py-0.5 rounded border border-gray-600 text-xs font-bold text-gray-200 uppercase">
                {(movie as any).ageRating || "16+"}
              </span>
              <div className="flex gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs text-gray-200 border border-white/10"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <Button
                size="lg"
                onClick={() => setShowTrailer(true)}
                className="bg-[#E50914] hover:bg-[#b80710] text-white font-bold rounded-md px-8 shadow-lg hover:scale-105 transition-all"
                data-testid="btn-play"
              >
                <Play className="w-5 h-5 mr-2 fill-current" /> Play Trailer
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:scale-105 transition-all"
                data-testid="btn-add-list"
              >
                <Plus className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:scale-105 transition-all"
                data-testid="btn-like"
              >
                <ThumbsUp className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl"
            >
              {movie.description}
            </motion.p>
          </div>
        </div>

        {/* 2. Cast Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">Cast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.cast.map((actor) => (
              <div
                key={actor.name}
                className="flex flex-col items-center bg-[#1f1f1f] rounded-lg p-4 border border-white/5 hover:border-white/20 transition-all"
              >
                <img
                  src={actor.avatarUrl}
                  alt={actor.name}
                  className="w-20 h-20 rounded-full object-cover mb-3 bg-neutral-800"
                />
                <span className="text-sm font-semibold text-white text-center line-clamp-1">
                  {actor.name}
                </span>
                <span className="text-xs text-gray-400 text-center line-clamp-1 mt-0.5">
                  {actor.character}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. IMDb-Style Parents Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mt-16 bg-[#1f1f1f] rounded-xl p-6 md:p-8 border border-white/10 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            <h3 className="text-2xl font-bold text-white tracking-wide">Parents Guide</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Violence & Gore */}
            <div>
              <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-gray-300">Violence & Gore</span>
                <span className="text-gray-400">{parentsGuideData.violence.level}</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getSeverityColor(parentsGuideData.violence.score)}`}
                  style={{ width: `${parentsGuideData.violence.score}%` }}
                />
              </div>
            </div>

            {/* Sex & Nudity */}
            <div>
              <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-gray-300">Sex & Nudity</span>
                <span className="text-gray-400">{parentsGuideData.sexNudity.level}</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getSeverityColor(parentsGuideData.sexNudity.score)}`}
                  style={{ width: `${parentsGuideData.sexNudity.score}%` }}
                />
              </div>
            </div>

            {/* Profanity */}
            <div>
              <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-gray-300">Profanity</span>
                <span className="text-gray-400">{parentsGuideData.profanity.level}</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getSeverityColor(parentsGuideData.profanity.score)}`}
                  style={{ width: `${parentsGuideData.profanity.score}%` }}
                />
              </div>
            </div>

            {/* Alcohol, Drugs & Smoking */}
            <div>
              <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-gray-300">Alcohol, Drugs & Smoking</span>
                <span className="text-gray-400">{parentsGuideData.alcoholDrugs.level}</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getSeverityColor(parentsGuideData.alcoholDrugs.score)}`}
                  style={{ width: `${parentsGuideData.alcoholDrugs.score}%` }}
                />
              </div>
            </div>

            {/* Frightening & Intense Scenes */}
            <div className="md:col-span-2">
              <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-gray-300">Frightening & Intense Scenes</span>
                <span className="text-gray-400">{parentsGuideData.frightening.level}</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getSeverityColor(parentsGuideData.frightening.score)}`}
                  style={{ width: `${parentsGuideData.frightening.score}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-400 leading-relaxed">
            <span className="font-semibold text-gray-200">Advisory Summary: </span>
            {parentsGuideData.summary}
          </div>
        </motion.div>

        {/* 4. More Like This */}
        {relatedMovies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">More Like This</h3>
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

      {/* 5. In-Site Trailer Modal Player */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10"
          >
            <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl border border-white/20">
              {/* Header / Close Button */}
              <div className="flex items-center justify-between p-4 bg-[#141414] border-b border-white/10">
                <h4 className="text-lg font-bold text-white">{movie.title} — Official Trailer</h4>
                <button
                  onClick={() => setShowTrailer(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Video Embed */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={(movie as any).trailerUrl || "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"}
                  title={`${movie.title} Trailer`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
