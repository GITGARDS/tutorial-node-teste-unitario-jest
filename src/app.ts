import express, { Request, Response } from "express";

import User from "./user";
import { prisma } from "./database/prisma-client";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  console.log("name, email---------", name, email);
  const user = new User(name, email);
  User.validate(user);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },

    select: {
      id: true,
      name: true,
      email: true,
    },
  })
  .then(() => {
    res.status(201).json(newUser);
  })
  .catch(() => {
    res.status(404).json({ mensagem: "Registro nao encotrado!" });
  });

app.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const updateUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name,
      email,
    },
  })
  .then(() => {
    res.json(updateUser);
  })
  .catch(() => {
    res.status(404).json({ mensagem: "Registro nao encotrado!" });
  });
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteUser = await prisma.user
    .delete({
      where: { id: Number(id) },
    })
    .then(() => {
      res.json(deleteUser);
    })
    .catch(() => {
      res.status(404).json({ mensagem: "Registro nao encotrado!" });
    });
});

app.listen(PORT, () => {
  console.log("App rodando na porta", PORT);
});
