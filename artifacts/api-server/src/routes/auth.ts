import { Router, type IRouter } from "express";
import bcryptjs from "bcryptjs";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

// ─── Simple validators ────────────────────────────────────────────────────────

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function safeUser(user: { id: number; email: string; createdAt: Date }) {
  return { id: user.id, email: user.email, createdAt: user.createdAt };
}

// ─── POST /api/auth/signup ────────────────────────────────────────────────────

router.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body as Record<string, unknown>;

  if (!isValidEmail(email)) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }
  if (!isNonEmptyString(password)) {
    res.status(400).json({ error: "Password is required." });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters." });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, normalizedEmail))
    .limit(1);

  if (existing.length > 0) {
    res.status(409).json({ error: "An account with this email already exists." });
    return;
  }

  const passwordHash = await bcryptjs.hash(password, 12);

  const [user] = await db
    .insert(usersTable)
    .values({ email: normalizedEmail, passwordHash })
    .returning();

  req.session.userId = user.id;

  res.status(201).json(safeUser(user));
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body as Record<string, unknown>;

  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email.trim().toLowerCase()))
    .limit(1);

  if (!user) {
    res.status(401).json({ error: "Invalid email or password." });
    return;
  }

  const valid = await bcryptjs.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid email or password." });
    return;
  }

  req.session.userId = user.id;

  res.json(safeUser(user));
});

// ─── POST /api/auth/logout ────────────────────────────────────────────────────

router.post("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Failed to sign out. Please try again." });
      return;
    }
    res.clearCookie("sidflix.sid");
    res.status(204).end();
  });
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────

router.get("/auth/me", async (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Not authenticated." });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, req.session.userId))
    .limit(1);

  if (!user) {
    req.session.destroy(() => {});
    res.status(401).json({ error: "Not authenticated." });
    return;
  }

  res.json(safeUser(user));
});

export default router;
