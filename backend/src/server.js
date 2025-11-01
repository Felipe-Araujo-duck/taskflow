import express from "express";
import cors from "cors";
import { sequelize } from "./config/db.js";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as taskRoutes } from "./routes/taskRoutes.js";
import { swaggerDocs } from "./swagger.js"; 

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Swagger
swaggerDocs(app);

sequelize.sync().then(() => console.log("Banco conectado com sucesso!"));
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
