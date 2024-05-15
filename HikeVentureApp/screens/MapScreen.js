import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('<pk.eyJ1IjoiYWxlcmF0IiwiYSI6ImNsdjE4amdrdzA0ZXgybHFnbTd4cmQwbHEifQ.SKH-f-cKklc-I_WODvMe7g>');
Mapbox.setTelemetryEnabled(false);

export default function MapScreen() {
    return (
      <View style={styles.mapContainer}>
      <Mapbox.MapView style={styles.map} zoomEnabled = {true} rotateEnabled = {true} styleURL = 'mapbox://styles/alerat/clw5i1tgf01gf01pc3cupbznz'>
        <Mapbox.Camera 
          zoomLevel={14}
          centerCoordinate={[12.385263, 46.623314]}
          pitch={60}
          animationMode={'moveTo'}
          animationDuration={6000}
        />
        <Mapbox.PointAnnotation
          id="marker"
          coordinate={[12.385263, 46.623314]}
        >
        </Mapbox.PointAnnotation>
      </Mapbox.MapView>
    </View>
    );
}
const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
  map: {
    flex: 1
  }
});