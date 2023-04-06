import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
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
} from 'react-native';

import { signIn } from '../redux/auth/authOperations';
import { resetAuthError } from '../redux/auth/authSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [focused, setFocused] = useState('');
  const dispatch = useDispatch();

  const emailInputHandler = userInput => {
    setEmail(userInput);
  };
  const passwordInputHandler = userInput => {
    setPassword(userInput);
  };

  const onLoginSubmit = async event => {
    event.preventDefault();

    const result = await dispatch(signIn({ email, password }));
    if (result.error) {
      dispatch(resetAuthError());
      //handle login error
    } else {
      setEmail('');
      setPassword('');
      navigation.navigate('Home');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  useEffect(() => {
    if (email && password) {
      setSubmitDisabled(false);
    }
    if (!email || !password) {
      setSubmitDisabled(true);
    }
  }, [email, password]);

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
              <Text style={styles.title}>Log in</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={email}
                  //   autoFocus={true}
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
                  onPress={togglePasswordVisibility}
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
                onPress={onLoginSubmit}
                accessibilityLabel={'Login'}
              >
                <Text style={styles.buttonText}>Log in</Text>
              </Pressable>

              <View style={styles.signupRedirectBlock}>
                <Text style={styles.passwordIndicatorText}>
                  Don't have an account?
                </Text>
                <Pressable onPress={() => navigation.navigate('Registration')}>
                  <Text style={styles.passwordIndicatorText}>Register</Text>
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
  signupRedirectBlock: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
});

export default LoginScreen;
