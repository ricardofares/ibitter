import React, { useState, useEffect } from 'react';
import GlobalConfig from '../../config';
import IbitterStackScreen from '../../atoms/stack/IbitterStackScreen';
import axios from 'axios';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';

export default function Reply({ navigation, route }) {
  const [name, setName] = useState('');
  const { post } = route.params;

  useEffect(() => {

    axios.get(`${GlobalConfig.apiUrl}/getname?username=${route.params.post.username}`)
      .then(response => {
        // Fetch the data returned from the response.
        const { data } = response;

        // Check if no name has been found to that user.
        if (data.length === 0) {
          Alert.alert('Erro', 'Parece que não foi possível encontrar um nome para o usuário que realiizou a postagem.');
          navigation.pop();
          return;
        }

        // Update the name of the user that has posted the selected post.
        setName(data[0].name);
      }).catch(e => {
        Alert.alert('Erro', 'Não foi possível carregar o nome do usuário que realizou a postagem.');
      });
  }, []);

  return (
    <IbitterStackScreen
      navigation={navigation}
      headerTitle="Responda-o!"
      headerSubtitle="Hmm... O que você está querendo responder a ele?"
    >
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.userIcon}
          source={require('../../assets/images/Photo.png')}
        />
        <View style={{ marginLeft: 8, flexDirection: 'column', justifyContent: 'center' }} >
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          <Text style={{ color: '#a0a0a0' }}>@{post.username}</Text>
        </View>
      </View>
      <View style={{ marginTop: 8 }} >
        <Text style={{ color: '#191919', fontSize: 16 }}>{post.content}</Text>
      </View>
    </IbitterStackScreen>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
  },
  userIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
});
