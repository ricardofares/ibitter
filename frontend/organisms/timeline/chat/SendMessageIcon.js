import React from 'react';
import RoundedCorner from '../../../atoms/RoundedButton';
import { Image } from 'react-native';

export default function SendMessageIcon({ navigation }) {
  return (
    <RoundedCorner onPress={() => navigation.push('SendMessage')}>
      <Image
        style={{ width: 24, height: 24, backgroundColor: 'white', }}
        source={require('../../../assets/images/envelope-filled-black.png')}
      />
    </RoundedCorner>
  );
}

