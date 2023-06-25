import React from 'react';
import RoundedCorner from '../../atoms/RoundedButton';
import { Text } from 'react-native';

export default function CreatePostIcon({ navigation }) {
  return (
    <RoundedCorner onPress={() => navigation.push('CreatePost')}>
      <Text style={{ color: 'white', fontSize: 32, }}>+</Text>
    </RoundedCorner>
  );
}

