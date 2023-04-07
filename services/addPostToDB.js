import { db } from '../firebase/config';

export default async function addPostToDB(post) {
  const postsCollection = db.collection('posts');
  await postsCollection.add(post);

  return true;
}
