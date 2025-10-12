import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

type RootStackParamList = {
    Home: undefined;
    Details: { itemId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                {/* Screens go here */}
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// Example screen components
const HomeScreen: React.FC = () => <></>;
const DetailsScreen: React.FC = () => <></>;

export default MainNavigation;
