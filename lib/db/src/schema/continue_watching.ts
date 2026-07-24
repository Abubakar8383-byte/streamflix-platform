import { pgTable, serial, text, integer, timestamp, unique } from "drizzle-orm/pg-core";
import { profilesTable } from "./profiles";

export const continueWatchingTable = pgTable(
  "continue_watching",
  {
    id: serial("id").primaryKey(),
    profileId: integer("profile_id")
      .notNull()
      .references(() => profilesTable.id, { onDelete: "cascade" }),
    tmdbId: integer("tmdb_id").notNull(),
    mediaType: text("media_type").notNull(), // 'movie' | 'tv'
    title: text("title").notNull(),
    posterPath: text("poster_path"),
    progressSeconds: integer("progress_seconds").notNull().default(0),
    durationSeconds: integer("duration_seconds").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    unique("cw_profile_tmdb_media_uq").on(t.profileId, t.tmdbId, t.mediaType),
  ],
);

export type ContinueWatchingItem = typeof continueWatchingTable.$inferSelect;
export type InsertContinueWatchingItem = typeof continueWatchingTable.$inferInsert;
