import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


