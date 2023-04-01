import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
const CommentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Comment Screen</Text>
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

export default CommentScreen;
