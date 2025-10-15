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
import { Routes } from './Routes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ----- App Tabs -----
const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: any = 'ellipse';
        if (route.name === Routes.Home) iconName = 'home-outline';
        else if (route.name === Routes.Problems) iconName = 'list-outline';
        else if (route.name === Routes.Profile) iconName = 'person-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name={Routes.Home} component={Homepage} options={{ headerShown: false }} />
    <Tab.Screen name={Routes.Problems} component={Problems} />
    <Tab.Screen name={Routes.Profile} component={Profile} />
  </Tab.Navigator>
);

// ----- Root Stack -----
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name={Routes.Login} 
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name={Routes.AppTabs} 
          component={AppTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
