import firebase from 'firebase/compat/app';
import { db } from '../firebase/config';

const addUsersLikeToDB = async ({ postId, userId }) => {
  const postRef = db.collection('posts').doc(postId);
  await postRef.update({
    likes: firebase.firestore.FieldValue.arrayUnion(userId),
  });
  const postSnapshot = await postRef.get();
  const post = postSnapshot.data();
  return post.likes;
};

export default addUsersLikeToDB;
