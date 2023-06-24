import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

export default function RoundedCorner({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{ position: 'absolute', marginTop: '170%', left: '80%' }}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View style={styles.container}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 20,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
