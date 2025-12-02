import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Note } from "../types/note";
import { loadNotes, saveNotes, createNoteTemplate } from "../lib/notesStore";
import NoteCard from "../components/NoteCard";

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [search, setSearch] = useState(""); // estado del buscador
  const navigate = useNavigate();

  function handleCreateNote() {
    const newNote = createNoteTemplate();
    const next = [newNote, ...notes];
    setNotes(next);
    saveNotes(next);
    navigate(`/notes/${newNote.id}`);
  }

  // filtrado de notas por titul, contenido, cat y tags
  const filteredNotes = notes.filter((note) => {
    const text = `${note.title} ${note.content} ${note.category} ${note.tags.join(" ")}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="dashboard">
      <h1 className="page-title">Notas</h1>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por título, categoría o tag..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          maxWidth: "400px",
          fontSize: "1rem",
        }}
      />

      {/* Lista de notas  */}
      <div className="note-list">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {/*  Botón  para crear nota */}
      <button
        onClick={handleCreateNote}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          fontSize: "2rem",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        +
      </button>
    </div>
  );
}
