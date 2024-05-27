import styled from 'styled-components';
import { View, Text, ImageBackground, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#093F68",
    green:"#45be0c",
    red : "#EF4444"
};

const { primary, secondary, tertiary, darkLight, brand, 
green, red} = Colors;

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: primary,
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
    logoContainerWelcome: {
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

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight+10}px;
    background-color:${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width:100%;
    align-items: center;
    margin-top: 50px;
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 20px;
`;

export const PageLogo = styled.ImageBackground`
    width: 80px;
    height: 80px;
`;

export const PageTitle = styled.Text`
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
    font-style: italic;
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`;

export const StyledFormArea = styled.View  `
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 50px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 32px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 32px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${green};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 50px;

    ${(props) => props.google == true && `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 12px;

    ${(props) => props.google == true && `
        padding: 2px;
        left: 10px;
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled.View`
height: 1px;
width: 100%;
background-color: ${darkLight};
margin-vertical: 5px;
`;

export const ToolBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0; 
  background-color: ${green};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Ajustează înălțimea după necesitate */
`;


export const ToolBarItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ToolBarIcon = styled.Image`
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
`;

export const ToolBarText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black; /* Schimbă culoarea după necesitate */
  margin-top: 2px;
`;
