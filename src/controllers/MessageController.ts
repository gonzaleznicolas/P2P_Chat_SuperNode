import { Request, Response } from 'express';
import { firebaseObject } from '../config/Firebase';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';
import { MessageRequest } from '../models/Requests';

export class MessageController {
  private static validateBody(body: any) {
    return body.chatId && body.log;
  }

  public handleMessageLog(req: Request, res: Response) {
    const messageRequest = req.body as MessageRequest;
    if (!MessageController.validateBody(messageRequest)) {
      console.warn('Incorrect heartbeat received');
      res.send('Incorrect heartbeat received');
      return
    }

    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .doc(messageRequest.chatId)
      .get()
      .then((doc) => {
        if (doc) {
          firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
            .doc(messageRequest.chatId)
            .set({ log: messageRequest.log }, { merge: true })
            .then(() => {
              res.send('Message log received');
            });
        } else {
          res.send('Message chatId does not exist');
        }
      });
  }
}
