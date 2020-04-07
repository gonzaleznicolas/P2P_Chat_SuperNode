import { firebaseObject } from '../config/Firebase';
import { DB_COLLECTION_CHATROOMS } from '../config/constants';

/**
 * Sets the toBePolled flag for all chatrooms to true. Runs periodically
 */
export const pollingCron = () => {
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
