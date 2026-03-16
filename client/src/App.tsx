import { useEffect, useState } from "react";

import NotesList from "./components/NotesList";
import CreateNoteForm from "./components/CreateNoteForm";
import type { Note, NoteInput } from "./types";
import "./App.css";


export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  
  useEffect(() => {
    async function loadNotes() {
      const response = await fetch("/api/notes");
      const data = await response.json();
      setNotes(data);
    }

    loadNotes();
  }, []);

  async function createNote(input: NoteInput) {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    } else {
      const newNote = await response.json();
      setNotes((currNotes) => [newNote, ...currNotes]);
    }
  }

  return (
    <div>
      <h1>Da Notes</h1>
      <CreateNoteForm onCreateNote={createNote} />
      <NotesList notes={notes} />
    </div>
  );
}