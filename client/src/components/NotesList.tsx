import type { NotesListProps } from "../types";

export default function NotesList({ notes, onSelectNote }: NotesListProps) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={`${note.title}-${note.createdAt}`}>
          <button onClick={() => onSelectNote(note)}>
            {note.title}
          </button>
        </li>
      ))}
    </ul>
  );
}