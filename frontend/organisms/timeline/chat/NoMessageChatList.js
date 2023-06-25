import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function NoMessageChatList() {
  return (
    <View style={styles.noMessageContainer}>
      <Image
        style={{ width: 120, height: 120, }}
        source={require('../../../assets/images/envelope-filled-black.png')}
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
