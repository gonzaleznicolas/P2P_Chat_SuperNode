import { Message } from './Chatroom';

export interface ChatroomRequest {
  chatId: string;
  userId: string;
  ip: string;
  port: string;
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
