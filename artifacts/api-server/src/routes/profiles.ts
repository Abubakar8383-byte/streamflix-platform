import { Router } from "express";
import { db, profilesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

// GET /api/profiles
router.get("/profiles", requireAuth, async (req, res) => {
  const profiles = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, req.session.userId!));
  res.json(profiles);
});

// POST /api/profiles
router.post("/profiles", requireAuth, async (req, res) => {
  const { name, avatarSeed } = req.body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim()) {
    res.status(400).json({ error: "Profile name is required." });
    return;
  }
  const seed = typeof avatarSeed === "string" && avatarSeed ? avatarSeed : name.trim();
  const [profile] = await db
    .insert(profilesTable)
    .values({ userId: req.session.userId!, name: name.trim().slice(0, 50), avatarSeed: seed })
    .returning();
  res.status(201).json(profile);
});

// PUT /api/profiles/:id
router.put("/profiles/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim()) {
    res.status(400).json({ error: "Profile name is required." });
    return;
  }
  const [updated] = await db
    .update(profilesTable)
    .set({ name: name.trim().slice(0, 50) })
    .where(and(eq(profilesTable.id, id), eq(profilesTable.userId, req.session.userId!)))
    .returning();
  if (!updated) { res.status(404).json({ error: "Profile not found." }); return; }
  res.json(updated);
});

// DELETE /api/profiles/:id
router.delete("/profiles/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await db
    .delete(profilesTable)
    .where(and(eq(profilesTable.id, id), eq(profilesTable.userId, req.session.userId!)));
  if (req.session.profileId === id) delete req.session.profileId;
  res.status(204).end();
});

// POST /api/profiles/:id/select
router.post("/profiles/:id/select", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(and(eq(profilesTable.id, id), eq(profilesTable.userId, req.session.userId!)))
    .limit(1);
  if (!profile) { res.status(404).json({ error: "Profile not found." }); return; }
  req.session.profileId = id;
  res.json(profile);
});

export default router;
