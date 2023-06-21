import React, { useState } from 'react';
import GlobalStyles from '../../styles';
import GlobalConfig from '../../config';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import IbitterStackScreen from '../../atoms/stack/IbitterStackScreen';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { hasUppercaseLetter, hasLowercaseLetter, hasSymbol } from '../../utils';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');

  /// \brief Updates the name whenever thee name teext input changes.
  ///
  /// This function acts as a middleware that validates the `name` input
  /// and updates the name accordingly.
  ///
  /// \param text The input text obtained from the `name` text input component.
  const onNameChange = text => {
    // Updates the name state with the provided input text. In this case,
    // there is no name validation.
    setName(text);
  };

  /// \brief Updates the username whenever the username text input changes.
  ///
  /// This function acts as a middleware that validates the `username` input
  /// and updates the username accordingly.
  ///
  /// \param text The input text obtained from the `username` text input component.
  const onUsernameChange = text => {
    // Updates the username state with the provided input text. In this case,
    // there is no username validation.
    setUsername(text);
  };

  /// \brief Updates the course whenever the course selection changes.
  ///
  /// This function acts as a middleware that validates the `course` input
  /// and updates the course accordingly.
  ///
  /// \param course The course text obtained from the course selection dropdown.
  /// \param index The course index in the course selection dropdown.
  const onCourseChange = (course, index) => {
    // Updates the course state with the provided course selection. In this case,
    // there is no course valiidation.
    setCourse(course);
  };

  /// \brief Updates the email whenever the email text input changes.
  ///
  /// This function acts as a middleware that validates the email input and
  /// updates the email accordingly.
  ///
  /// \param text The input text obtained from the `email` text input component.
  const onEmailChange = text => {
    // Updates the email state with the provided input text. In this case,
    // there is no email validation while the email is being inserted. However,
    // will be there an email validation when the user tries to register.
    setEmail(text);
  };

  /// \brief Updates the password whenever the password text input changes.
  ///
  /// This function acts as a middleware that validates the password input and
  /// updates the password accordingly.
  ///
  /// \param text The input text obtained from the `password` text input component.
  const onPasswordChange = text => {
    // Updates the password state with the provided input text. In this case,
    // there is no password validation.
    setPassword(text);
  };

  const onRegisterUser = async () => {
    // Validate each of the inputs needed for create an account.
    for (const validate of registerValidationCases(username, email, password, course)) {
      const checkResult = validate();
      if (checkResult.condition) {
        Alert.alert(checkResult.title, checkResult.message);
        return;
      }
    }

    try {
      const registerResult = await axios.post(`${GlobalConfig.apiUrl}/signup`, {
        name,
        username,
        course,
        email,
        password
      });

      if (registerResult.status === 204) {
        Alert.alert('Cadastrado com Sucesso', 'Você foi cadastrado com sucesso em nossa plataforma.');

        // Clear the inputs.
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');

        // Push the `Log In` screen for the user log in into its account.
        navigation.pop();
      }
    } catch (e) {
      // Check if the back-end is offline. If so, then an alert will be shown to
      // the user informing it.
      if (e.message === 'Network Error') {
        Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
        return;
      }

      const data = e.response.data;

      // Check if an user with the specified email has already been registered. If so,
      // an alert will be sent to the user informing it
      // Check if a database constraint has not been followed.
      if (data.constraint) {
        // Check if the email has been previously used.
        if (data.constraint === 'users_email_unique') {
          Alert.alert('Usuário Existente', 'Este e-mail já está sendo utilizado.');
          return;
        } else if (data.constraint === 'users_username_unique') {
          Alert.alert('Usuário Existente', 'Este nome de usuário já está sendo utilizado.');
          return;
        }
      }
    }
  };

  return (
    <IbitterStackScreen
      navigation={navigation}
      headerTitle="Registre-se"
      headerSubtitle="Crie uma conta para que você possa desfrutar de nossas histórias."
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
      >
        <Input label="Nome" settings={{ onChangeText: onNameChange, value: name }} />
        <Input style={{ marginTop: 12 }} label="Usuário" settings={{ onChangeText: onUsernameChange, value: username }} />
        <Text style={styles.adviseText}>O usuário deve conter mais que 6 caracteres.</Text>
        <SelectDropdown
          data={[
            "Ciências Biológicas",
            "Ciência da Computação",
            "Engenharia de Alimentos",
            "Física",
            "Matemática",
            "Química",
            "Tradução",
            "Letras",
            "Pedagogia",
          ]}
          buttonStyle={styles.buttonSelectDropdown}
          buttonTextStyle={styles.buttonTextSelectDropdown}
          rowTextStyle={styles.selectDropdownText}
          dropdownStyle={styles.selectDropdown}
          defaultButtonText="Curso de Graduação"
          onSelect={onCourseChange}
        />
        <Input style={{ marginTop: 12 }} settings={{ inputMode: 'email', onChangeText: onEmailChange, value: email }} label="E-mail" />
        <Input style={{ marginTop: 12 }} settings={{ secureTextEntry: true, onChangeText: onPasswordChange, value: password }} label="Senha" />
        <Text style={styles.adviseText}>Sua senha deve conter 8 ou mais caracteres & deve conter uma mistura de caracteres maiúsculos e minúsculos, números e símbolos.</Text>
      </ScrollView>
      <View style={{ marginTop: 32 }}>
        <Button text="Criar uma conta" onPress={onRegisterUser} />
        <Text style={styles.signUpText}>Criando sua conta, você está aceitando nossos<Text> </Text>
          <Text style={styles.signUpTextEmphasize}>Termos de Uso</Text> e nossa<Text> </Text>
          <Text style={styles.signUpTextEmphasize}>Política de Privacidade</Text>
        </Text>
      </View>
    </IbitterStackScreen>
  );
}

const registerValidationCases = (username, email, password, course) => [
  () => {
    return {
      condition: username.length === 0,
      title: 'Usuário Inválido',
      message: 'O nome do usuário não foi especificado.'
    };
  },
  () => {
    return {
      condition: username.length < 6,
      title: 'Usuário Inválido',
      message: 'O nome do usuário deve conter mais que 6 caracteres',
    };
  },
  () => {
    return {
      condition: course.length === 0,
      title: 'Curso Inválido',
      message: 'O curso não foi selecionado',
    };
  },
  () => {
    return {
      condition: email.length === 0,
      title: 'E-mail Inválido',
      message: 'O e-mail não foi especificado.',
    }
  },
  () => {
    return {
      condition: !email.includes('@') || !email.includes('.'),
      title: 'E-mail Inválido',
      message: 'O e-mail é inválido.',
    };
  },
  () => {
    return {
      condition: password.length === 0,
      title: 'Senha Inválida',
      message: 'A senha não foi especificada.',
    };
  },
  () => {
    return {
      condition: password.length < 8,
      title: 'Senha Inválida',
      message: 'A senha deve conter mais que 8 caracteres.',
    };
  },
  () => {
    return {
      condition: !hasLowercaseLetter(password),
      title: 'Senha Inválida',
      message: 'A senha deve conter um caractere minúsculo.',
    };
  },
  () => {
    return {
      condition: !hasUppercaseLetter(password),
      title: 'Senha Inválida',
      message: 'A senha deve conter um caractere maiúsculo.',
    };
  },
  () => {
    return {
      condition: !hasSymbol(password),
      title: 'Senha Inválida',
      message: 'A senha deve conter um símbolo.',
    };
  },
];

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
  adviseText: {
    marginTop: 8,
    color: GlobalStyles.quaternaryColor,
    fontSize: 10,
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
  buttonSelectDropdown: {
    backgroundColor: GlobalStyles.tertiaryColor,
    flexDirection: 'row',
    marginTop: 8,
    padding: 8,
    borderRadius: 10,
    width: '100%',
  },
  buttonTextSelectDropdown: {
    color: '#5b606b',
    fontSize: 14,
    textAlign: 'left',
  },
  selectDropdown: {
    backgroundColor: GlobalStyles.tertiaryColor,
    borderRadius: 10,
  },
  selectDropdownText: {
    color: '#5b606b',
  }
});
