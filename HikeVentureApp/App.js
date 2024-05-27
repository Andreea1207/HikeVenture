import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import MapScreen from './screens/MapScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import TrailsScreen from './screens/TrailsScreen';
import {ToolBar, ToolBarIcon}from './components/style';
import{Ionicons} from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: true }}/>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Trails" component={TrailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




