/*
import React from 'react';
import { View } from 'react-native';
import { ToolBar, ToolBarItem, ToolBarIcon, ToolBarText } from './style'; // Importa stilurile
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlanScreen from '../screens/PlanScreen';
import TrailsScreen from '../screens/TrailsScreen';
import { Ionicons } from '@expo/vector-icons';

const BottomTabNavigator = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ToolBar>
        <ToolBarItem onPress={() => navigation.navigate('Trails')}>
          <Ionicons name="search" size={24} color="black" />
          <ToolBarText>Trails</ToolBarText>
        </ToolBarItem>
        <ToolBarItem onPress={() => navigation.navigate('Plan')}>
          <Ionicons name="compass" size={24} color="black" />
          <ToolBarText>Plan</ToolBarText>
        </ToolBarItem>
        <ToolBarItem onPress={() => navigation.navigate('Map')}>
          <Ionicons name="map" size={24} color="black" />
          <ToolBarText>Map</ToolBarText>
        </ToolBarItem>
        <ToolBarItem onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={24} color="black" />
          <ToolBarText>Profile</ToolBarText>
        </ToolBarItem>
      </ToolBar>
    </View>
  );
};

export default BottomTabNavigator;*/

/*
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import TrailsScreen from '../screens/TrailsScreen';
//import PlanScreen from '../screens/PlanScreen';
import MapScreen from '../screens/MapScreen';
//import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Trails') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Plan') {
            iconName = focused ? 'compass' : 'compass';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60 },
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
*/

/*import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import { Ionicons } from '@expo/vector-icons';
import { ToolBar, ToolBarItem, ToolBarText } from './style'; // Importă stilurile

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ToolBar>
        <ToolBarItem onPress={() => navigation.navigate('Trails')}>
          <Ionicons name="search" size={24} color="black" />
          <ToolBarText>Trails</ToolBarText>
        </ToolBarItem>
        <ToolBarItem onPress={() => navigation.navigate('Plan')}>
          <Ionicons name="compass" size={24} color="black" />
          <ToolBarText>Plan</ToolBarText>
        </ToolBarItem>
        <ToolBarItem onPress={() => navigation.navigate('Map')}>
          <Ionicons name="map" size={24} color="black" />
          <ToolBarText>Map</ToolBarText>
        </ToolBarItem>
        <ToolBarItem onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={24} color="black" />
          <ToolBarText>Profile</ToolBarText>
        </ToolBarItem>
      </ToolBar>
    </View>
  );
};

export default BottomTabNavigator;*/

import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screens
import MapScreen from '../screens/MapScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import {ToolBar, ToolBarText}from './style';
import{Ionicons} from '@expo/vector-icons';

  const ToolBarComponent = ({navigation}) => {
    const route = useRoute();
    const isMapScreen = route.name === 'Map';
    const isTrailsScreen = route.name === 'Trails';
    const isPlanScreen = route.name === 'Plan';
    const isProfileScreen = route.name === 'Profile';

    const handleTrailsPress = () => {
    if (!isTrailsScreen &&navigation) {
        navigation.navigate('Trails');
    }
 };

 const handlePlanPress = () => {
    if (!isPlanScreen &&navigation) {
        navigation.navigate('Map');
    }
  };

  const handleMapPress = () => {
    if (!isMapScreen &&navigation) {
        navigation.navigate('Map');
    }
  };


  const handleProfilePress = () => {
    if (!isProfileScreen &&navigation) {
        navigation.navigate('Map');
    }
  };

  return (
  //  <View style={styles.toolbar}>
    <ToolBar>
      <TouchableOpacity onPress={handleTrailsPress}>
        <Ionicons name="search" size={30} color="black" />
        <ToolBarText>Trails</ToolBarText>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePlanPress}>
        <Ionicons name="compass" size={30} color="black" />
        <ToolBarText>Plan</ToolBarText>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleMapPress}>
        <Ionicons name="map" size={30} />
        <ToolBarText>Map</ToolBarText>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProfilePress}>
        <Ionicons name="person" size={30} color="black" />
        <ToolBarText>Profile</ToolBarText>
      </TouchableOpacity>
    </ToolBar>
   // </View>
  );
};

export default ToolBarComponent;