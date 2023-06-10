import React from 'react';
import Auth from './Auth';
import SignUp from './SignUp';
import LogIn from './LogIn';
import GlobalStyles from '../../styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: GlobalStyles.secondaryColor,
        }
      }}
    >
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LogIn" component={LogIn} />
    </Stack.Navigator>
  );
}
