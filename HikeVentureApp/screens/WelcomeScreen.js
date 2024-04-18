import React from 'react';
import { Image, View, Button, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../components/style';

function WelcomeScreen({navigation}) {
   // const handleMapPress = () => navigation.navigate('Map');

    //const navigation = useNavigation();

     const handleSignUpPress = () => {
         navigation.navigate('SignUp');
     };

     const handleContinuePress = () => {
         navigation.navigate('Map');
     };

    return (
        <View style={styles.background}>
            <View style={styles.logoContainerWelcome}>
                <Image style={styles.logo} source={require("../assets/logo.png")}/>
                <Text style={styles.text}>HikeVenture</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleSignUpPress} style={[styles.button, styles.buttonSignUp]} >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleContinuePress} style={styles.button} >
                    <Text style={styles.buttonText}>Continue as Visitor</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default WelcomeScreen;