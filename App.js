import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'

import Home from './src/screens/Home'
import Profile from './src/screens/Profile'
import ResetPassword from './src/screens/ResetPassword';
import SignUp from './src/screens//SignUp';
import SignIn from './src/screens/SignIn';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown:false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'cog' : 'cog-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#5080BF',
      tabBarInactiveTintColor: 'black',
    })}
  >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}


const App = () => {

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
        <Stack.Screen name="Home" component={MainTabs} options={{
          headerBackVisible:false
        }} />
        <Stack.Screen name="Profile" component={MainTabs} options={{
          headerBackVisible:false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App