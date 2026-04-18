import type { ZConnectClient } from '@apzoniqx/sdk-core';
import type { CreateChatInput, SendMessageInput, ListChatsInput } from '../types/input.js';
import type { Chat, Message, ChatsListResponse, MessagesListResponse } from '../types/output.js';

export async function createChat(
  client: ZConnectClient,
  input: CreateChatInput,
): Promise<Chat> {
  return client.post<Chat>('/api/v1/chats', input);
}

export async function getChats(
  client: ZConnectClient,
  input: ListChatsInput = {},
): Promise<ChatsListResponse> {
  return client.get<ChatsListResponse>('/api/v1/chats', { query: input });
}

export async function getChat(
  client: ZConnectClient,
  chatId: string,
): Promise<Chat> {
  return client.get<Chat>(`/api/v1/chats/${chatId}`);
}

export async function sendMessage(
  client: ZConnectClient,
  input: SendMessageInput,
): Promise<Message> {
  return client.post<Message>('/api/v1/chats/messages', input);
}

export async function getMessages(
  client: ZConnectClient,
  chatId: string,
  input: ListChatsInput = {},
): Promise<MessagesListResponse> {
  return client.get<MessagesListResponse>(`/api/v1/chats/${chatId}/messages`, { query: input });
}
