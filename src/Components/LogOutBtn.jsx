import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from '@expo/vector-icons/Feather';
import { Pressable } from 'react-native';

import { resetAuthError } from '../redux/auth/authSlice';
import { logOut } from '../redux/auth/authOperations';

const LogOutBtn = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={async () => {
        const result = await dispatch(logOut());
        if (result.erorr) {
          dispatch(resetAuthError());
        }
        navigation.navigate('Login');
      }}
    >
      <Icon
        style={{ marginHorizontal: 16 }}
        color="#bdbdbd"
        name="log-out"
        size={24}
      />
    </Pressable>
  );
};

export default LogOutBtn;
