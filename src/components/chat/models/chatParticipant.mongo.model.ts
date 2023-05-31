import {
  Document,
  Schema,
  model,
  Model,
  SchemaDefinitionProperty,
} from "mongoose";

export interface IChatParticipant extends Document {
  chat: SchemaDefinitionProperty<string> | undefined;
  users: SchemaDefinitionProperty[] | [];
  createdAt: Date;
  updatedAt: Date;
}

const chatParticipant = new Schema<IChatParticipant>(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ChatParticipantModel: Model<IChatParticipant> =
  model<IChatParticipant>("ChatParticipant", chatParticipant);
