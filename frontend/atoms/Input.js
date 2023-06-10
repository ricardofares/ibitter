import React from 'react';
import GlobalStyles from '../styles';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default function Input({ label, settings, style }) {
  return (
    <View style={[style, styles.textInputContainer]}>
      <Text style={[styles.textInputLabel,
      settings.multiline && settings.multiline == true ? { top: 5 } : {}]}>{label}</Text>
      <TextInput {...settings} style={styles.textInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: GlobalStyles.tertiaryColor,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
  },
  textInputLabel: {
    width: '20%',
    color: '#5b606b',
  },
  textInput: {
    width: '80%',
    color: 'black',
    flex: 1,
  },
});
