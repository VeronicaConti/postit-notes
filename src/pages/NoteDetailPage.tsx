import { useMemo, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Note } from "../types/note";
import { loadNotes, saveNotes } from "../lib/notesStore";
import NoteEditor from "../components/NoteEditor";

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());

  const note = useMemo(() => notes.find((n) => n.id === id), [notes, id]);

  if (!note) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Nota no encontrada</h2>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Volver al dashboard
        </button>
      </div>
    );
  }

  function updateNote(updated: Note) {
    const next = notes.map((n) => (n.id === updated.id ? updated : n));
    setNotes(next);
    saveNotes(next);
  }

  function handleDeleteNote() {
    const next = notes.filter((n) => n.id !== note.id);
    setNotes(next);
    saveNotes(next);
    navigate("/dashboard");
  }

  return (
    <div className="note-detail" style={{ padding: "1rem" }}>
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← Volver
      </button>

      <NoteEditor note={note} onChange={updateNote} />

      <button
        onClick={handleDeleteNote}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#cf1e9aff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        🗑️ ELIMINAR NOTA 🗑️
      </button>
    </div>
  );
}
