import { ChatroomController } from "./ChatroomController";
import { HeartbeatController } from "./HeartbeatController";

const controllers = {
  chatroomController: new ChatroomController(),
  heartbeatController: new HeartbeatController()
};

export { controllers };
