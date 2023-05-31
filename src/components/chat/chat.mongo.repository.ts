import { objectIdIsValid } from "../../helpers";
import { UserModel } from "../../models/user.mongo.model";
import { IMessage, Message } from "./chat.entities";
import { FailedCreateChat, InvalidData } from "./chat.errors";
import { ChatModel, ChatParticipantModel, MessageModel } from "./models";

export class MongoChatRepository {
  public async createChat(users: string[]) {
    if (users.some((user) => !objectIdIsValid(user)))
      throw new InvalidData("Invalid users");

    const existingUsers = await UserModel.find({ _id: { $in: users } });
    if (existingUsers.length !== users.length)
      throw new InvalidData("Invalid users");

    const existingChat = await ChatParticipantModel.findOne({
      users: { $all: users },
    });

    if (existingChat) {
      return existingChat.chat;
    }

    const chat = await ChatModel.create({});

    if (!chat) {
      throw new FailedCreateChat("Failed to create chat");
    }

    await ChatParticipantModel.create({ chat: chat._id, users });
    return chat._id;
  }

  public async createMessage(message: IMessage, chatId: string) {
    if (!objectIdIsValid(chatId)) throw new InvalidData("Invalid chat");

    const chatExist = await ChatModel.findById(chatId);
    if (!chatExist) throw new InvalidData("Invalid chat");

    const createdMessage = new Message(message, chatId);
    await MessageModel.create(createdMessage);
    return createdMessage;
  }
}
