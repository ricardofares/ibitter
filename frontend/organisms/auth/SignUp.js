import React from 'react';
import GlobalStyles from '../../styles';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { StyleSheet, View, Text } from 'react-native';

export default function SignUp() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Registre-se</Text>
        <Text style={styles.headerSubtitle}>Crie uma conta para que você possa desfrutar de nossas histórias.</Text>
        <View style={styles.inputContainer}>
          <Input label="Usuário" />
          <Input style={{ marginTop: 12 }} settings={{ inputMode: 'email' }} label="E-mail" />
          <Input style={{ marginTop: 12 }} settings={{ secureTextEntry: true }} label="Senha" />
          <Text style={styles.passwordAdviseText}>Sua senha deve conter 8 ou mais caracteres & deve conter uma mistura de caracteres maiúsculos e minúsculos, números e símbolos.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Criar uma conta" />
          <Text style={styles.signUpText}>Criando sua conta, você está aceitando nossos<Text> </Text>
            <Text style={styles.signUpTextEmphasize}>Termos de Uso</Text> e nossa<Text> </Text>
            <Text style={styles.signUpTextEmphasize}>Política de Privacidade</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 16,
    paddingRight: 16,
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
  inputContainer: {
    marginTop: 32,
  },
  passwordAdviseText: {
    marginTop: 8,
    color: GlobalStyles.quaternaryColor,
    fontSize: 10,
  },
  buttonContainer: {
    marginTop: 32,
  },
  signUpText: {
    marginTop: 32,
    width: '95%',
    color: GlobalStyles.quaternaryColor,
    textAlign: 'center',
  },
  signUpTextEmphasize: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
