import * as ImagePicker from 'expo-image-picker';

export const checkMediaLibraryPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status !== 'granted' ? false : true;
};

export const requestMediaLibraryPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status !== 'granted' ? false : true;
};
