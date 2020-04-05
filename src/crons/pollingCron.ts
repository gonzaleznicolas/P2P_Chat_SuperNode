import { firebaseObject } from '../config/Firebase';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';

export const pollingCron = () => {
  // TODO: At 1 minute for testing, but change to 10 minutes
  setInterval(setPollFlag, 60000);
};

const setPollFlag = () => {
  console.log('Running polling cron');
  firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
    .get()
    .then((doc) => {
      const ids = doc.docs.map((d) => {
        return d.id;
      });

      ids.map((id) => {
        firebaseObject.DB.collection(DB_COLLECTION_CHATROOMS)
          .doc(id)
          .set({ toBePolled: true }, { merge: true });
      });
    });
};
