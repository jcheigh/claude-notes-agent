import type { NoteViewProps } from "../types";

export default function NoteView({ note }: NoteViewProps) {
  if (!note) {
    return <div>Select a note</div>
  }

  return (
    <div>
      <h3>{note.title}</h3>
      <div>Created At: {note.createdAt}</div>
      <p>{note.body}</p>
    </div>
  )
};
