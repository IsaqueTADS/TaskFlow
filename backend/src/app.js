import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    credentials: true, // permite cookies/tokens se necessário
  })
);

app.get("/", (req, res) => {
  res.send("Backend está funcionando! 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodadndo: http://localhost:${PORT}`);
});
