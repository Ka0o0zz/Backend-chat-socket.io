import {
  Document,
  Schema,
  model,
  Model,
  SchemaDefinitionProperty,
} from "mongoose";

interface IMessage extends Document {
  chat: SchemaDefinitionProperty<string> | undefined;
  user: SchemaDefinitionProperty<string> | undefined;
  text: string;
  docs: string[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    docs: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const MessageModel: Model<IMessage> = model<IMessage>(
  "Message",
  messageSchema
);
