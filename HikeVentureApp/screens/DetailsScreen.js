import React, {useEffect, useState, useRef} from 'react';
import { Dimensions, Image, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToolBarComponent from '../components/BottomTabNavigator';
import { Camera, PointAnnotation, MapView, ShapeSource, LineLayer  } from '@rnmapbox/maps';
import Mapbox, { Logger } from '@rnmapbox/maps';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DetailsScreen = ({ route }) => {
    const { trail } = route.params;
    const [routeCoordinates, setRouteCoordinates] = useState(null);
    const mapRef = useRef(null);
    const cameraRef = useRef(null);
    const [is3DMode, setIs3DMode] = useState(false); // State for 3D mode

    useEffect(() => {
        fetchRoute(trail.startLocation, trail.endLocation);
        zoomOutToFitRoute(trail.startLocation, trail.endLocation);
      }, [trail]);
    
    const fetchRoute = async (start, end) => {
        const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&access_token=pk.eyJ1IjoiYWxlcmF0IiwiYSI6ImNsdjE4amdrdzA0ZXgybHFnbTd4cmQwbHEifQ.SKH-f-cKklc-I_WODvMe7g`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setRouteCoordinates(data.routes[0].geometry); // Set the route geometry
        } catch (error) {
          console.error('Error fetching route:', error);
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
            const zoomLevel = Math.min(latZoom, lonZoom, 10); // Ne asigurăm că zoom-ul nu este prea mare
        
    
        if (cameraRef.current) {
          cameraRef.current.setCamera({
            centerCoordinate: [midLon, midLat],
            zoomLevel: zoomLevel,
            animationDuration: 2000,
          });
        }
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
  
    return (
      <ScrollView contentContainerStyle={styles.detailsContainer}>
        <Image source={trail.image} style={styles.detailsImage} />
        <Text style={styles.detailsTitle}>{trail.name}</Text>
        <Text style={styles.detailsDescription}>{trail.description}</Text>
        <Mapbox.MapView
        ref={mapRef}
        style={styles.map}
        zoomEnabled={true}
        rotateEnabled={true}
        styleURL='mapbox://styles/alerat/clw5i1tgf01gf01pc3cupbznz'
      >
        <Camera
          ref={cameraRef}
          zoomLevel={14}
          centerCoordinate={[trail.startLocation.longitude, trail.startLocation.latitude]}
          pitch={10}
          animationMode={'flyTo'}
          animationDuration={5000}
        />
        {trail.startLocation && (
          <PointAnnotation
            id="startLocation"
            coordinate={[trail.startLocation.longitude, trail.startLocation.latitude]}
          >
            <View style={styles.markerContainer}>
              <Text>📍</Text>
            </View>
          </PointAnnotation>
        )}
        {trail.endLocation && (
          <PointAnnotation
            id="endLocation"
            coordinate={[trail.endLocation.longitude, trail.endLocation.latitude]}
          >
            <View style={styles.markerContainer}>
              <Text>📍</Text>
            </View>
          </PointAnnotation>
        )}
        {routeCoordinates && (
          <ShapeSource id="routeSource" shape={routeCoordinates}>
            <LineLayer
              id="routeLine"
              style={{ lineColor: 'blue', lineWidth: 3 }}
            />
          </ShapeSource>
        )}
      </Mapbox.MapView>

      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      detailsImage: {
        width: '100%',
        height: 300,
        marginBottom: 20,
      },
      detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      detailsDescription: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
      },
      map: {
        width: Dimensions.get('window').width - 40,
        height: 300,
        marginTop: 20,
        marginBottom: 20,
      },
      markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    export default DetailsScreen;