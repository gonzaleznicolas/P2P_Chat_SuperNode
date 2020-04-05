import { Request, Response } from 'express';
import { firebaseObject } from '../config/Firebase';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';
import { MessageRequest } from '../models/Requests';
import { Chatroom } from '../models/Chatroom';

export class MessageController {
  private static polledChatIds = new Set();

  private static validateBody(body: any) {
    return body.chatId && body.log;
  }

  public static addPolledChatId(chatId: string) {
    MessageController.polledChatIds.add(chatId);
  }

  public static hasPolledChatId(chatId: string): boolean {
    return MessageController.polledChatIds.has(chatId);
  }

  public handleMessageLog(req: Request, res: Response) {
    const messageRequest = req.body as MessageRequest;
    if (!MessageController.validateBody(messageRequest)) {
      console.warn('Incorrect heartbeat received');
      res.send('Incorrect heartbeat received');
      return;
    }

    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .doc(messageRequest.chatId)
      .get()
      .then((doc) => {
        if (doc) {
          const chatroom = doc.data() as Chatroom;
          if (chatroom.log.length < messageRequest.log.length) {
            firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
              .doc(messageRequest.chatId)
              .set({ log: messageRequest.log }, { merge: true })
              .then(() => {
                if (MessageController.polledChatIds.has(messageRequest.chatId)) {
                  MessageController.polledChatIds.delete(messageRequest.chatId);
                }
                res.send('Message log received');
              });
          } else {
            res.send('Polled log has less entries than existing messaging log. Will not save.');
          }
        } else {
          res.send('Message chatId does not exist');
        }
      });
  }
}
