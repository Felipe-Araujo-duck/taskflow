import { useState } from "react";
import axios from "axios";

export default function TaskForm({ loadTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:3000/tasks",
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle("");
    setDescription("");
    loadTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-blue-50 p-4 rounded-xl shadow-inner mb-6">
      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="w-full">Adicionar Tarefa</button>
    </form>
  );
}
