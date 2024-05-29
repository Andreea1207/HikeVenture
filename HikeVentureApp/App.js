import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator,  createNativeTabNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import MapScreen from './screens/MapScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import TrailsScreen from './screens/TrailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import DetailsScreen from './screens/DetailsScreen';
import {ToolBar, ToolBarItem, ToolBarIcon, ToolBarText }from './components/style';
import{Ionicons} from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function CustomTabBarButton({ onPress, iconName, label, color, size }) {
  return (
    <ToolBarItem onPress={onPress}>
      <Ionicons name={iconName} size={24} color={color} />
      <ToolBarText>{label}</ToolBarText>
    </ToolBarItem>
  );
}

function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName='Map'
      screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
      height: 52,
      backgroundColor: 'rgba(69, 190, 12, 1)',
      padding: 10,
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
  },
   }}

    >
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} iconName="home" label="Map" />
          )
        }}
      />
      <Tab.Screen 
        name="Trails" 
        component={TrailsScreen} 
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} iconName="search" label="Trails" />
          )
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} iconName="person" label="Profile" />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

function StackNavigator(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Welcome"
      >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
      </NavigationContainer>
  );
}
export default function App() {

return <StackNavigator/>
}




