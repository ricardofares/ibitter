import React, { useState, useContext } from 'react';
import GlobalStyles from '../../styles';
import GlobalConfig from '../../config';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import IbitterStackScreen from '../../atoms/stack/IbitterStackScreen';
import { IbitterContext } from '../providers/IbitterProvider';
import axios from 'axios';
import { StyleSheet, View, Text, Alert } from 'react-native';

export default function LogIn({ navigation }) {
  const { dispatch } = useContext(IbitterContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogIn = async () => {
    try {
      // Contact the API to initiate the sign-in process.
      // Send a POST request to the specified URL, providing the email and password for authentication.
      const logInResult = await axios.post(`${GlobalConfig.apiUrl}/signin`, {
        email,
        password,
      });

      // Dispatch an action to update the user information after receiving the response from the API.
      // The action type 'DO_LOGIN' is used to identify the login action.
      // The payload contains the user information retrieved from the API response.
      dispatch({
        type: 'DO_LOGIN',
        payload: {
          user: {
            ...logInResult.data
          }
        }
      });
    } catch (e) {
      // Check if the back-end is offline. If so, then an alert will be shown to
      // the user informing it.
      if (e.message === 'Network Error') {
        Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
        return;
      }

      const { code, message } = e.response.data;

      // The error code `E003` indicates that the user with the specifid email
      // has not been registered. On the other hand, the error code `E004` indicates
      // that the specified password is invalid.
      //
      // \note These error codes are specified by the back-end.
      if (code === 'E003' || code === 'E004') {
        Alert.alert('Entrada Inválida', message);
        return;
      }
    }
  };

  return (
    <IbitterStackScreen
      navigation={navigation}
      headerTitle="Bem-vindo, de volta!"
      headerSubtitle="Entre em sua conta e veja o que está acontecendo"
    >
      <View>
        <Input settings={{ inputMode: 'email', onChangeText: text => setEmail(text), value: email }} label="E-mail" />
        <Input style={{ marginTop: 12 }} settings={{ secureTextEntry: true, onChangeText: text => setPassword(text), value: password }} label="Senha" />
      </View>
      <View style={{ marginTop: 32 }}>
        <Button text="Entrar" onPress={onLogIn} />
        <Text style={{ marginTop: 32, textAlign: 'center', }}>Não tem uma conta?<Text> </Text>
          <Text
            style={{ fontWeight: 'bold', textDecorationLine: 'underline', }}
            onPress={() => navigation.navigate('SignUp')}
          >
            Registre-se
          </Text>
        </Text>
      </View>
    </IbitterStackScreen>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: GlobalStyles.paddingLeft,
    paddingRight: GlobalStyles.paddingRight,
  },
});
