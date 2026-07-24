import { Router } from "express";
import type { Response } from "express";

const router = Router();
const TMDB_BASE = "https://api.themoviedb.org/3";

function tmdbKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) throw new Error("TMDB_API_KEY not configured. Add it to Replit Secrets.");
  return key;
}

async function tmdb(path: string, params: Record<string, string> = {}): Promise<unknown> {
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set("api_key", tmdbKey());
  url.searchParams.set("language", "en-US");
  for (const [k, v] of Object.entries(params)) {
    if (v) url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`TMDB API error ${res.status}: ${res.statusText}`);
  return res.json();
}

function handleErr(res: Response, err: unknown): void {
  const msg = err instanceof Error ? err.message : "Unknown error";
  if (msg.includes("TMDB_API_KEY not configured")) {
    res.status(503).json({ error: msg });
  } else {
    res.status(502).json({ error: `TMDB unavailable: ${msg}` });
  }
}

// GET /api/tmdb/trending
router.get("/tmdb/trending", async (_req, res) => {
  try { res.json(await tmdb("/trending/all/week")); }
  catch (e) { handleErr(res, e); }
});

// GET /api/tmdb/popular/movies
router.get("/tmdb/popular/movies", async (_req, res) => {
  try { res.json(await tmdb("/movie/popular")); }
  catch (e) { handleErr(res, e); }
});

// GET /api/tmdb/popular/tv
router.get("/tmdb/popular/tv", async (_req, res) => {
  try { res.json(await tmdb("/tv/popular")); }
  catch (e) { handleErr(res, e); }
});

// GET /api/tmdb/top-rated
router.get("/tmdb/top-rated", async (_req, res) => {
  try { res.json(await tmdb("/movie/top_rated")); }
  catch (e) { handleErr(res, e); }
});

// GET /api/tmdb/upcoming
router.get("/tmdb/upcoming", async (_req, res) => {
  try { res.json(await tmdb("/movie/upcoming")); }
  catch (e) { handleErr(res, e); }
});

// GET /api/tmdb/movie/:id  (includes credits + videos + recommendations)
router.get("/tmdb/movie/:id", async (req, res) => {
  try {
    res.json(await tmdb(`/movie/${req.params.id}`, {
      append_to_response: "credits,videos,recommendations",
    }));
  } catch (e) { handleErr(res, e); }
});

// GET /api/tmdb/tv/:id  (includes credits + videos + recommendations)
router.get("/tmdb/tv/:id", async (req, res) => {
  try {
    res.json(await tmdb(`/tv/${req.params.id}`, {
      append_to_response: "credits,videos,recommendations",
    }));
  } catch (e) { handleErr(res, e); }
});

// GET /api/tmdb/search?q=...
router.get("/tmdb/search", async (req, res) => {
  const q = (req.query.q as string)?.trim();
  if (!q) { res.json({ results: [] }); return; }
  try { res.json(await tmdb("/search/multi", { query: q })); }
  catch (e) { handleErr(res, e); }
});

// GET /api/tmdb/discover/movies?genreId=28
router.get("/tmdb/discover/movies", async (req, res) => {
  try {
    res.json(await tmdb("/discover/movie", {
      with_genres: (req.query.genreId as string) || "",
      sort_by: "popularity.desc",
    }));
  } catch (e) { handleErr(res, e); }
});

// GET /api/tmdb/discover/tv?genreId=10765
router.get("/tmdb/discover/tv", async (req, res) => {
  try {
    res.json(await tmdb("/discover/tv", {
      with_genres: (req.query.genreId as string) || "",
      sort_by: "popularity.desc",
    }));
  } catch (e) { handleErr(res, e); }
});

export default router;
