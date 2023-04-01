import React from 'react';
import Icon from '@expo/vector-icons/Feather';

function setTabNavigetionOptions(route) {
  return {
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      switch (route.name) {
        case 'Posts':
          iconName = 'grid';
          break;
        case 'Create post':
          iconName = 'plus';
          break;
        case 'Profile':
          iconName = 'user';
          break;
      }
      return <Icon name={iconName} size={24} color={color} />;
    },
    tabBarActiveTintColor: '#FFFFFF',
    tabBarInactiveTintColor: 'rgba(21, 21, 21, 0.8)',
    tabBarActiveBackgroundColor: '#FF6C00',
    tabBarInactiveBackgroundColor: 'transparent',
    tabBarItemStyle: {
      marginRight: focused => {
        focused !== 'Profile' ? 31 : 0;
      },
      maxWidth: 70,
      width: 70,
      height: 40,
      borderRadius: 20,
    },
    tabBarStyle: {
      paddingTop: 9,
      paddingBottom: 42,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabBarShowLabel: false,
  };
}

export default setTabNavigetionOptions;
