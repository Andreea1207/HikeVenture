import React, {useEffect, useState, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, ScrollView, StyleSheet, Text, FlatList, TextInput, TouchableOpacity, View, Modal, Button  } from 'react-native';
import Mapbox, { Logger } from '@rnmapbox/maps';
import { Camera, PointAnnotation, MapView, ShapeSource, LineLayer  } from '@rnmapbox/maps';
//import * as Location from 'expo-location';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


Logger.setLogCallback( log => {
  const {message} = log;
  if(message.match('Request failed due to a permanent error: Canceled') || 
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

Mapbox.setAccessToken('pk.eyJ1IjoiYWxlcmF0IiwiYSI6ImNsdjE4amdrdzA0ZXgybHFnbTd4cmQwbHEifQ.SKH-f-cKklc-I_WODvMe7g');
Mapbox.setTelemetryEnabled(false);

//const Stack = createNativeStackNavigator();

export default function MapScreen(navigation) {

  const [queryStart, setQueryStart] = useState('');
  const [suggestionsStart, setSuggestionsStart] = useState([]);
  const [selectedStartLocation, setSelectedStartLocation] = useState(null);

  const [queryEnd, setQueryEnd] = useState('');
  const [suggestionsEnd, setSuggestionsEnd] = useState([]);
  const [selectedEndLocation, setSelectedEndLocation] = useState(null);

  const [route, setRoute] = useState(null); // State for route
  const mapRef = useRef(null);
  const cameraRef = useRef(null); // Create a reference for Camera
  const [is3DMode, setIs3DMode] = useState(false); // State for 3D mode

  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const [showConfirmButtonEnd, setShowConfirmButtonEnd] = useState(false);

  const [showRouteInfoModal, setShowRouteInfoModal] = useState(false); // State for showing modal
  const [routeInfo, setRouteInfo] = useState(null); // State for route information

  const fetchSuggestions = async (input, setSuggestions) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1&limit=3`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleInputChangeStart = (text) => {
    setQueryStart(text);
    if (text.length > 2) {
      fetchSuggestions(text, setSuggestionsStart);
    } else {
      setSuggestionsStart([]);
    }
  };

  const handleInputChangeEnd = (text) => {
    setQueryEnd(text);
    if (text.length > 2) {
      fetchSuggestions(text, setSuggestionsEnd);
    } else {
      setSuggestionsEnd([]);
    }
  };

  const handleSuggestionPressStart = (item) => {
    const { lat, lon } = item;
    const location = { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    setSelectedStartLocation(location);
    setQueryStart(item.display_name);
    setSuggestionsStart([]);
    zoomOutToFitLocation(location);
  };

  const handleSuggestionPressEnd = (item) => {
    const { lat, lon } = item;
    const location = { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    setSelectedEndLocation(location);
    setQueryEnd(item.display_name);
    setSuggestionsEnd([]);
    zoomOutToFitLocation(location);
  };


  const fetchRoute = async (start, end) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&access_token=pk.eyJ1IjoiYWxlcmF0IiwiYSI6ImNsdjE4amdrdzA0ZXgybHFnbTd4cmQwbHEifQ.SKH-f-cKklc-I_WODvMe7g`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const routeLength = data.routes[0].distance; // Get the route length
      const routeDuration = data.routes[0].duration;

      const routeData = data.routes[0];
      setRoute(data.routes[0].geometry); // Set the route geometry
      setRouteInfo({ distance: routeLength, duration: routeDuration, elevationGain: 630 , elevationLoss: 115 }); // Set route information
      setShowRouteInfoModal(true); // Show the modal with route information
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const handleGenerateRoute = () => {
    if (selectedStartLocation && selectedEndLocation) {
      fetchRoute(selectedStartLocation, selectedEndLocation);
      zoomOutToFitRoute(selectedStartLocation, selectedEndLocation);
    }
  };
    const unhandleGenerateRoute = (start, end) => {
    if (start == null || end == null) {
      setRoute(null);
    }
  };
  const zoomOutToFitRoute = (start, end) => {
    const minLat = Math.min(start.latitude, end.latitude);
    const maxLat = Math.max(start.latitude, end.latitude);
    const minLon = Math.min(start.longitude, end.longitude);
    const maxLon = Math.max(start.longitude, end.longitude);

    const midLat = (minLat + maxLat) / 2;
    const midLon = (minLon + maxLon) / 2;

    const deltaLat = maxLat - minLat;
    const deltaLon = maxLon - minLon;

        // Calculăm un nivel de zoom aproximativ în funcție de latitudinea și longitudinea delta
        const padding = 0.5; // Un mic padding pentru a nu tăia marginile
        const latZoom = Math.log2(360 / deltaLat) - padding;
        const lonZoom = Math.log2(360 / deltaLon) - padding;
        const zoomLevel = Math.min(latZoom, lonZoom, 12); // Ne asigurăm că zoom-ul nu este prea mare
    

    if (cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [midLon, midLat],
        zoomLevel: zoomLevel,
        animationDuration: 2000,
      });
    }
  };

  const zoomOutToFitLocation = (location) => {
    if (cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [location.longitude, location.latitude],
        zoomLevel: 14,
        animationDuration: 2000,
      });
    }
  };
  const clearStartInput = () => {
    setQueryStart('');
    setSuggestionsStart([]);
    setSelectedStartLocation(null);
    unhandleGenerateRoute(selectedStartLocation, selectedEndLocation);
  };
  const clearEndInput = () => {
    setQueryEnd('');
    setSuggestionsEnd([]);
    setSelectedEndLocation(null);
    unhandleGenerateRoute(selectedStartLocation, selectedEndLocation);
  };
  const toggleMapMode = () => {
    setIs3DMode(!is3DMode);
    const newPitch = is3DMode ? 0 : 60; // Toggle pitch between 0 and 60 degrees
    if (cameraRef.current) {
      cameraRef.current.setCamera({
        pitch: newPitch,
        animationDuration: 2000,
      });
    }
  };

    const resetMapRotation = () => {
    if (cameraRef.current) {
      cameraRef.current.setCamera({
        heading: 0,
        animationDuration: 2000,
      });
    }
  };

  const handleMapPress = (event) => {
    if (isSelectingStart) {
      const { coordinates } = event.geometry;
      setSelectedStartLocation({ latitude: coordinates[1], longitude: coordinates[0] });
      setShowConfirmButton(true);
    }
    if (isSelectingEnd) {
      const { coordinates } = event.geometry;
      setSelectedEndLocation({ latitude: coordinates[1], longitude: coordinates[0] });
      setShowConfirmButtonEnd(true);
    }
  };

  const confirmStartLocation = () => {
    setIsSelectingStart(false);
    setShowConfirmButton(false);
    if (selectedStartLocation) {
      setQueryStart(`${selectedStartLocation.latitude}, ${selectedStartLocation.longitude}`);
    }
    // Additional logic to handle the confirmed location can be added here
  };

  const startSelectingLocation = () => {
    setIsSelectingStart(true);
    setShowConfirmButton(false);
  };


  const confirmEndLocation = () => {
    setIsSelectingEnd(false);
    setShowConfirmButtonEnd(false);
    if (selectedEndLocation) {
      setQueryEnd(`${selectedEndLocation.latitude}, ${selectedEndLocation.longitude}`);
    }
    // Additional logic to handle the confirmed location can be added here
  };

  const endSelectingLocation = () => {
    setIsSelectingEnd(true);
    setShowConfirmButtonEnd(false);
  };

  // const getLocation = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     console.error('Permission to access location was denied');
  //     return;
  //   }
  
  //   let location = await Location.getCurrentPositionAsync({});
  //   console.log(location);
  // };
  
  return (
    <View style={styles.mapContainer}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="What's your location?"
            value={queryStart}
            onChangeText={handleInputChangeStart}
          />
          <TouchableOpacity onPress={startSelectingLocation} style={styles.locationButton}>
            <FontAwesome5 name="map-marker-alt" size={20} color="black" />
          </TouchableOpacity>
            <TouchableOpacity onPress={clearStartInput} style={styles.clearButton}>
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        {suggestionsStart.length > 0 && (
          <View style={styles.suggestionsContainer}>
              {suggestionsStart.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleSuggestionPressStart(item)}>
                  <Text style={styles.suggestion}>{item.display_name}</Text>
                </TouchableOpacity>
              ))}
            </View>

        )}
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Where to?"
          value={queryEnd}
          onChangeText={handleInputChangeEnd}
        />

          <TouchableOpacity onPress={endSelectingLocation} style={styles.locationButton}>
            <FontAwesome5 name="map-marker-alt" size={20} color="black" />
          </TouchableOpacity>

            <TouchableOpacity onPress={clearEndInput} style={styles.clearButton}>
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>

        </View>
        {suggestionsEnd.length > 0 && (
          <View style={styles.suggestionsContainer}>
              {suggestionsEnd.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleSuggestionPressEnd(item)}>
                  <Text style={styles.suggestion}>{item.display_name}</Text>
                </TouchableOpacity>
              ))}
            </View>
        )}
        <Button title="Generate Route" onPress={handleGenerateRoute} disabled={!selectedStartLocation || !selectedEndLocation} />
      </View>
      
      <Mapbox.MapView ref={mapRef} onPress={handleMapPress}style={styles.map} zoomEnabled={true} rotateEnabled={true} styleURL='mapbox://styles/alerat/clw5i1tgf01gf01pc3cupbznz'>

      <Camera
          ref={cameraRef}
          zoomLevel={14}
          centerCoordinate={
            selectedStartLocation
              ? [selectedStartLocation.longitude, selectedStartLocation.latitude]
              : selectedEndLocation
              ? [selectedEndLocation.longitude, selectedEndLocation.latitude]
              : [24.736149, 45.599693]
          }
          pitch={10}
          animationMode={'flyTo'}
          animationDuration={5000}
        />
        {selectedStartLocation && (
          <PointAnnotation
            id="startLocation"
            coordinate={[selectedStartLocation.longitude, selectedStartLocation.latitude]}
          >
            <View style={styles.markerContainer}>
              <Text>📍</Text>
            </View>
          </PointAnnotation>
        )}
        {selectedEndLocation && (
          <PointAnnotation
            id="endLocation"
            coordinate={[selectedEndLocation.longitude, selectedEndLocation.latitude]}
          >
            <View style={styles.markerContainer}>
              <Text>📍</Text>
            </View>
          </PointAnnotation>
        )}
        {route && (
          <ShapeSource id="routeSource" shape={route}>
            <LineLayer
              id="routeLine"
              style={{ lineColor: 'blue', lineWidth: 3 }}
            />
          </ShapeSource>
        )}

      </Mapbox.MapView>
      {showConfirmButton && (
        <View style={styles.confirmButtonContainer}>
          <Button title="OK" onPress={confirmStartLocation} />
        </View>
      )}
      {showConfirmButtonEnd && (
        <View style={styles.confirmButtonContainer}>
          <Button title="OK" onPress={confirmEndLocation} />
        </View>
      )}
      <TouchableOpacity style={styles.mapToggleButton} onPress={toggleMapMode}>
        <Text style={styles.toggleButtonText}>{is3DMode ? '2D' : '3D'}</Text>
      </TouchableOpacity>
          
      <TouchableOpacity style={styles.resetButton} onPress={resetMapRotation}>
        <Entypo name="compass" size={38} color="black" />
      </TouchableOpacity>
      

              {/* Modal for route information */}
              <Modal
                visible={showRouteInfoModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowRouteInfoModal(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Route Information</Text>
                    {routeInfo && (
                      <Text style={styles.modalText}>Distance: {(routeInfo.distance / 1000).toFixed(2)} km Duration:{(routeInfo.duration/3600).toPrecision(1)} hours Elevation Gain: {routeInfo.elevationGain} m Elevation Loss: {routeInfo.elevationLoss} m</Text>
                    )}
                    <Button title="Close" onPress={() => setShowRouteInfoModal(false)} />
                  </View>
                </View>
              </Modal>

      </View>
  );
}

const styles = StyleSheet.create({
  suggestionsContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    marginTop: -10,
    elevation: 4,
  },
  suggestion: {
    paddingVertical: 5,
  },
  inputContainer: {
    //flexDirection: 'row',
    //alignItems: 'center',
    //marginBottom: 10,
  },
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: '60%',
    transform: [{ translateX: -50 }],
  },
  locationButton: {
    position: 'absolute',
    right: 20,
    padding: 5,
  },
  toggleButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 70,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 10,
    borderRadius: 5,
  },
   mapToggleButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 20,
    padding: 10,
  },
  resetButton: {
    position: 'absolute',
    bottom: 55,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 20,
  },
  input: {
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  clearButton: {
    position: 'absolute',
    right: 1,
    padding: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchContainer: {
    position: 'absolute',
    top: 30,
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  searchInput: {
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  searchButton: {
    backgroundColor: '#1E90FF',
    padding: 7,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  mapContainer: {
    flex: 1
  },
  map: {
    flex: 1,
    marginTop: 145,
  },
  markerContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    elevation: 5,
    width: Dimensions.get('window').width - 40,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  closeButtoText: {
    color: 'black',
    fontSize: 18,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  }
});
