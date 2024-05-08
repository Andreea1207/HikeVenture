import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import MapView, { Marker } from 'react-native-maps';

// import MapboxGL from '@react-native-mapbox-gl/maps';
// MapboxGL.setAccessToken('<pk.eyJ1IjoiYWxlcmF0IiwiYSI6ImNsdjE4amdrdzA0ZXgybHFnbTd4cmQwbHEifQ.SKH-f-cKklc-I_WODvMe7g>');

function MapScreen(props) {
    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.59951058643169,
          longitude: 24.736220694695465,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="terrain"
      >
        <Marker
          coordinate={{ latitude: 45.59951058643169, longitude: 24.736220694695465 }}
          title="Varful Moldoveanu"
          description="destination"
        />
      </MapView>
    </View>
    // <View style={styles.container}>
    // <MapboxGL.MapView style={styles.map}>
    //   <MapboxGL.Camera
    //     zoomLevel={10}
    //     centerCoordinate={[45.600074997198945, 24.736948580013397]}
    //   />
    //   <MapboxGL.ShapeSource id="hikingTrails" url="https://www.openstreetmap.org/#map=15/45.3459/23.5597">
    //     <MapboxGL.LineLayer id="hikingTrailsLayer" style={{ lineColor: 'brown', lineWidth: 3 }} />
    //   </MapboxGL.ShapeSource>
    // </MapboxGL.MapView>
    // </View>
    );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
})
export default MapScreen;