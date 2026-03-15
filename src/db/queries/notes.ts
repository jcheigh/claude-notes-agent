import { asc } from "drizzle-orm";
import { db } from "../index.js";
import { notes, NewNote } from "../schema.js";

export async function createNote(note: NewNote) {
  const [rows] = await db.insert(notes).values(note).returning();
  return rows;
}

export async function getNotes() {
  return db
    .select()
    .from(notes)
    .orderBy(asc(notes.createdAt));
}