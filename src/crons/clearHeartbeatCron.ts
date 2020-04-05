import { firebaseObject } from '../config/Firebase';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';
import moment from 'moment';

export const clearHeartbeatCron = () => {
  setInterval(filterMembers, 60000);
};

const filterMembers = () => {
  console.log('Running filtering cron');
  firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
    .get()
    .then((docs) => {
      const chatrooms = docs.docs;
      chatrooms.map((chatroom) => {
        const onlineMembers = chatroom.data().members.filter((member) => {
          const currentMoment = moment().valueOf();
          return currentMoment - member.lastSeen < 1200000;
        });

        if (onlineMembers.length !== chatroom.data().members.length) {
          firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
            .doc(chatroom.data().id)
            .set({ members: onlineMembers }, { merge: true });
        }
      });
    });
};
