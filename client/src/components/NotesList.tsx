import type { NotesListProps } from "../types";

export default function NotesList({ notes, onSelectNote, selectedNote }: NotesListProps) {
  function isSelected(note: { title: string; createdAt: string }) {
    return (
      selectedNote?.title === note.title &&
      selectedNote?.createdAt === note.createdAt
    );
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={`${note.title}-${note.createdAt}`}>
          <button
            className={`note-item-btn${isSelected(note) ? " active" : ""}`}
            onClick={() => onSelectNote(note)}
          >
            <div className="note-item-title">{note.title}</div>
            <div className="note-item-date">{formatDate(note.createdAt)}</div>
          </button>
        </li>
      ))}
    </ul>
  );
}
