import type { ChatMessageProps } from "../types";

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`chat-message ${message.role}`}>
      <div className="chat-bubble">
        {message.content}
        {message.streaming && <span className="streaming-cursor" />}
      </div>
    </div>
  );
}
