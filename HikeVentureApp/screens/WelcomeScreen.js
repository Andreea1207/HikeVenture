import React from 'react';
import { Image, View, Button, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
        <View style={styles.backround}>
            <View style={styles.logoContainer}>
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
const styles = StyleSheet.create({
    backround: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-end",
        alignItems: "center",
    },
    logInButton: {
        width: "70%",
        height: 70,
        backgroundColor: "#70cc40",
        justifyContent: "flex-end",
    },
    viewButton: {
        width: "70%",
        height: 70,
        backgroundColor: "#45be0c78"
    },
    logo: {
        width: 300,
        height: 300,
    },
    logoContainer: {
        position: "absolute",
        top: 50,
        alignItems: "center",
    },
    text: {
        color: '#093F68',
        fontSize: 55,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#70cc40',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
    },
    buttonSignUp: {
        backgroundColor: '#45be0c',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    buttonsContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },

})
export default WelcomeScreen;