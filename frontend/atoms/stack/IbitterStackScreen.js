import React from 'react';
import GlobalStyles from '../../styles';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

export default function IbitterStackScreen({ children, navigation }) {
  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={() => navigation.pop()}>
        <View style={styles.stackScreenContainer}>
          <Image
            source={require('../../assets/images/chevron-left.png')}
            style={styles.stackScreenBackIcon}
          />
          <Text style={{ fontWeight: 'bold' }}>Voltar</Text>
        </View>
      </TouchableWithoutFeedback >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: GlobalStyles.paddingLeft,
    paddingRight: GlobalStyles.paddingRight,
  },
  stackScreenContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackScreenBackIcon: {
    width: 24,
    height: 24,
  },
});
