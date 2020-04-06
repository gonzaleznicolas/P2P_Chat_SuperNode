import { Request, Response } from 'express';
import { firebaseObject } from '../config/Firebase';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';
import { MessageRequest } from '../models/Requests';
import { Chatroom, Message } from '../models/Chatroom';

export class MessageController {
  private static polledChatIds = new Set();

  private static validateBody(body: any) {
    if (body.chatId && body.log) {
      const messages = body.log as Message[];
      for (const msg of messages) {
        if (!(msg.message && msg.username)) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
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
      console.warn('Incorrect message log received');
      res.send('Incorrect message log received');
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
          } else if (chatroom.log.length === messageRequest.log.length) {
            if (MessageController.polledChatIds.has(messageRequest.chatId)) {
              MessageController.polledChatIds.delete(messageRequest.chatId);
            }
            res.send('Message log received');
          } else {
            res.send('Polled log has less entries than existing messaging log. Will not save.');
          }
        } else {
          res.send('Message chatId does not exist');
        }
      });
  }
}
