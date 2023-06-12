import React, { useState, useEffect, useContext } from 'react';
import GlobalConfig from '../../config';
import IbitterStackScreen from '../../atoms/stack/IbitterStackScreen';
import PostStatistics from '../../molecules/PostStatistics';
import ContentArea from '../../molecules/ContentArea';
import Button from '../../atoms/Button';
import axios from 'axios';
import { StyleSheet, View, Text, Image, Alert, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native';
import { IbitterContext } from '../providers/IbitterProvider';

export default function Reply({ navigation, route }) {
  const { state, dispatch } = useContext(IbitterContext);
  const { post } = route.params;

  const [content, setContent] = useState('');
  const [name, setName] = useState('');

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
      }).catch(_ => {
        Alert.alert('Erro', 'Não foi possível carregar o nome do usuário que realizou a postagem.');
      });
  });

  return (
    <IbitterStackScreen
      navigation={navigation}
      headerTitle="Responda-o!"
      headerSubtitle="Hmm... O que você está querendo responder a ele?"
      headerComponent={
        <Button
          text="Responder"
          style={{
            width: '30%',
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 16,
            paddingRight: 16,
            marginLeft: 'auto',
          }}
          disabled={content.length === 0 || content.length > 255}
        />
      }
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
      <View style={{ marginTop: 8, marginBottom: 8 }} >
        <Text style={{ color: '#191919', fontSize: 16, textAlign: 'justify' }}>{post.content}</Text>
      </View>
      <PostStatistics state={state} dispatch={dispatch} post={post} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ marginTop: 16 }}>
          <FlatList
            ListHeaderComponent={
              <ContentArea
                label="Resposta"
                content={content}
                setContent={setContent}
                maxLength={255}
              />
            }
          />
        </View>
      </TouchableWithoutFeedback>
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
