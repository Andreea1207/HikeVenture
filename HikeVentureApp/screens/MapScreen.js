import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


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
          title="Varful Moldoveanu 2556"
          description="destination"
        />
      </MapView>
    </View>
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
})
export default MapScreen;