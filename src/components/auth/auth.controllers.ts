import { Request, Response } from "express";
import { MongoAuthRepository } from "./auth.mongo.repository";

const authRepository = new MongoAuthRepository();

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  await authRepository.createUser(body);
  res.status(201).json({ ok: true });
};

export const loginUser = async (req: Request, res: Response) => {
  const { body } = req;
  const access = await authRepository.login(body);
  res.status(201).json({ ok: true, access });
};
