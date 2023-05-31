import { Request, Response } from "express";
import { MongoChatRepository } from "./chat.mongo.repository";
import { InvalidData } from "./chat.errors";
import { socket } from "../../app";

const chatRepository = new MongoChatRepository();

export const createMessage = async (req: Request, res: Response) => {
  const { message, newChat } = req.body;
  const files = (req.files as Express.Multer.File[]) || [];
  if (!req.body.message) throw new InvalidData("Invalid data");

  let chat = message.chat;
  if (newChat) {
    chat = await chatRepository.createChat(newChat.users);
  }
  const fileNames = files.map((file) => file.filename);
  const createdMessage = await chatRepository.createMessage(
    { ...message, docs: fileNames },
    chat
  );

  socket.emit(chat, createdMessage);
  res.status(201).json({ ok: true, createdMessage });
};
