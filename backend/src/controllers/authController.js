import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient();

//Cadastro de usuario
export const register = async (req, res) => {
  const { email, password } = req.body;
  // Verifica se o email já existe
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  //Criptografando a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  //salvar no banco de dados

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  res.status(201).json({ message: "Usuario criado" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Buscar o usuário
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  //comparar senhas
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  //Gerar um token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};
