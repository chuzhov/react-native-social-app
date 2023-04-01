import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
const MapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
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

export default MapScreen;
