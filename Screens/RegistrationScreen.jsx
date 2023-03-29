import React, { useEffect, useState } from 'react';
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

const RegistrationScreen = navigation => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [focused, setFocused] = useState('');

  const loginInputHandler = userInput => {
    setLogin(userInput);
  };
  const emailInputHandler = userInput => {
    setEmail(userInput);
  };
  const passwordInputHandler = userInput => {
    setPassword(userInput);
  };

  const onRegFormSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append('login', login);
    data.append('email', email);
    data.append('password', password);
    data.append('file', avatar);

    console.log(data);

    setLogin('');
    setEmail('');
    setPassword('');
  };

  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
  const hideKeyboard = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  useEffect(() => {
    if (email && password && login) {
      setSubmitDisabled(false);
    }
    if (!email || !password || !login) {
      setSubmitDisabled(true);
    }
  }, [email, password, login]);

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
                  value={login}
                  onChangeText={loginInputHandler}
                  onFocus={() => {
                    setKeyboardVisible(true);
                    setFocused('login');
                  }}
                  onBlur={() => {
                    setFocused('');
                  }}
                  placeholder="Login"
                  style={{
                    ...styles.input,
                    borderColor: focused === 'login' ? '#FF6C00' : '#E8E8E8',
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
                    {isPasswordShown ? 'Hide' : 'Show'}
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

              <View style={styles.loginRedirectBlock}>
                <Text style={styles.passwordIndicatorText}>
                  Already have an account?
                </Text>
                <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={styles.passwordIndicatorText}>Log in</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
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
    fontWeight: 400,
    textAlign: 'right',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: '#212121',
    fontWeight: 500,
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
  loginRedirectBlock: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
});

export default RegistrationScreen;
