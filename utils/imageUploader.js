import * as ImagePicker from 'expo-image-picker';

export const imageUploader = async useStateSetter => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.7,
  });
  if (result.canceled) {
    return false;
  }
  useStateSetter(result.assets[0].uri);
};
