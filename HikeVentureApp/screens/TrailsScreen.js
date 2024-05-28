import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Sample trail data
const trails = [
  {
    id: 1,
    name: 'Lacul Bucura - Varful Peleaga',
    description: '2:50h, 3.2km, 600m ascent, 30m descent',
    image: require('../assets/Lacul-Bucura.jpg'), 
    startLocation: { latitude: 45.358096, longitude: 22.875440},
    endLocation: { latitude: 45.366158, longitude: 22.892680 },
  },
  {
    id: 2,
    name: 'Lacul Bâlea - Vârful Moldoveanu',
    description: '6:30h, 12.9km, 1150m ascent, 710m descent',
    image: require('../assets/varful-moldoveanu.jpg'), 
    startLocation: { latitude: 45.5983, longitude: 24.6072 },
    endLocation: { latitude: 45.5984, longitude: 24.7375 },

  },
  {
    id: 3,
    name: 'Apuseni - Round trip',
    description: '8:45h, 20.0km, 1050m ascent, 1050m descent',
    image: require('../assets/apuseni.jpg'), 
    startLocation: { latitude: 46.5547, longitude: 22.8176 },
    endLocation: { latitude: 46.5537, longitude: 22.8186 },
  },
  {
    id: 4,
    name: 'Ghețari - Padiș',
    description: '5:10h, 19.0km, 750m ascent, 530m descent',
    image: require('../assets/padis.jpg'), 
    startLocation: { latitude: 46.4642, longitude: 22.8128 },
    endLocation: { latitude: 46.4643, longitude: 22.8138 },

  },
];

const TrailsScreen = ({ navigation }) => {
  // Function to handle navigation to details screen
  const handleTrailPress = (trail) => {
    // Navigate to details screen, you can replace 'Details' with your actual details screen name
    navigation.navigate('DetailsScreen', { trail });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trails</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {trails.map((trail) => (
          <TouchableOpacity key={trail.id} style={styles.trailItem} onPress={() => handleTrailPress(trail)}>
            <Image source={trail.image} style={styles.trailImage} />
            <View style={styles.trailTextContainer}>
              <Text style={styles.trailName}>{trail.name}</Text>
              <Text style={styles.trailDescription}>{trail.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.toolbarContainer}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
    scrollContainer: {
    paddingBottom: 40, // Padding adăugat în partea de jos pentru a face loc ultimului element
  },
  trailItem: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  trailImage: {
    width: '100%',
    height: 150,
  },
  trailTextContainer: {
    padding: 10,
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