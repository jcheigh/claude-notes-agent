import type { NoteViewProps } from "../types";

export default function NoteView({ note }: NoteViewProps) {
  if (!note) {
    return (
      <div className="note-view note-view-empty">
        Select a note to view it
      </div>
    );
  }

  const formattedDate = new Date(note.createdAt).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="note-view">
      <h2 className="note-view-title">{note.title}</h2>
      <div className="note-view-date">{formattedDate}</div>
      <p className="note-view-body">{note.body}</p>
    </div>
  );
}
