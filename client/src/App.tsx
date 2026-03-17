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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    } else {
      const newNote = await response.json();
      setNotes((currNotes) => [newNote, ...currNotes]);
      setSelectedNote(newNote);
    }
  }

  function handleSendMessage(text: string) {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((curr) => [...curr, userMessage]);
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "fake response for now",
      };

      setMessages((curr) => [...curr, assistantMessage]);
    }, 700);
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ width: "250px" }}>
        <h3>Notes</h3>
        <NotesList notes={notes} onSelectNote={setSelectedNote} />
      </div>
      <div style={{ flex: 1 }}>
        <NoteView note={selectedNote} />
        <CreateNoteForm onCreateNote={createNote} />
      </div>
      <div style={{ width: "350px", display: "flex", flexDirection: "column" }}>
        <ChatMessageList messages={messages} />

        <ChatInput
          onSendMessage={handleSendMessage}
          connectionStatus={connectionStatus}
        />
      </div>
    </div>
  );
}