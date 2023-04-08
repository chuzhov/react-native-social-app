import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import GoBackBtn from '../Components/GoBackBtn';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const MapScreen = ({ navigation, route }) => {
  const coordinates = route.params.coordinates;
  const text = route.params.text;
  const description = route.params.location;

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission to access location was denied',
        });
      }
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  return coordinates.latitude && coordinates.longitude ? (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapStyle}
          region={{
            ...coordinates,
          }}
          showsUserLocation={true}
        >
          <Marker
            title={text ? text : 'Pic location'}
            coordinate={coordinates}
            description={description ? description : 'Pic was taken here'}
          />
        </MapView>
        <GoBackBtn navigation={navigation} />
      </View>
    </View>
  ) : (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            title="You are here"
            coordinate={location}
            description="Your current location"
          />
        )}
      </MapView>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

MapScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <Button title="Back" onPress={() => navigation.goBack()} />,
});

export default MapScreen;
