import {
  pgTable,
  timestamp,
  uuid,
  text
} from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    title: text("title").notNull(),
    body: text("body").notNull()
});

export type NewNote = typeof notes.$inferInsert;