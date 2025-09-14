import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authentication.js";
import questionRoutes from "./routes/question.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
