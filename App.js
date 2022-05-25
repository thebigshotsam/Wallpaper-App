import React from 'react';

import {StyleSheet, View, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import ImageDisplay from './components/ImageDisplay';
import FullScreen from './components/FullScreen';


const Stack = createStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs()
  return (
    <NavigationContainer>
      <Stack.Navigator
	initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
        }}
        mode={'card'}>

        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerShown:false
          }}
          />

        <Stack.Screen 
          name="FullCatogery" 
          component={FullScreen} 
          options={{
            headerShown:false,
          }}
          />

        <Stack.Screen 
          name="ImageDisplay" 
          component={ImageDisplay} 
          options={{
            headerShown:false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App