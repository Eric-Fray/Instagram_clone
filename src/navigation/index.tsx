import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import {RootNavigatorParamList} from './types';

const Stack = createNativeStackNavigator<RootNavigatorParamList>(); // { Navigator, Screen }

const linking: LinkingOptions<RootNavigatorParamList> = {
  prefixes: ['notjustphotos://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Comments: 'comments',
      Home: {
        screens: {
          HomeStack: {
            initialRouteName: 'Feed',
            screens: {
              UserProfile: 'user/:userId',
            },
          },
        },
      },
      //notjustphotos://user/<user_id>
    },
  },
};

const Navigation = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
