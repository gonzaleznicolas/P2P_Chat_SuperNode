import { ChatroomController } from './ChatroomController';
import { HeartbeatController } from './HeartbeatController';
import { MessageController } from './MessageController';

/**
 * All controllers
 */
const controllers = {
  chatroomController: new ChatroomController(),
  heartbeatController: new HeartbeatController(),
  messageController: new MessageController(),
};

export { controllers };
