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
        <div>
        <div>Connection: {connectionStatus}</div>

        <form onSubmit={handleSubmit}>
            <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask about notes..."
            />

            <button type="submit" disabled={connectionStatus !== "open"}>
            Send
            </button>
        </form>
        </div>
    );
    }
