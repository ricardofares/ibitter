import React from 'react';
import SVG from '../../../svg';
import { StyleSheet, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';

export default function NoMessageChatList() {
  return (
    <View style={styles.noMessageContainer}>
      <SvgXml
        style={{ width: 120, height: 120, }}
        xml={SVG.envelopeFilledXml}
      />
      <Text style={styles.noMessageContainerText}>Você ainda não possui nenhum mensagens :(</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noMessageContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '50%',
    opacity: 0.25,
  },
  noMessageContainerText: {
    width: '85%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
