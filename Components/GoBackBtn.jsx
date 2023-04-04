import React from 'react';
import Icon from '@expo/vector-icons/Feather';
import { Pressable } from 'react-native';

//nav={navigation} route={route}
const GoBackBtn = ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Icon
        style={{ marginLeft: 16 }}
        color="rgba(21, 21, 21, 0.8)"
        name="arrow-left"
        size={24}
      />
    </Pressable>
  );
};

export default GoBackBtn;
