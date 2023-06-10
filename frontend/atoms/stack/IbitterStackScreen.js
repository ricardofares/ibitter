import React from 'react';
import GlobalStyles from '../../styles';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

export default function IbitterStackScreen({ children, navigation, headerTitle, headerSubtitle, headerComponent }) {
  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={() => navigation.pop()}>
        <View style={styles.stackScreenContainer}>
          <Image
            source={require('../../assets/images/chevron-left.png')}
            style={styles.stackScreenBackIcon}
          />
          <Text style={{ fontWeight: 'bold' }}>Voltar</Text>
          {headerComponent}
        </View>
      </TouchableWithoutFeedback>
      {headerTitle ?
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
        </View> :
        <></>
      }
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: GlobalStyles.paddingLeft,
    paddingRight: GlobalStyles.paddingRight,
  },

  /// \brief This tyle is used to stylize the screen
  ///        screen container that will contain the
  ///        stack related components as the 'back' button.
  stackScreenContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  /// \brief This style is used to stylize the 'back' button.
  stackScreenBackIcon: {
    width: 24,
    height: 24,
  },
  headerContainer: {
    marginBottom: 32,
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
