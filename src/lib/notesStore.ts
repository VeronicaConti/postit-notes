import { Note } from "../types/note";

const KEY = "postit-notes";

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Note[]) : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes));
  } catch {
    console.error("Error guardando notas en localStorage");
  }
}

export function createNoteTemplate(): Note {
  const now = new Date().toISOString();
  return {
    id: String(Date.now()),
    title: "Nueva nota",
    content: "Contenido inicial",
    color: "yellow",
    tags: [],
    category: "general",
    important: false,
    createdAt: now,
    updatedAt: now,
  };
}
