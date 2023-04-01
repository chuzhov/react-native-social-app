import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import PostsScreen from '../Screens/PostsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import CreatePostsScreen from '../Screens/CreatePostsScreen';

import setAppHeadersStyles from '../Styles/setAppHeadersStyles';
import setTabNavigetionOptions from '../Styles/setTabNavigetionOptions';
import GoBackBtn from '../Components/GoBackBtn';
import LogOutBtn from '../Components/LogOutBtn';

const Home = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...setTabNavigetionOptions(route),
      })}
    >
      {/* has log-out btn */}
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation, route }) => ({
          ...setAppHeadersStyles(),
          headerRight: () => <LogOutBtn navigation={navigation} />,
        })}
      />
      {/* has stap-back btn */}
      <Tab.Screen
        name="Create post"
        component={CreatePostsScreen}
        options={({ navigation, route }) => ({
          ...setAppHeadersStyles(),
          headerLeft: () => <GoBackBtn navigation={navigation} />,
        })}
      />
      {/* has stap-back btn */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          ...setAppHeadersStyles(),
          headerLeft: () => <GoBackBtn navigation={navigation} />,
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
