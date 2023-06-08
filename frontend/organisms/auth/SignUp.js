import React from 'react';
import GlobalStyles from '../../styles';
import { StyleSheet, View, Text } from 'react-native';

export default function SignUp() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Registre-se</Text>
        <Text style={styles.headerSubtitle}>Crie uma conta para que você possa desfrutar de nossas histórias.</Text>
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
});
