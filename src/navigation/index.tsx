import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Text, View, Image } from 'react-native';
import logo from '../assets/images/logo.png';

const Stack = createNativeStackNavigator(); // { Navigator, Screen }

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Feed"
        screenOptions={{headerShown: true}}>
        <Stack.Screen name="Feed" component={HomeScreen} options={{headerTitle: HeaderTitle}}/>
        <Stack.Screen
          name="UserProfile"
          component={ProfileScreen}
          options={{title: 'Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HeaderTitle = () => {
    return (
        <Image source={logo} resizeMode="contain" style={{ width: 150, height:40}} />
    );
};

export default Navigation;
