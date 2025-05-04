import prisma from "../utils/prisma.js";

export const getTask = async (req, res) => {
  try {
    const task = await prisma.task.findMany({
      where: { userId: req.userId },
    });

    if (task.length === 0) {
      return res.status(200).json({
        message: "Nenhuma tarefa encontrada para este usuário.",
        tasks: [],
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro interno no servidor ao buscar tarefas" });
  }
};

export const createTask = async (req, res) => {
  const { title } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      userId: req.userId,
    },
  });
  res.status(201).json(task);
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task) {
      return res.status(404).json({ error: "Task não encontrada" });
    }

    if (task.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para excluir esta task" });
    }

    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Task deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar task" });
  }
};
