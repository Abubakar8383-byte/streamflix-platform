// ─── TMDB image helpers ───────────────────────────────────────────────────────

const IMG = "https://image.tmdb.org/t/p";
const PLACEHOLDER_POSTER = "https://placehold.co/400x600/1a1a2e/555?text=No+Image";
const PLACEHOLDER_BACKDROP = "https://placehold.co/1280x720/1a1a2e/555?text=No+Image";

export function posterUrl(path: string | null | undefined, size = "w500"): string {
  return path ? `${IMG}/${size}${path}` : PLACEHOLDER_POSTER;
}

export function backdropUrl(path: string | null | undefined, size = "w1280"): string {
  return path ? `${IMG}/${size}${path}` : PLACEHOLDER_BACKDROP;
}

export function profileImgUrl(path: string | null | undefined): string {
  return path ? `${IMG}/w185${path}` : "";
}

export function runtimeStr(minutes: number | null | undefined): string {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function releaseYear(dateStr: string | null | undefined): number {
  if (!dateStr) return 0;
  return parseInt(dateStr.slice(0, 4), 10) || 0;
}

// ─── Raw TMDB types (from API responses) ─────────────────────────────────────

export type TmdbGenre = { id: number; name: string };

export type TmdbRaw = {
  id: number;
  title?: string;        // movies
  name?: string;         // TV shows
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;       // movies
  first_air_date?: string;     // TV
  genre_ids?: number[];
  genres?: TmdbGenre[];
  runtime?: number;            // movies (minutes)
  episode_run_time?: number[]; // TV
  tagline?: string;
  media_type?: string;         // in trending/search results
};

export type TmdbCastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type TmdbVideo = {
  id: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
  name: string;
};

export type TmdbDetailsRaw = TmdbRaw & {
  credits?: { cast: TmdbCastMember[]; crew: { job: string; name: string }[] };
  videos?: { results: TmdbVideo[] };
  recommendations?: { results: TmdbRaw[] };
};

// ─── Unified MediaItem (used throughout the app) ──────────────────────────────

export type MediaItem = {
  id: string;           // "movie-123" or "tv-456"
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  tagline: string;
  overview: string;
  year: number;
  rating: number;
  runtime: string;
  genres: string[];
  posterUrl: string;
  backdropUrl: string;
  featured?: boolean;
};

export type MediaItemWithDetails = MediaItem & {
  cast: Array<{ name: string; character: string; avatarUrl: string }>;
  trailerKey: string | null;
  recommendations: MediaItem[];
  voteCount: number;
};

/** Convert a raw TMDB item into the app's unified MediaItem */
export function toMediaItem(
  raw: TmdbRaw,
  forceMediaType?: "movie" | "tv",
): MediaItem {
  const mt: "movie" | "tv" =
    forceMediaType ??
    (raw.media_type === "tv" ? "tv" : raw.media_type === "movie" ? "movie" : raw.name ? "tv" : "movie");

  const title = (raw.title || raw.name || "Untitled").trim();
  const dateStr = raw.release_date || raw.first_air_date;
  const runtime =
    mt === "movie"
      ? runtimeStr(raw.runtime)
      : raw.episode_run_time?.[0]
        ? runtimeStr(raw.episode_run_time[0])
        : "";

  return {
    id: `${mt}-${raw.id}`,
    tmdbId: raw.id,
    mediaType: mt,
    title,
    tagline: raw.tagline || "",
    overview: raw.overview || "",
    year: releaseYear(dateStr),
    rating: Math.round(raw.vote_average * 10) / 10,
    runtime,
    genres: (raw.genres || []).map((g) => g.name),
    posterUrl: posterUrl(raw.poster_path),
    backdropUrl: backdropUrl(raw.backdrop_path),
  };
}

/** Pick the best YouTube trailer key from TMDB video results */
export function pickTrailerKey(videos: TmdbVideo[] | undefined): string | null {
  if (!videos?.length) return null;
  const yt = videos.filter((v) => v.site === "YouTube");
  // Prefer official trailer, then any trailer, then teaser
  return (
    yt.find((v) => v.type === "Trailer" && v.official)?.key ??
    yt.find((v) => v.type === "Trailer")?.key ??
    yt.find((v) => v.type === "Teaser")?.key ??
    null
  );
}

/** Parse "movie-123" or "tv-456" into { mediaType, tmdbId } */
export function parseMediaId(id: string | undefined): { mediaType: "movie" | "tv"; tmdbId: number } | null {
  if (!id) return null;
  const m = id.match(/^(movie|tv)-(\d+)$/);
  if (!m) return null;
  return { mediaType: m[1] as "movie" | "tv", tmdbId: parseInt(m[2], 10) };
}
