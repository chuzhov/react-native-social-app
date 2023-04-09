import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const SpinnerSemiTransparent = () => (
  <View style={styles.spinnerContainer}>
    <ActivityIndicator size="large" color="#FF6C00" />
  </View>
);

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default SpinnerSemiTransparent;
