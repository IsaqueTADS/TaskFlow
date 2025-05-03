import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api";
import  iconLongout  from "../assets/icon/logout.svg";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
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
  return (
    <div className="tasks-container">
      <button className="longout-btn" onClick={handleLogout}>
        <img src={iconLongout} alt="longout" />
      </button>
      <div>
        <h2>Minhas Tarefas</h2>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Adicionar</button>
      </div>
    </div>
  );
};

export default Tasks;
