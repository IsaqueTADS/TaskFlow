import prisma from "../utils/prisma.js";

export const getTask = async (req, res) => {
  const task = await Prisma.task.findMany({
    where: { userId: req.userId },
  });
  res.json(task);
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
