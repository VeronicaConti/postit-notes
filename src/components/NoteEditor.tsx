import { Note } from "../types/note";

interface NoteEditorProps {
  note: Note;
  onChange: (updated: Note) => void;
}

export default function NoteEditor({ note, onChange }: NoteEditorProps) {
  function update(fields: Partial<Note>) {
    onChange({ ...note, ...fields, updatedAt: new Date().toISOString() });
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Editar nota</h2>

      <label>
        Título:
        <input
          type="text"
          value={note.title}
          onChange={(e) => update({ title: e.target.value })}
        />
      </label>

      <label>
        Contenido:
        <textarea
          value={note.content}
          onChange={(e) => update({ content: e.target.value })}
          rows={8}
        />
      </label>

      <label>
        Categoría:
        <select
          value={note.category}
          onChange={(e) => update({ category: e.target.value as Note["category"] })}
        >
          <option value="general">General</option>
          <option value="work">Trabajo</option>
          <option value="study">Estudio</option>
          <option value="ideas">Ideas</option>
          <option value="personal">Personal</option>
        </select>
      </label>

      <label>
        Color:
        <select
          value={note.color}
          onChange={(e) => update({ color: e.target.value as Note["color"] })}
        >
          <option value="yellow">Amarillo</option>
          <option value="pink">Rosa</option>
          <option value="blue">Azul</option>
          <option value="green">Verde</option>
          <option value="purple">Violeta</option>
        </select>
      </label>

      <label>
        Tags (separados por coma):
        <input
          type="text"
          value={note.tags.join(", ")}
          onChange={(e) =>
            update({ tags: e.target.value.split(",").map((t) => t.trim()) })
          }
        />
      </label>

      <label>
        Importante:
        <input
          type="checkbox"
          checked={note.important}
          onChange={(e) => update({ important: e.target.checked })}
        />
      </label>
    <label>
        Realizada:
        <input
            type="checkbox"
            checked={note.done}
            onChange={(e) => update({ done: e.target.checked })}
        />
        </label>

    </div>
    
  );
}
