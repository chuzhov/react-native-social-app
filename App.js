import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import RegisterScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';

// Keep the splash screen visible while we fetch resources
// Why expo place it here???
// SplashScreen.preventAutoHideAsync();

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

  if (!appIsReady) {
    return null;
  } else return <LoginScreen />;
}
