import firebase from 'firebase/compat/app';
import { db } from '../firebase/config';

const addCommentToPostInDB = async ({ postId, commentData }) => {
  const { userId, userAvatar, text } = commentData;
  try {
    const postRef = db.collection('posts').doc(postId);
    await postRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        userId,
        userAvatar,
        text,
        createdAt: new Date(),
      }),
    });
    const postDoc = await postRef.get();
    const postData = postDoc.data();

    postData.createdAt = postData.createdAt.toDate().getTime();
    postData.comments = postData.comments.map(comment => {
      comment.createdAt = comment.createdAt.toDate().getTime();
      return comment;
    });
    postData.id = postDoc.id;
    return { postData };
  } catch (error) {
    console.error('Error adding comment', error);
  }
};

export default addCommentToPostInDB;
