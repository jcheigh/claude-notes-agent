import { useState } from "react";
import type { ChatInputProps } from "../types";

export default function ChatInput({ onSendMessage, connectionStatus }: ChatInputProps) {
  const [text, setText] = useState("");

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setText("");
  }

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        className="chat-input-field"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message the agent…"
        disabled={connectionStatus !== "open"}
      />
      <button
        className="chat-send-btn"
        type="submit"
        disabled={connectionStatus !== "open" || !text.trim()}
        aria-label="Send"
      >
        ↑
      </button>
    </form>
  );
}
