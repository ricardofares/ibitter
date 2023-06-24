import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

export default function BackIcon({ navigation, style }) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.pop()}>
      <View style={[{ flexDirection: 'row', alignItems: 'center', }, style]}>
        <Image
          style={{ width: 32, height: 32 }}
          source={require('../assets/images/chevron-left.png')}
        />
        <Text style={{ fontWeight: 'bold' }}>Voltar</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
