import { useState } from "react";
import type { CreateNoteFormProps } from "../types";

export default function CreateNoteForm({ onCreateNote }: CreateNoteFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onCreateNote({ title, body });
      setTitle("");
      setBody("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="create-note-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="create-note-textarea"
        placeholder="Body (optional)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        className="btn-create"
        type="submit"
        disabled={loading || !title.trim()}
      >
        {loading ? "Creating…" : "Create Note"}
      </button>
    </form>
  );
}
