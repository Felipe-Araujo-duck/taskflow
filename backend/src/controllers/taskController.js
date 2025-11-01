import { Task } from "../models/Task.js";
import jwt from "jsonwebtoken";

export const createTask = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const task = await Task.create({ ...req.body, userId: decoded.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listTasks = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tasks = await Task.findAll({ where: { userId: decoded.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.update(req.body, { where: { id } });
    res.json({ message: "Tarefa atualizada com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id } });
    res.json({ message: "Tarefa excluída!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
