import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegistrationScreen';
import Home from './Screens/Home';
import MapScreen from './Screens/MapScreen';
import CommentsScreen from './Screens/CommentsScreen';
import GoBackBtn from './Components/GoBackBtn';

import { NavigationContainer } from '@react-navigation/native';
import { isLoggedInSelector } from './redux/auth/authSelectors';
import { useSelector } from 'react-redux';

const MainNavigator = () => {
  const Stack = createStackNavigator();
  const isAuthenticated = useSelector(isLoggedInSelector);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={({ navigation }) => ({
          headerLeft: () => <GoBackBtn navigation={navigation} />,
          headerShown: true,
        })}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="Comments" component={CommentsScreen} />
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
