import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
//import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import UserSearchScreen from '../screens/UserSearchScreen';
import {SearchTabNavigatorParamList} from '../types/navigation';

const Tab = createMaterialTopTabNavigator<SearchTabNavigatorParamList>();

const SearchTabNavigator = () => {
  return (
    //const insets = useSafeAreaInsets();
    /* May be necessary for android if SafeAreaView at root isn't working properly
     */

    //<Tab.Navigator screenOptions={{tabBarStyle:
    /*  {paddingTop: insets.top}}, 
    /*  tabBarIndicatorStyle: {backgroundColor: colors.primary}}>
    /*** May be necessary for android if SafeAreaView at root isn't working properly
     */
    <Tab.Navigator>
      <Tab.Screen name="Users" component={UserSearchScreen} />
      <Tab.Screen name="Posts" component={CommentsScreen} />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
