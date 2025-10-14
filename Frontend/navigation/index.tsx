// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { RootStackParamList, Routes } from './Routes';
// import Homepage from '../screens/Homepage/Homepage';
// import DetailsScreen from '../screens/Details/Details';

// const Stack = createStackNavigator<RootStackParamList>();

// export default function Navigation() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen 
//           name={Routes.Home}
//           component={Homepage}
//           options={{ title: 'Welcome' }}
//         />
//         <Stack.Screen 
//           name={Routes.Details}
//           component={DetailsScreen}
//           options={{ title: 'Details' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Homepage from '../screens/Homepage/Homepage';
import Details from '../screens/Details/Details';
import Problems from '../screens/Problems/Problems';
import Profile from '../screens/Profile/Profile';
import { RootStackParamList, Routes } from './Routes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackTyped = createStackNavigator<RootStackParamList>();

function HomeStack() {
  return (
    <StackTyped.Navigator>
      <StackTyped.Screen name={Routes.Home} component={Homepage} options={{ headerShown: false }} />
      <StackTyped.Screen name={Routes.Details} component={Details} options={{ title: 'Details' }} />
    </StackTyped.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: any = 'ellipse';
            if (route.name === Routes.HomeTab) {
              iconName = 'home-outline';
            } else if (route.name === 'Problems') {
              iconName = 'list-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
          <Tab.Screen name={Routes.HomeTab} component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Problems" component={Problems} />
          <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}