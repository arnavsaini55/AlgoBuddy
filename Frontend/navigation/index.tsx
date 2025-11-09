import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from '../screens/Login/Login';
import Homepage from '../screens/Homepage/Homepage';
import Problems from '../screens/Problems/Problems';
import Profile from '../screens/Profile/Profile';
import Registration from '../screens/Registration/Registration';
import QuestionDetail from '../screens/QuestionDetail/QuestionDetail';
import { Routes, RootStackParamList, TabParamList } from './Routes';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();


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


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.Login} component={Login} />
        <Stack.Screen name={Routes.Registration} component={Registration} />
        <Stack.Screen name={Routes.AppTabs} component={AppTabs} />
        <Stack.Screen
          name={Routes.QuestionDetail}
          component={QuestionDetail}
          options={{ headerShown: true, title: 'Question Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
