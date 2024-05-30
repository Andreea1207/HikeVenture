import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import {
    PageLogo,
    PageTitle,
    LogoContainer
} from './../components/style';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contul meu</Text>
        <Button title="Deconectare" onPress={handleLogout} color="#555" />
      </View>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={require('./../assets/logo.png')} />
        <Text style={styles.profileUsername}>AleRat</Text>
        <Button title="Fii Explorator!" onPress={() => {}} color="#45be0c" />
        <Text style={styles.profileMemberSince}>membru din:</Text>
        <Text style={styles.profileMemberDate}>Jun. 2023</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Traseele mele:</Text>
          <Text style={styles.statsValue}>0</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Trasee finalizate:</Text>
          <Text style={styles.statsValue}>3</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Distanță parcursă:</Text>
          <Text style={styles.statsValue}>30.00 km</Text>
        </View>
      </View>
      <View style={styles.routesContainer}>
        <Text style={styles.routeLabel}>Traseele mele:</Text>
        <Button title=">" onPress={() => {}} color="#000" />
      </View>
      <View style={styles.routesContainer}>
        <Text style={styles.routeLabel}>Trasee favorite:</Text>
        <Button title=">" onPress={() => {}} color="#000" />
      </View>
      <View style={styles.routesContainer}>
        <Text style={styles.routeLabel}>Trasee înregistrate:</Text>
        <Button title=">" onPress={() => {}} color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#45be0c',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileUsername: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileMemberSince: {
    fontSize: 16,
    color: '#555',
  },
  profileMemberDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsLabel: {
    fontSize: 14,
    color: '#555',
  },
  statsValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  routesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  routeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
