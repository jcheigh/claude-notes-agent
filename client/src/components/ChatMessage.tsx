import type { ChatMessage, ChatMessageProps } from "../types";

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div>
      <strong>{message.role}:</strong> {message.content}
    </div>
  );
}