import { Request, Response } from 'express';
import { firebaseObject } from '../config/Firebase';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';
import moment from 'moment';
import { Chatroom, Member, Message } from '../models/Chatroom';
import { ChatroomRequest } from '../models/Requests';

export class ChatroomController {
  private static validateBody(body: any) {
    return body.userId && body.chatId && body.ip && body.port;
  }

  public readAllChatrooms(req: Request, res: Response) {
    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .get()
      .then((collection) => {
        const chatrooms = collection.docs.map((doc) => {
          const chatroom = doc.data() as Chatroom;
          return {
            chatRoomId: chatroom.id,
            chatRoomName: chatroom.name,
          };
        });

        res.json({ rooms: chatrooms });
      });
  }

  public getChatRoomMembers(req: Request, res: Response) {
    const chatRoomRequest = req.body as ChatroomRequest;
    if (!ChatroomController.validateBody(chatRoomRequest)) {
      console.warn('Incorrect chatroom request received');
      res.send('Incorrect chatroom request received');
      return;
    }

    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .doc(chatRoomRequest.chatId)
      .get()
      .then((doc) => {
        const chatroom = doc.data() as Chatroom;
        const members = chatroom.members.filter((member) => {
          const currentMoment = moment().valueOf();
          return currentMoment - member.lastSeen < 50000;
        });

        let returnBody = { members: members, log: [] as Message[] };

        if (members.length === 0) {
          returnBody.log = chatroom.log;

          firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
            .doc(chatRoomRequest.chatId)
            .set(
              {
                members: [
                  {
                    ip: chatRoomRequest.ip,
                    lastSeen: moment().valueOf(),
                    port: chatRoomRequest.port,
                    userId: chatRoomRequest.userId,
                  },
                ],
              },
              { merge: true },
            )
            .then(() => {
              // TODO: Log error
            });
        }

        res.json(returnBody);
      });
  }
}
