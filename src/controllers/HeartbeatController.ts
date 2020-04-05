import { Request, Response } from 'express';
import { firebaseObject } from '../config/Firebase';
import moment from 'moment';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';
import { HeartbeatRequest } from '../models/Requests';
import { Chatroom } from '../models/Chatroom';

export class HeartbeatController {
  private static validateBody(body: any) {
    return body.userId && body.chatId && body.ip && body.port;
  }

  public handleHeartBeat(req: Request, res: Response) {
    console.log('Heartbeat received');

    const heartbeatRequest = req.body as HeartbeatRequest;
    if (!HeartbeatController.validateBody(heartbeatRequest)) {
      console.warn('Incorrect heartbeat received');
      res.send('Incorrect heartbeat received');
      return;
    }

    firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
      .doc(heartbeatRequest.chatId)
      .get()
      .then((doc) => {
        if (doc) {
          const chatroom = doc.data() as Chatroom;

          // Remove current member from members list
          const members = chatroom.members.filter((member) => {
            return member.userId !== heartbeatRequest.userId;
          });

          // Update members last seen timestamp
          members.push({
            userId: heartbeatRequest.userId,
            ip: heartbeatRequest.ip,
            port: heartbeatRequest.port,
            lastSeen: moment().valueOf(),
          });

          // Update database
          firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
            .doc(heartbeatRequest.chatId)
            .set({ members: members, toBePolled: false }, { merge: true })
            .then(() => {
              // Send polling response if needed
              if (chatroom.toBePolled) {
                // TODO: Add mechanism to to set toBePolled to true if poll fails
                res.send('Heartbeat received - Send message history');
              } else {
                res.send('Heartbeat received');
              }
            });
        } else {
          res.send('Chatroom id does not exist');
        }
      });
  }
}
