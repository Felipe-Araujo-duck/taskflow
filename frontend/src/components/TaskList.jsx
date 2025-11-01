import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [creatingTask, setCreatingTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", status: "" });
  const token = localStorage.getItem("token");

  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const deleteTask = async (id) => {
    if (!confirm("Deseja realmente excluir esta tarefa?")) return;
    await axios.delete(`http://localhost:3000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleCreate = () => {
    setCreatingTask(true);
    setFormData({ title: "", description: "", status: "" });
  };


  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/tasks/${editingTask.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  

  const handleAdicionar = async () => {
    try {
      await axios.post(
        `http://localhost:3000/tasks`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCreatingTask(null);
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-10"
      style={{
        background: "linear-gradient(to right, #c9e6ff, #a1c4fd)",
      }}
    >
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Minhas Tarefas</h2>
          <button
            onClick={() => handleCreate()}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Adicionar Tarefa
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Sair
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{t.title}</h3>
                <p className="text-sm text-gray-600">{t.description}</p>
                <span
                  className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                    t.status === "Concluída"
                      ? "bg-green-100 text-green-700"
                      : t.status === "Pendente"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {t.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de Adição */}
      {creatingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
              Adicionar Tarefa
            </h3>
            <input
              type="text"
              placeholder="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded"
            >
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
              <option value="Pendente">Pendente</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setCreatingTask(null)}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdicionar}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
              Editar Tarefa
            </h3>
            <input
              type="text"
              placeholder="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded"
            >
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
              <option value="Pendente">Pendente</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
