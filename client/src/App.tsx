import { useEffect, useState } from "react";

import NotesList from "./components/NotesList";
import CreateNoteForm from "./components/CreateNoteForm";
import NoteView from "./components/NoteView";
import ChatMessageList from "./components/ChatMessageList";
import ChatInput from "./components/ChatInput";
import type { ConnectionStatus, ChatMessage, Note, NoteInput } from "./types";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");

  useEffect(() => {
    async function loadNotes() {
      const response = await fetch("/api/notes");
      const data = await response.json();
      setNotes(data);
    }

    loadNotes();
  }, []);

  // fake websocket connection
  useEffect(() => {
    setConnectionStatus("connecting");

    const timer = setTimeout(() => {
      setConnectionStatus("open");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  async function createNote(input: NoteInput) {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    } else {
      const newNote = await response.json();
      setNotes((curr) => [newNote, ...curr]);
      setSelectedNote(newNote);
    }
  }

  function handleSendMessage(text: string) {
    // add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((curr) => [...curr, userMessage]);

    // add assistant message with streaming support
    const streamId = crypto.randomUUID();

    // simulate after 400ms the new message is created
    setTimeout(() => {
      setMessages((curr) => [
        ...curr,
        { id: streamId, role: "assistant", content: "", streaming: true },
      ]);
    }, 400);

    // after 1400ms the rest is streamed/correct streamId is updated
    setTimeout(() => {
      setMessages((curr) =>
        curr.map((m) =>
          m.id === streamId
            ? { ...m, content: "fake response for now", streaming: false }
            : m
        )
      );
    }, 1400);
  }

  const statusLabel =
    connectionStatus === "open"
      ? "Connected"
      : connectionStatus === "connecting"
      ? "Connecting…"
      : "Disconnected";

  return (
    <div className="app">
      {/* Left sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="app-title">Claude Notes Agent</span>
        </div>

        <div className="sidebar-notes">
          {notes.length === 0 ? (
            <p className="sidebar-notes-empty">No notes yet.</p>
          ) : (
            <NotesList
              notes={notes}
              onSelectNote={setSelectedNote}
              selectedNote={selectedNote}
            />
          )}
        </div>

        <div className="sidebar-footer">
          <span className="sidebar-footer-label">New note</span>
          <CreateNoteForm onCreateNote={createNote} />
        </div>
      </aside>

      {/* Main note view */}
      <main className="main">
        <NoteView note={selectedNote} />
      </main>

      {/* Right chat panel */}
      <aside className="chat-panel">
        <div className="chat-panel-header">
          <span className="chat-panel-title">Agent Chat</span>
          <div className="status-indicator">
            <span className={`status-dot ${connectionStatus}`} />
            <span className="status-label">{statusLabel}</span>
          </div>
        </div>

        <div className="chat-messages">
          <ChatMessageList messages={messages} />
        </div>

        <div className="chat-input-area">
          <ChatInput
            onSendMessage={handleSendMessage}
            connectionStatus={connectionStatus}
          />
        </div>
      </aside>
    </div>
  );
}
