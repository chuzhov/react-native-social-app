import { db } from '../firebase/config';

export const getAllPostsFromDB = async (limit = 20) => {
  try {
    const snapshot = await Promise.race([
      db.collection('posts').orderBy('createdAt', 'desc').get(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Firestore timeout')), 10000)
      ),
    ]);

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

export default getAllPostsFromDB;
