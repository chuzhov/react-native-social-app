import { storage } from '../firebase/config';

const uploadImageToFireStorage = async (userId, image) => {
  const theMoment = new Date();
  const storageRef = storage.ref();
  const fileNameToStore = userId + theMoment;
  const imageRef = storageRef.child(`images/${fileNameToStore}.jpg`);
  const response = await fetch(image);
  const blob = await response.blob();
  await imageRef.put(blob);
  const imageUrl = await imageRef.getDownloadURL();
  return imageUrl;
};

export default uploadImageToFireStorage;
