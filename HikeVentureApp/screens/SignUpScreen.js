import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View } from 'react-native';


//icons

import{Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
SubTitle,
StyledFormArea,
LeftIcon,
StyledInputLabel,
StyledTextInput,
RightIcon,
Colors,
LogoContainer,
StyledButton, 
ButtonText,
MsgBox,
Line
}from './../components/style';

const {brand, darkLight, primary} = Colors;

const SignUp = () => {
  const [hidePassword, setHidePassword] = useState(true);


  return(
    <StyledContainer>
    <StatusBar style='dark'>

    </StatusBar>
      <LogoContainer>
        <PageLogo resizeMode="cover" source={require('./../assets/logo.png')}/>
          <PageTitle>HikeVenture</PageTitle>   
      
      </LogoContainer>
      <InnerContainer>
      <SubTitle>Account SignUp</SubTitle> 
          <Formik
            initialValues={{Name: '', Username: '', email: '', password: ''}}
            onSubmit={(values) => {
              console.log(values);
            }}
            >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
              <MyTextInput
                label="Name"
                icon="person"
                placeholder="Enter your name..."
                placeholderTextColor={darkLight}
                onChangeText={handleChange('Name')}
                onBlur={handleBlur('Name')}
                value={values.Name}
              />

              <MyTextInput
                label="Username"
                icon="person"
                placeholder="Enter your username..."
                placeholderTextColor={darkLight}
                onChangeText={handleChange('Username')}
                onBlur={handleBlur('Username')}
                value={values.Username}
              />

              <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="Enter your email..."
                placeholderTextColor={darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />

              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="********"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />

              <MyTextInput
                label="Confirm Password"
                icon="lock"
                placeholder="********"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox>...</MsgBox>
            <StyledButton onPress={handleSubmit}>
              <ButtonText>SignUp</ButtonText>
            </StyledButton>
            <Line />         
            </StyledFormArea>)}
          </Formik>
        </InnerContainer>
    </StyledContainer>
  );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) =>
{
return(
  <View>
    <LeftIcon>
      <Octicons name={icon} size={30} color={brand}/>
    </LeftIcon>
    <StyledInputLabel>{label}</StyledInputLabel>
    <StyledTextInput {...props}/>
    {isPassword &&(
      <RightIcon onPress={() => setHidePassword(!hidePassword)}>
        <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight}/>
      </RightIcon>
    )}
  </View>
  );
};

export default SignUp;

//SignIn with Google, useful for login page, not for SignUp
/*<StyledButton google={true} onPress={handleSubmit}>
<Fontisto name='google' color={primary} size={20}/>
  <ButtonText google={true}>Sign in with Google</ButtonText>
</StyledButton>*/