import express, { Request, Response } from 'express';
import { controllers } from '../controllers';

export const messageRouter = express.Router({
  strict: true,
});

messageRouter.post('/', (req: Request, res: Response) => {
  controllers.messageController.handleMessageLog(req, res);
});
