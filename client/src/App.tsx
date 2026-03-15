import { useEffect, useState } from "react";
import "./App.css";

type Note = {
  title: string;
  createdAt: string;
  body: string;
}

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

  return (
    <div>
      {notes.map((note) => (
        <div key={`${note.title}-${note.createdAt}`}>
          <h3>{note.title}</h3>
          <div>{note.createdAt}</div>
          <p>{note.body}</p>
        </div>
      ))}
    </div>
  );
}