import { Router } from "express";
import { db, watchlistTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireProfile } from "../middlewares/requireAuth";

const router = Router();

// GET /api/watchlist
router.get("/watchlist", requireProfile, async (req, res) => {
  const items = await db
    .select()
    .from(watchlistTable)
    .where(eq(watchlistTable.profileId, req.session.profileId!))
    .orderBy(watchlistTable.addedAt);
  res.json(items);
});

// POST /api/watchlist
router.post("/watchlist", requireProfile, async (req, res) => {
  const { tmdbId, mediaType, title, posterPath } = req.body as Record<string, unknown>;
  if (typeof tmdbId !== "number" || !mediaType || !title) {
    res.status(400).json({ error: "tmdbId, mediaType, and title are required." });
    return;
  }
  const [item] = await db
    .insert(watchlistTable)
    .values({
      profileId: req.session.profileId!,
      tmdbId: tmdbId as number,
      mediaType: mediaType as string,
      title: title as string,
      posterPath: (posterPath as string | null) ?? null,
    })
    .onConflictDoNothing()
    .returning();
  res.status(201).json(item ?? { exists: true, tmdbId, mediaType });
});

// DELETE /api/watchlist/:tmdbId/:mediaType
router.delete("/watchlist/:tmdbId/:mediaType", requireProfile, async (req, res) => {
  await db
    .delete(watchlistTable)
    .where(
      and(
        eq(watchlistTable.profileId, req.session.profileId!),
        eq(watchlistTable.tmdbId, parseInt(req.params.tmdbId, 10)),
        eq(watchlistTable.mediaType, req.params.mediaType),
      ),
    );
  res.status(204).end();
});

export default router;
