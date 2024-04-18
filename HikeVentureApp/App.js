import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

//Screens
import MapScreen from './screens/MapScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { ToolBar } from './components/style';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>

  { /*  
       <ToolBar>
       <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Ionicons name="home" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Ionicons name="map" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Ionicons name="person" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Ionicons name="navigate" size={30} />
      </TouchableOpacity>
      </ToolBar>
      */}
    </NavigationContainer>
  );
}


