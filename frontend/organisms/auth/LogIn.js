import React, { useState } from 'react';
import GlobalStyles from '../../styles';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import axios from 'axios';
import { StyleSheet, View, Text, Alert } from 'react-native';

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogIn = async () => {
    try {
      const logInResult = await axios.post('http://192.168.100.55:5000/signin', {
        email,
        password,
      });

      // @Todo: Must navigate to the log-in page.
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
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Bem-vindo, de volta!</Text>
        <Text style={styles.headerSubtitle}>Entre em sua conta e veja o que está acontecendo.</Text>
      </View>
      <View style={{ marginTop: 32 }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: GlobalStyles.paddingLeft,
    paddingRight: GlobalStyles.paddingRight,
  },
  headerContainer: {
  },
  headerTitle: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: 'bold',
    color: GlobalStyles.primaryColor,
  },
  headerSubtitle: {
    marginTop: 8,
    width: '80%',
    opacity: 0.5,
    fontSize: 16,
    color: GlobalStyles.primaryColor,
  },
});
