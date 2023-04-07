import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import store from './redux/store';

import MainNavigator from './MainNavigator';

const appFonts = {
  'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
  'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
  'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
};

export default () => {
  const [appIsReady, setAppIsReady] = useState(false);
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
  } else
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
};
