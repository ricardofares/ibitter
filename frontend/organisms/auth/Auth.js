import React from 'react';
import GlobalStyles from '../../styles';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function Auth({ navigation }) {Auth
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.headerTitle}>Ibitter</Text>
      </View>
      <View style={styles.bodyContainer}>
        { /* @Todo: This TouchableOpacity should be transformed in an molecule. */}
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Registre-se com seu E-mail</Text>
        </TouchableOpacity>
        <View style={styles.signInContainer}>
          <Text>Já está cadastrado? <Text style={styles.signInText}>Clique aqui!</Text></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerContainer: {
    flexGrow: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    marginTop: 16,
    color: GlobalStyles.primaryColor,
    fontSize: 48,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    marginTop: 24,
    opacity: 0.75,
    color: GlobalStyles.primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bodyContainer: {
    flexGrow: 3,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: GlobalStyles.primaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: GlobalStyles.secondaryColor,
    fontWeight: 'bold',
  },
  signInContainer: {
    marginTop: 32,
  },
  signInText: {
    color: GlobalStyles.primaryColor,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  icon: {
    width: 128,
    height: 128,
  },
});

