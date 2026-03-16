import { useState } from "react";

import type { CreateNoteFormProps } from "../types";

export default function CreateNoteForm({ onCreateNote }: CreateNoteFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    await onCreateNote({
      title,
      body,
    });

    setTitle("");
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>

      <button type="submit">Create Note</button>
    </form>
  );
};