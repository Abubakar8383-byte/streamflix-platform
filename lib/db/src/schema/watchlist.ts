import { pgTable, serial, text, integer, timestamp, unique } from "drizzle-orm/pg-core";
import { profilesTable } from "./profiles";

export const watchlistTable = pgTable(
  "watchlist",
  {
    id: serial("id").primaryKey(),
    profileId: integer("profile_id")
      .notNull()
      .references(() => profilesTable.id, { onDelete: "cascade" }),
    tmdbId: integer("tmdb_id").notNull(),
    mediaType: text("media_type").notNull(), // 'movie' | 'tv'
    title: text("title").notNull(),
    posterPath: text("poster_path"),
    addedAt: timestamp("added_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    unique("watchlist_profile_tmdb_media_uq").on(t.profileId, t.tmdbId, t.mediaType),
  ],
);

export type WatchlistItem = typeof watchlistTable.$inferSelect;
export type InsertWatchlistItem = typeof watchlistTable.$inferInsert;
