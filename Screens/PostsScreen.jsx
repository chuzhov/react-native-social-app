import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
const PostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Posts Screen</Text>
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

export default PostsScreen;
