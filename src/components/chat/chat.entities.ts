export interface IMessage {
  chat: string;
  user: string;
  text: string;
  docs: string[];
}

export class Message implements IMessage {
  chat: string;
  user: string;
  text: string;
  docs: string[];

  constructor({ text, user, docs }: IMessage, chat: string) {
    this.chat = chat;
    this.text = text;
    this.user = user;
    this.docs = docs.map((doc) => `${process.env.BASE_URL}${doc}`);
  }

  public setChat(chat: string): void {
    this.chat = chat;
  }
}
