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
