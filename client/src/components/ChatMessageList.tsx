import ChatMessage from "./ChatMessage"
import type { ChatMessageListProps } from "../types"

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <div>
        {messages.map((m) => (<ChatMessage key={m.id} message={m}/>))}
    </div>
  )
}
