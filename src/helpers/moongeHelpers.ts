import mongoose from "mongoose";

export const objectIdIsValid = (chatId: string) =>
  mongoose.Types.ObjectId.isValid(chatId);
