import React from 'react';
import RoundedCorner from '../../../atoms/RoundedButton';
import SVG from '../../../svg';
import { SvgXml } from 'react-native-svg';

export default function SendMessageIcon({ navigation }) {
  return (
    <RoundedCorner onPress={() => navigation.push('SendMessage')}>
      <SvgXml
        style={{ width: 24, height: 24, backgroundColor: 'white', }}
        xml={SVG.envelopeFilledXml}
      />
    </RoundedCorner>
  );
}

