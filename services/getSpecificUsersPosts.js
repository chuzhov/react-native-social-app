import { db } from '../firebase/config';

export const getSpecificUsersPostsFromDB = async ({ userId }) => {
  try {
    const snapshot = await db
      .collection('posts')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const records = snapshot.docs.map(doc => {
      const data = doc.data();
      // Convert Firestore Timestamp to regular JS Date
      data.createdAt = data.createdAt.toDate().getTime();
      // Loop through the nested array and convert each createdAt value
      data.comments = data.comments.map(comment => {
        comment.createdAt = comment.createdAt.toDate().getTime();
        return comment;
      });
      return { id: doc.id, ...data };
    });

    return records;
  } catch (error) {
    console.dir({ error });
    throw error; // re-throw the error to be caught by the caller
  }
};
