import path from "node:path";
import fs from "node:fs";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

import { pool } from "@workspace/db";
import router from "./routes";
import { logger } from "./lib/logger";
const PgStore = connectPgSimple(session);

const app: Express = express();

// —— Logging ——
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// —— CORS (must allow credentials for session cookies) ——
app.use(
  cors({
    origin: true, // reflect the request origin
    credentials: true,
  }),
);

// —— Session (must be before routes) ——
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is required.");
}

app.use(
  session({
    store: new PgStore({
      pool,
      createTableIfMissing: true,
      tableName: "user_sessions",
    }),
    name: "sidflix.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  }),
);

// —— Body parsing ——
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// —— Routes ——
app.use("/api", router);

// —— Serve frontend (production build) ——
const clientDistPath = path.resolve(
  import.meta.dirname,
  "../../streamflix/dist/public",
);

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  // SPA fallback: any non-/api route serves index.html so client-side routing works
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
} else {
  logger.warn(
    { clientDistPath },
    "Frontend build not found; skipping static file serving",
  );
}

export default app;