import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from '../screens/Login/Login';
import Homepage from '../screens/Homepage/Homepage';
import Details from '../screens/Details/Details';
import Problems from '../screens/Problems/Problems';
import Profile from '../screens/Profile/Profile';
import { Routes, RootStackParamList, TabParamList } from './Routes';
import Registration from '../screens/Registration/Registration';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// ----- App Tabs -----
const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName: any = 'ellipse';
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Problems') iconName = 'list-outline';
        else if (route.name === 'Profile') iconName = 'person-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen 
      name="Home"
      component={Homepage}
    />
    <Tab.Screen 
      name="Problems"
      component={Problems}
    />
    <Tab.Screen 
      name="Profile"
      component={Profile}
    />
  </Tab.Navigator>
);

// ----- Root Stack -----
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: false 
        }}
      >
        <Stack.Screen 
          name="Login"
          component={Login}
        />
        <Stack.Screen 
          name="Registration"
          component={Registration}
        />
        <Stack.Screen 
          name="AppTabs"
          component={AppTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
