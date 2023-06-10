import React from 'react';
import GlobalStyles from '../styles';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button({ text, style, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style, disabled ? { opacity: 0.5 } : {}]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
