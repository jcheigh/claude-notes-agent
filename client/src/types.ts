export type Note = {
  title: string;
  createdAt: string;
  body: string;
};

export type NoteInput = {
  title: string;
  body: string;
};

export type CreateNoteFormProps = {
  onCreateNote: (input: {
    title: string;
    body: string;
  }) => Promise<void>;
};

export type NotesListProps = {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  selectedNote?: Note;
};

export type NoteViewProps = {
  note?: Note;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  streaming?: boolean;
};

export type ChatMessageProps = {
  message: ChatMessage;
};

export type ChatMessageListProps = {
  messages: ChatMessage[];
};

export type ConnectionStatus = "connecting" | "open" | "closed";

export type ChatInputProps = {
  onSendMessage: (text: string) => void;
  connectionStatus: ConnectionStatus;
};
