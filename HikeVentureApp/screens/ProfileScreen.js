import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
    PageLogo,
    PageTitle,
  LogoContainer
  }from './../components/style';
const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Implement logout functionality here
    // For example, you might clear user data and navigate to the welcome screen
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
    <LogoContainer>
        <PageLogo resizeMode="cover" source={require('./../assets/logo.png')}/>
          <PageTitle>HikeVenture</PageTitle>   
      </LogoContainer>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>admin</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>admin@gmail.com</Text>
      </View>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    color: '#555',
  },
});

export default ProfileScreen;
