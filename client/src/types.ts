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
};