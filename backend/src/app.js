import express from "express";
import cors from "cors";
import router from "./routes/authRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend está funcionando! 🚀");
});

app.use("/api/auth", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodadndo: http://localhost:${PORT}`);
});
