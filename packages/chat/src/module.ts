import type { ZConnectClient } from "../../core/src/index.js";
import * as operations from "./operations/index.js";

export class ChatModule {
  constructor(private client: ZConnectClient) {}

  create = (input: Parameters<typeof operations.createChat>[1]) =>
    operations.createChat(this.client, input);

  list = (input?: Parameters<typeof operations.getChats>[1]) =>
    operations.getChats(this.client, input);

  get = (chatId: Parameters<typeof operations.getChat>[1]) =>
    operations.getChat(this.client, chatId);

  sendMessage = (input: Parameters<typeof operations.sendMessage>[1]) =>
    operations.sendMessage(this.client, input);

  getMessages = (
    chatId: Parameters<typeof operations.getMessages>[1],
    input?: Parameters<typeof operations.getMessages>[2],
  ) => operations.getMessages(this.client, chatId, input);
}
