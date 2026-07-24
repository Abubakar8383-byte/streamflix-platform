import { Router } from "express";
import { db, continueWatchingTable } from "@workspace/db";
import { eq, and, desc, sql } from "drizzle-orm";
import { requireProfile } from "../middlewares/requireAuth";

const router = Router();

// GET /api/continue-watching
router.get("/continue-watching", requireProfile, async (req, res) => {
  const items = await db
    .select()
    .from(continueWatchingTable)
    .where(eq(continueWatchingTable.profileId, req.session.profileId!))
    .orderBy(desc(continueWatchingTable.updatedAt))
    .limit(20);
  res.json(items);
});

// POST /api/continue-watching (upsert)
router.post("/continue-watching", requireProfile, async (req, res) => {
  const { tmdbId, mediaType, title, posterPath, progressSeconds, durationSeconds } =
    req.body as Record<string, unknown>;
  if (typeof tmdbId !== "number" || !mediaType || !title) {
    res.status(400).json({ error: "tmdbId, mediaType, and title are required." });
    return;
  }
  const [item] = await db
    .insert(continueWatchingTable)
    .values({
      profileId: req.session.profileId!,
      tmdbId: tmdbId as number,
      mediaType: mediaType as string,
      title: title as string,
      posterPath: (posterPath as string | null) ?? null,
      progressSeconds: (progressSeconds as number) ?? 0,
      durationSeconds: (durationSeconds as number) ?? 0,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [
        continueWatchingTable.profileId,
        continueWatchingTable.tmdbId,
        continueWatchingTable.mediaType,
      ],
      set: {
        progressSeconds: sql`excluded.progress_seconds`,
        durationSeconds: sql`excluded.duration_seconds`,
        title: sql`excluded.title`,
        posterPath: sql`excluded.poster_path`,
        updatedAt: sql`now()`,
      },
    })
    .returning();
  res.json(item);
});

// DELETE /api/continue-watching/:tmdbId/:mediaType
router.delete("/continue-watching/:tmdbId/:mediaType", requireProfile, async (req, res) => {
  await db
    .delete(continueWatchingTable)
    .where(
      and(
        eq(continueWatchingTable.profileId, req.session.profileId!),
        eq(continueWatchingTable.tmdbId, parseInt(req.params.tmdbId, 10)),
        eq(continueWatchingTable.mediaType, req.params.mediaType),
      ),
    );
  res.status(204).end();
});

export default router;
