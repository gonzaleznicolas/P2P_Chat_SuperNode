import { Message } from './Chatroom';

/**
 * Contract for the body in a get chatroom data request
 */
export interface GetChatroomRequest {
  chatId: string;
  userId: string;
  ip: string;
  port: string;
}

/**
 * Contract for the body in a create chatroom request
 */
export interface CreateChatroomRequest {
  name: string;
}

/**
 * Contract for the body in a heartbeat request
 */
export interface HeartbeatRequest {
  userId: string;
  chatId: string;
  ip: string;
  port: string;
}

/**
 * Contract for the body in a message log request
 */
export interface MessageRequest {
  chatId: string;
  log: Message[];
}
