import { Request, Response } from 'express';
import { firebaseObject } from '../config/Firebase';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';
import moment from 'moment';

export class ChatroomController {
  private static validateBody(body: any) {
    return body.userId && body.chatId && body.ip && body.port;
  }

  public readAllChatrooms(req: Request, res: Response) {
    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .get()
      .then((collection) => {
        const chatrooms = collection.docs.map((doc) => {
          return {
            chatRoomId: doc.data().id,
            chatRoomName: doc.data().name,
          };
        });

        res.json({ rooms: chatrooms });
      });
  }

  public getChatRoomMembers(req: Request, res: Response) {
    const body = req.body;
    if (!ChatroomController.validateBody(body)) {
      console.warn('Incorrect chatroom request received');
      res.send('Incorrect chatroom request received');
      return;
    }

    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .doc(body.chatId)
      .get()
      .then((doc) => {
        let members = doc.data()?.members ? doc.data()?.members : [];
        members = members.filter((member) => {
          const currentMoment = moment().valueOf();
          return currentMoment - member.lastSeen < 600000;
        });

        let returnBody = { members: members, log: [] };

        if (members.length === 0) {
          returnBody.log = doc.data()?.log;

          firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
            .doc(body.chatId)
            .set(
              {
                members: [
                  {
                    ip: body.ip,
                    lastSeen: moment().valueOf(),
                    port: body.port,
                    userId: body.userId,
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
