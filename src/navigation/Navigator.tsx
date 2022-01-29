import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen';
import { AuthContext } from '../context/AuthContext';
import PagosScreen from '../screens/PagosScreen';

export type RootStackParams= {
  HomeScreen: undefined;
  PagosScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  RecoverPasswordScreen:undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export default function Navigator() {
  const { authState } = useContext(AuthContext);
  const { isLogedIn } = authState;  
  return (

    (!isLogedIn ? (
      <Stack.Navigator
      initialRouteName={!isLogedIn?'HomeScreen':'SignInScreen'}
      >      
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="RecoverPasswordScreen" component={RecoverPasswordScreen} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator
      initialRouteName={!isLogedIn?'HomeScreen':'SignInScreen'}
      >      
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PagosScreen" component={PagosScreen} />
      </Stack.Navigator>
    ))
  )}
