import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegistrationScreen';
import Home from './Screens/Home';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const appFonts = {
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(appFonts);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const isLoggedIn = false;

  const Stack = createStackNavigator();

  if (!appIsReady) {
    return null;
  } else
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
