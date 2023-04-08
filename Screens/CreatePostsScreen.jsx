import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  TextInput,
  Keyboard,
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';

import { GEOLOC_API_URL, GEOLOC_API_KEY } from '../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../redux/core/coreOperations';
import {
  userIdSelector,
  userNameSelector,
  userAvatarSelector,
} from '../redux/auth/authSelectors';
import {
  dbErrorSelector,
  isDataFetchingSelector,
} from '../redux/core/coreSelectors';
import setErrorMsg from '../utils/setErrorMsg';
import { resetCoreError } from '../redux/core/coreSlice';
import SpinnerSemiTransparent from '../Components/SpinnerSemiTransparent';

const CreatePostScreen = ({ navigation }) => {
  const initialFormState = {
    image: '',
    title: '',
    position: '',
  };

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [camera, setCamera] = useState(null);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [locationPermission, setLocationPermission] = useState(null);
  const [mainLocation, setMainLocation] = useState({
    latitude: '',
    longitude: '',
  });
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const userName = useSelector(userNameSelector);
  const userAvatar = useSelector(userAvatarSelector);

  const dbError = useSelector(dbErrorSelector);
  const isLoading = useSelector(isDataFetchingSelector);

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      if (!photo) return false;
      await MediaLibrary.createAssetAsync(photo.uri);

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setMainLocation({ latitude, longitude });
      const url =
        GEOLOC_API_URL + `lat=${latitude}&lng=${longitude}` + GEOLOC_API_KEY;
      try {
        const response = await fetch(url);
        const result = await response.json();

        const position = `${result?.geonames[0]?.name}, ${result?.geonames[0]?.countryName}`;
        position
          ? setFormState(prevState => ({ ...prevState, position }))
          : null;
      } catch (error) {
        console.error(error);
      }
      setFormState(prevState => ({ ...prevState, image: photo.uri }));
    }
  };

  const hideKeyboard = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const handleBlur = () => {
    setKeyboardVisible(false);
  };

  const handleFocus = () => {
    setKeyboardVisible(true);
  };

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const result = await dispatch(
        addPost({
          userId,
          userName,
          userAvatar,
          title: formState.title,
          image: formState.image,
          coordinates: mainLocation,
          location: formState.position,
        })
      );
      setKeyboardVisible(false);
      setFormState(initialFormState);
      setSubmitDisabled(true);
      navigation.navigate('Posts');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: setErrorMsg(dbError),
        text2: 'Please try again later',
      });
      resetCoreError();
    }
  };

  useEffect(() => {
    if (
      formState.image &&
      formState.title &&
      formState.title.trim().length > 0 &&
      formState.position
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [formState.image, formState.title, formState.position]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
    })();
  }, []);

  if (cameraPermission === null) {
    return <View />;
  }
  if (cameraPermission === false) {
    return <Text>No access has given to a camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        {isLoading && <SpinnerSemiTransparent />}
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.camera}>
            <Camera
              style={styles.containerCamera}
              ref={ref => {
                setCamera(ref);
              }}
            >
              {formState.image ? (
                <Image style={styles.photo} source={{ uri: formState.image }} />
              ) : null}
              <Pressable
                style={{
                  ...styles.addImageBtn,
                  backgroundColor: formState.image
                    ? 'rgba(255, 255, 255, 0.3)'
                    : '#ffffff',
                }}
                onPress={takePhoto}
              >
                {formState.image ? (
                  <Icon name="photo-camera" size={24} color="#FFFFFF" />
                ) : (
                  <Icon name="photo-camera" size={24} color="#BDBDBD" />
                )}
              </Pressable>
            </Camera>
            {formState.image ? (
              <Text style={styles.formTitle}>Picture uploaded</Text>
            ) : (
              <Text style={styles.formTitle}>Take a picture</Text>
            )}
          </View>

          <View style={{ ...styles.inputContanier, marginBottom: 16 }}>
            <TextInput
              style={styles.input}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={formState.title}
              placeholder="Caption..."
              placeholderTextColor="#BDBDBD"
              onChangeText={value =>
                setFormState(prevState => ({ ...prevState, title: value }))
              }
            />
          </View>
          <View style={styles.inputContanier}>
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 4 }}
            />
            <TextInput
              style={styles.input}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={formState.position}
              placeholder="Location..."
              placeholderTextColor="#BDBDBD"
              onChangeText={value =>
                setFormState(prevState => ({ ...prevState, position: value }))
              }
            />
          </View>

          <Pressable
            style={{
              ...styles.formBtn,
              backgroundColor: submitDisabled ? '#F6F6F6' : '#FF6C00',
            }}
            onPress={onSubmitForm}
            disabled={submitDisabled}
          >
            <Text
              style={
                submitDisabled
                  ? { ...styles.formBtnText, color: '#BDBDBD' }
                  : styles.formBtnText
              }
            >
              Make a post
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
        <Pressable
          style={styles.deleteBtn}
          onPress={() => setFormState(initialFormState)}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  camera: {
    marginTop: 32,
    alignItems: 'center',
  },
  formTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    marginTop: 8,
    marginBottom: 32,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  inputContanier: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#E8E8E8',
    height: 50,
    backgroundColor: 'transparent',
    width: '100%',
  },

  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    width: '100%',
  },
  formBtn: {
    padding: 16,
    borderRadius: 100,
    marginTop: 32,
    width: 343,
  },
  deleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 40,
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 32,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
  formBtnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  formText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
  containerCamera: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photo: {
    borderWidth: 1,
    borderRadius: 8,
    width: 343,
    height: 240,
    overflow: 'hidden',
  },
  addImageBtn: {
    position: 'absolute',
    transform: [{ translateX: 145 }, { translateY: 90 }],
    padding: 18,
    borderRadius: 50,
  },
  passwordIndicator: {
    position: 'absolute',
    top: 15,
    right: 16,
  },
  passwordIndicatorText: {
    color: '#1B4371',
  },
});

export default CreatePostScreen;
