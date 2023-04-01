import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
const CreatePostScreen = ({ navigation }) => {
  console.log(navigation);
  return (
    <View style={styles.container}>
      <Text>Create Post Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreatePostScreen;
