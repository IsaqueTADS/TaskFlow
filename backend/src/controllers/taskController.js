import prisma from "../utils/prisma.js";

export const getTask = async (req, res) => {
  try {
    const task = await prisma.task.findMany({
      where: { userId: req.userId },
      orderBy: {
        id: "desc",
      },
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

export const deletarAllTask = async (req, res) => {
  const userId = req.userId;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    if (tasks.length === 0) {
      return res.status(404).json({ error: "Nenhuma task econtrada" });
    }

    await prisma.task.deleteMany({
      where: { userId },
    });
    res
      .status(200)
      .json({ message: "Todas as tarefas foram deletadas com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar todas as tasks" });
  }
};

export const updateCompletedTask = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!task) {
    return res.status(404).json({ error: "Nenhuma task foi econtrada" });
  }

  if (task.userId !== userId) {
    res
      .status(403)
      .json({ error: "Você não tem permissão para atualizar esta task" });
  }

  const { completed } = req.body;

  try {
    await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        completed: completed,
      },
    });
    return res.status(200).json({ message: "Task atualizada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar tasks" });
  }
};
