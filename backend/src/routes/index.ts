import { Router } from "express";
import { getRepository } from "typeorm";
import { Todo } from "../entity/todo";

const router = Router();

router.get("/todo", async (req, res) => {
  const todos = await getRepository(Todo).find();
  return res.json(todos);
});

router.get("/todo/:id", async (req, res) => {
  const todo = await getRepository(Todo).findOne({
    id: parseInt(req.params.id),
  });
  return res.json(todo);
});

router.post("/todo", async (req, res) => {
  const todoRepo = getRepository(Todo);
  const todoEntity = todoRepo.create({
    description: req.body.description,
  });
  const todo = await todoRepo.save(todoEntity);
  return res.status(201).json(todo);
});

router.put("/todo/:id", async (req, res) => {
  const todoRepo = getRepository(Todo);
  const todoEntity = await todoRepo.findOne({ id: parseInt(req.params.id) });
  if (todoEntity) {
    todoEntity.completed = !todoEntity.completed;
    const todo = await todoRepo.save(todoEntity);
    return res.json(todo);
  } else {
    return res.status(422).json({ message: "Todo not found" });
  }
});

router.delete("/todo/:id", async (req, res) => {
  const todoRepo = getRepository(Todo);
  const todoEntity = await todoRepo.findOne({ id: parseInt(req.params.id) });
  if (todoEntity) {
    await todoRepo.remove(todoEntity);
    return res.json(todoEntity);
  } else {
    return res.status(422).json({ message: "Todo not found" });
  }
});

export default router;
