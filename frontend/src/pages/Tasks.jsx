import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api";
import iconLongout from "../assets/icon/logout.svg";
import "../assets/styles/index.css";
import { FaTrash } from "react-icons/fa";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      loadTasks();
    }
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchAPI("/tasks");
      setTasks(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas: ", err);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleAddTask = async () => {
    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      alert("O título da tarefa não pode estar vazio!");
      return; // Impede a requisição
    }
    try {
      const task = await fetchAPI("/tasks", "POST", { title: newTask });
      setTasks([...tasks, task]);
      setNewTask("");
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetchAPI(`/tasks/${taskId}`, "DELETE");
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      if (error.message.includes("408")) {
        alert("Você não pode deletar tasks de outros usuários!");
      } else {
        console.error("Erro ao deletar task", error);
      }
    }
  };
  const confirmDelete = (taskId) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      handleDeleteTask(taskId);
    }

    // handleDeleteTask(taskId);
  };

  return (
    <div className="tasks-container">
      <button className="longout-btn" onClick={handleLogout}>
        <img src={iconLongout} alt="longout" />
      </button>
      <div className="task-content">
        <h2>Minhas Tarefas</h2>
        <hr />
        <ul className="task-list">
          {Array.isArray(tasks) &&
            tasks.map((task) => (
              <li key={task.id}>
                <span>{task.title}</span>
                <button
                  onClick={() => {
                    confirmDelete(task.id);
                  }}
                  className="delete-btn"
                  aria-label="Deletar tarefa"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
        </ul>

        <div className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Adicionar</button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;

/* /C:/MeusProjetos/taskflow/frontend/src/assets/styles/index.css */
