import ChatMessage from "./ChatMessage";
import type { ChatMessageListProps } from "../types";

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="chat-messages-empty">
        Ask the agent anything about your notes.
      </div>
    );
  }

  return (
    <>
      {messages.map((m) => (
        <ChatMessage key={m.id} message={m} />
      ))}
    </>
  );
}
