import { Request, Response } from 'express';
import { firebaseObject } from '../config/Firebase';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';

export class MessageController {
  private static validateBody(body: any) {
    return body.chatId && body.log;
  }

  public handleMessageLog(req: Request, res: Response) {
    const body = req.body;
    if (!MessageController.validateBody(body)) {
      console.warn('Incorrect heartbeat received');
      res.send('Incorrect heartbeat received');
      return;
    }

    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .doc(req.body.chatId)
      .get()
      .then((doc) => {
        if (doc) {
          firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
            .doc(body.chatId)
            .set({ log: body.log }, { merge: true })
            .then(() => {
              res.send('Message log received');
            });
        } else {
          res.send('Message chatId does not exist');
        }
      });
  }
}
