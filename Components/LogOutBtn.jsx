import React from 'react';
import Icon from '@expo/vector-icons/Feather';
import { Pressable } from 'react-native';

const LogOutBtn = ({ navigation }) => {
  console.log(navigation);
  return (
    <Pressable onPress={() => navigation.navigate('Login')}>
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
