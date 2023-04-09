import { storage } from '../firebase/config';

const uploadAvatarToFireStorage = async (userId, image) => {
  try {
    const theMoment = new Date();
    const storageRef = storage.ref();
    const fileNameToStore = userId;
    const imageRef = storageRef.child(`avatars/${fileNameToStore}.jpg`);
    const response = await fetch(image);
    const blob = await response.blob();
    await imageRef.put(blob);
    const imageUrl = await imageRef.getDownloadURL();
    return imageUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export default uploadAvatarToFireStorage;
