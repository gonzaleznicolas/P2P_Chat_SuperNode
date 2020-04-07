import express, { Request, Response } from 'express';
import { controllers } from '../controllers';

/**
 * Routes requests to the /chatroom endpoint
 */
export const chatroomRouter = express.Router({
  strict: true,
});

chatroomRouter.get('/', (req: Request, res: Response) => {
  controllers.chatroomController.readAllChatrooms(req, res);
});

chatroomRouter.post('/', (req: Request, res: Response) => {
  controllers.chatroomController.getChatRoomMembers(req, res);
});

chatroomRouter.post('/create', (req: Request, res: Response) => {
  controllers.chatroomController.createChatroom(req, res);
});
