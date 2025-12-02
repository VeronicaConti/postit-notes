import { Note } from "../types/note";
import { useNavigate } from "react-router-dom";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const navigate = useNavigate();

  return (
<div
  className={`note-card ${note.color}`}
  style={{
    padding: "1rem",
    margin: "0.5rem",
    borderRadius: "8px",
    cursor: "pointer",
  }}

  onClick={() => navigate(`/notes/${note.id}`)}

    > <span style={{ float: "right", fontSize: "1.2rem" }}>✏️</span>
      <h3>{note.title}</h3>
      <p>{note.content.slice(0, 100)}...</p>
      <small>
        Actualizada: {new Date(note.updatedAt).toLocaleDateString()}{" "}
        {new Date(note.updatedAt).toLocaleTimeString()}
      </small>
    </div>
  );
}

