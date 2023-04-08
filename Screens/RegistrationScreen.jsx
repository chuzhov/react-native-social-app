import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@expo/vector-icons/Feather';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ImageBackground,
  Text,
  Image,
} from 'react-native';
import { imageUploader } from '../utils/imageUploader';
import { signUp } from '../redux/auth/authOperations';
import { resetAuthError } from '../redux/auth/authSlice';
import { DEFAULT_AVATAR } from '../config/config';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import setErrorMsg from '../utils/setErrorMsg';
import { authErrorSelector } from '../redux/auth/authSelectors';
import { isLoggedInSelector } from '../redux/auth/authSelectors';

const RegistrationScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [focused, setFocused] = useState('');
  const dispatch = useDispatch();
  const signUpError = useSelector(authErrorSelector);
  const isLogged = useSelector(isLoggedInSelector);

  const displayNameInputHandler = userInput => {
    setDisplayName(userInput);
  };
  const emailInputHandler = userInput => {
    setEmail(userInput);
  };
  const passwordInputHandler = userInput => {
    setPassword(userInput);
  };

  const onRegFormSubmit = async event => {
    event.preventDefault();

    if (!avatar) {
      setAvatar(DEFAULT_AVATAR);
    }

    dispatch(signUp({ displayName, email, password, avatar }));

    if (!isLogged) {
      setAvatar(null);
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
  const hideKeyboard = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  useEffect(() => {
    if (email && password && displayName) {
      setSubmitDisabled(false);
    }
    if (!email || !password || !displayName) {
      setSubmitDisabled(true);
    }
  }, [email, password, displayName]);

  useEffect(() => {
    if (signUpError) {
      Toast.show({
        type: 'error',
        text1: setErrorMsg(signUpError),
      });
      dispatch(resetAuthError());
    }
  }, [signUpError]);

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require('../assets/img/bg.jpg')}
        >
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' && 'padding'}>
            <View
              style={{
                ...styles.form,
                paddingBottom:
                  keyboardVisible && Platform.OS == 'android' ? 32 : 111,
              }}
            >
              <View style={styles.addAvatarContainer}>
                {avatar ? (
                  <Image style={styles.avatar} source={{ uri: avatar }} />
                ) : null}
                <Pressable
                  style={styles.addAvatarBtn}
                  onPress={() => imageUploader(setAvatar)}
                  accessibilityLabel={'Add avatar'}
                >
                  {avatar ? (
                    <View style={styles.removeImageBtnImage}>
                      <Icon name="plus" size={25} color="#BDBDBD" />
                    </View>
                  ) : (
                    <View style={styles.addAvatarBtnIcon}>
                      <Icon name="plus" size={25} color="#FF6C00" />
                    </View>
                  )}
                </Pressable>
              </View>
              <Text style={styles.title}>Registration</Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  value={displayName}
                  onChangeText={displayNameInputHandler}
                  onFocus={() => {
                    setKeyboardVisible(true);
                    setFocused('displayName');
                  }}
                  onBlur={() => {
                    setFocused('');
                  }}
                  placeholder="Name"
                  style={{
                    ...styles.input,
                    borderColor:
                      focused === 'displayName' ? '#FF6C00' : '#E8E8E8',
                  }}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={email}
                  onChangeText={emailInputHandler}
                  onFocus={() => {
                    setKeyboardVisible(true);
                    setFocused('email');
                  }}
                  onBlur={() => {
                    setFocused('');
                  }}
                  placeholder="Email address"
                  style={{
                    ...styles.input,
                    borderColor: focused === 'email' ? '#FF6C00' : '#E8E8E8',
                  }}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={password}
                  onChangeText={passwordInputHandler}
                  onFocus={() => {
                    setKeyboardVisible(true);
                    setFocused('password');
                  }}
                  onBlur={() => {
                    setFocused('');
                  }}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  style={{
                    ...styles.input,
                    borderColor: focused === 'password' ? '#FF6C00' : '#E8E8E8',
                  }}
                />
                <Pressable
                  style={styles.passwordIndicator}
                  onPress={togglePasswordVisiblity}
                  accessibilityLabel={'Set password visible in the input field'}
                >
                  <Text
                    style={{
                      ...styles.passwordIndicatorText,
                      opacity: !password ? 0.5 : 1,
                    }}
                  >
                    {passwordVisible ? 'Hide' : 'Show'}
                  </Text>
                </Pressable>
              </View>

              <Pressable
                disabled={submitDisabled}
                style={{ ...styles.button, opacity: submitDisabled ? 0.7 : 1 }}
                onPress={onRegFormSubmit}
                accessibilityLabel={'Register new user'}
              >
                <Text style={styles.buttonText}>Register</Text>
              </Pressable>

              <View style={styles.displayNameRedirectBlock}>
                <Text style={styles.passwordIndicatorText}>
                  Already have an account?
                </Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.passwordIndicatorText}>Log in</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    height: 50,
    padding: 16,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    marginBottom: 16,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    position: 'relative',
  },
  passwordIndicator: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  passwordIndicatorText: {
    fontFamily: 'Roboto-Regular',
    color: '#1B4371',
    fontSize: 16,
    textAlign: 'right',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: '#212121',
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    padding: 16,
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: '#ffffff',
  },
  addAvatarContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: -92,
    marginBottom: 32,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  addAvatarBtn: {
    position: 'absolute',
    bottom: 14,
    right: -12,
  },
  addAvatarBtnIcon: {
    width: 25,
    height: 25,
  },
  avatar: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  displayNameRedirectBlock: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
});

export default RegistrationScreen;
