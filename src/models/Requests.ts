import { Message } from './Chatroom';

export interface GetChatroomRequest {
  chatId: string;
  userId: string;
  ip: string;
  port: string;
}

export interface CreateChatroomRequest {
  name: string;
}

export interface HeartbeatRequest {
  userId: string;
  chatId: string;
  ip: string;
  port: string;
}

export interface MessageRequest {
  chatId: string;
  log: Message[];
}
