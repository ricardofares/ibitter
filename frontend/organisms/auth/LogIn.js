import React from 'react';
import GlobalStyles from '../../styles';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { StyleSheet, View, Text } from 'react-native';

export default function LogIn({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Bem-vindo, de volta!</Text>
        <Text style={styles.headerSubtitle}>Entre em sua conta e veja o que está acontecendo.</Text>
      </View>
      <View style={{ marginTop: 32 }}>
        <Input settings={{ inputMode: 'email' }} label="E-mail" />
        <Input style={{ marginTop: 12 }} settings={{ secureTextEntry: true }} label="Senha" />
      </View>
      <View style={{ marginTop: 32 }}>
        <Button text="Entrar" />
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
