export interface Chat {
  id: string;
  dealId: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
  [key: string]: unknown;
}

export interface ChatsListResponse {
  data: Chat[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MessagesListResponse {
  data: Message[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
