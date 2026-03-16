import type { NotesListProps } from "../types";

export default function NotesList({ notes }: NotesListProps) {
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
};