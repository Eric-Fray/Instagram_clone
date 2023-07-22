import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Tab = createMaterialTopTabNavigator();

const SearchTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="UserSearch" component={HomeScreen} />
      <Tab.Screen name="UserSearch" component={CommentsScreen} />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
