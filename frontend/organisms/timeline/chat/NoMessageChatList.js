import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';

const envelopeFilledXml = `
<svg viewBox="0 0 24 24" aria-hidden="true" class="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"><g><path d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z"></path></g></svg>
`;

export default function NoMessageChatList() {
  return (
    <View style={styles.noMessageContainer}>
      <SvgXml
        style={{ width: 120, height: 120, }}
        xml={envelopeFilledXml}
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
