export type NoteColor = "yellow" | "pink" | "blue" | "green" | "purple";
export type NoteCategory = "general" | "work" | "study" | "ideas" | "personal";
export type NoteTag = string;

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  tags: string[];
  category: string;
  important: boolean;
  done: boolean; // ultimo agregado
  createdAt: string;
  updatedAt: string;
}
