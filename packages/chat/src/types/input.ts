export interface CreateChatInput {
  dealId: string;
  message?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SendMessageInput {
  chatId: string;
  content: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ListChatsInput {
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}
