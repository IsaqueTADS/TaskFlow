import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api";
import iconLongout from "../assets/icon/logout.svg";
import "../assets/styles/index.css";
import { FaTrash } from "react-icons/fa";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();
  const inputElement = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      loadTasks();
    }
  }, []);

  const removeToken = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const timeOut = () => {
    alert("Sessão expirada, logue novamente!");
    removeToken();
  };

  const handleLogout = () => {
    removeToken();
  };

  const loadTasks = async () => {
    try {
      const data = await fetchAPI("/tasks");
      setTasks(data);
    } catch (err) {
      console.error("Erro ao carregar tarefas: ", err);
      removeToken();
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
      setTasks((prev) => (Array.isArray(prev) ? [...prev, task] : [task]));
      setNewTask("");
      inputElement.current.focus();
    } catch (err) {
      if (err.message === "Token inválido") {
        timeOut();
      } else {
        console.error("Erro ao criar tarefa:", err);
      }
    }
  };

  const handleDeleteAllTasks = async () => {
    if (
      confirm(
        "Isso apagará para sempre todas suas tarefas! \nTem certeza disso?"
      )
    ) {
      try {
        await fetchAPI(`/tasks/all`, "DELETE");
        setTasks("");
      } catch (err) {
        if (err.message === "Token inválido") {
          timeOut();
        }
        console.error(err);
        alert(`ERRO: ${err.message || "Erro desconhecido (Interno)"}`);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetchAPI(`/tasks/${taskId}`, "DELETE");
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      if (err.message.includes("408")) {
        alert("Você não pode deletar tasks de outros usuários!");
      } else if (err.message === "Token inválido") {
        timeOut();
      } else {
        console.error("Erro ao deletar task", err);
      }
    }
  };

  const handleToggleCheck = async (taskId, isCompleted) => {
    try {
      await fetchAPI(`/tasks/${taskId}`, "PUT", { completed: isCompleted });
      setTasks((prev) =>
        prev.map((task) => {
          return task.id === taskId
            ? { ...task, completed: isCompleted }
            : task;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const confirmDelete = (taskId) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      handleDeleteTask(taskId);
    }
  };

  return (
    <div className="tasks-container">
      <button className="longout-btn" onClick={handleLogout}>
        Sair
        <img src={iconLongout} alt="longout" />
      </button>
      <div className="task-content">
        <div className="taks-title">
          <h2>Minhas Tarefas</h2>
          <button onClick={handleDeleteAllTasks}>Limpar</button>
        </div>
        <hr />
        <ul className="task-list">
          {Array.isArray(tasks) &&
            tasks.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCheck(task.id, !task.completed)}
                />
                <span>{task.title}</span>
                <button
                  onClick={() => confirmDelete(task.id)}
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
            ref={inputElement}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask(); // Chama a função de adicionar a tarefa quando pressionar Enter
              }
            }}
            maxLength={250}
          />
          <button onClick={handleAddTask}>Adicionar</button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
