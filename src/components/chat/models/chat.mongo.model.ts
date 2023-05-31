import { Document, Schema, model, Model } from "mongoose";

export interface IChat extends Document {
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatModel extends IChat, Document {}

enum TypesOfStatus {
  OPEN = 0,
  ARCHIVED = 1,
}

const chatSchema = new Schema<IChat>(
  {
    status: {
      type: Number,
      default: TypesOfStatus.OPEN,
    },
  },
  {
    timestamps: true,
  }
);

export const ChatModel: Model<IChat> = model<IChat>("Chat", chatSchema);
