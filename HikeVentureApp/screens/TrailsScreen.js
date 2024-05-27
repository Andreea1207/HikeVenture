import React from 'react';
import { Image, View, Button, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { styles} from '../components/style';


const TrailsScreen = ({ navigation }) => {
  // Function to handle navigation to details screen
  const handleTrailPress = () => {
    // Navigate to details screen, you can replace 'Details' with your actual details screen name
    navigation.navigate('Welcome',  { screen: 'Map' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trails</Text>
      <TouchableOpacity style={styles.trailItem} onPress={handleTrailPress}>
        <Text style={styles.trailName}>Trail 1</Text>
        <Text style={styles.trailDescription}>Description of Trail 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.trailItem} onPress={handleTrailPress}>
        <Text style={styles.trailName}>Trail 2</Text>
        <Text style={styles.trailDescription}>Description of Trail 2</Text>
      </TouchableOpacity>
      {/* Add more TouchableOpacity elements for each trail */}
      <View style={styles.toolbarContainer}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  trailItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  trailName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trailDescription: {
    fontSize: 16,
    color: '#555',
  },
  toolbarContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default TrailsScreen;
