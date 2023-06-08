import React from 'react';
import Auth from './Auth';
import SignUp from './SignUp';
import GlobalStyles from '../../styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: '',
        headerBackTitle: 'Voltar',
        headerTintColor: 'black',
        headerBackImageSource: require('../../assets/images/arrow-left.png'),
        contentStyle: {
          backgroundColor: GlobalStyles.secondaryColor,
        }
      }}
    >
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
