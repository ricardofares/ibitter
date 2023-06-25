import React, { useState, useEffect, useContext } from 'react';
import GlobalConfig from '../../config';
import ReplyMessageList from './ReplyMessageList';
import IbitterStackScreen from '../../atoms/stack/IbitterStackScreen';
import PostStatistics from '../../molecules/PostStatistics';
import ContentArea from '../../molecules/ContentArea';
import Button from '../../atoms/Button';
import CourseImage from '../../atoms/CourseImage';
import axios from 'axios';
import { StyleSheet, View, Text, Alert, Keyboard, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import { IbitterContext } from '../providers/IbitterProvider';

export default function Reply({ navigation, route }) {
  const { state, dispatch } = useContext(IbitterContext);

  const [post, setPost] = useState(route.params.post);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get(`${GlobalConfig.apiUrl}/getname?username=${route.params.post.username}`)
      .then(response => {
        // Fetch the data returned from the response.
        const { data } = response;

        // Check if no name has been found to that user.
        if (data.length === 0) {
          Alert.alert('Erro', 'Parece que não foi possível encontrar um nome para o usuário que realizou a postagem.');
          navigation.pop();
          return;
        }

        // Update the name of the user that has posted the selected post.
        setName(data[0].name);
      }).catch(_ => {
        Alert.alert('Erro', 'Não foi possível carregar o nome do usuário que realizou a postagem.');
      });
  }, [state.lastTimelineUpdate]);

  const onReplyPost = () => {
    axios.post(`${GlobalConfig.apiUrl}/newpost`, {
      username: state.user.username,
      content: content.trim(),
      replyTo: post.id
    }).then(_ => {
      Alert.alert('Respondido', 'Você respondeu a esta postagem com sucesso.');

      // Clear the content.
      setContent('');

      dispatch({
        type: 'DO_TIMELINE_UPDATE',
      });

      // Update the messages count from the post without the need to fetch it
      // again from the database to reduce the network bandwidth consumption.
      post.messages_count++;
    }).catch(_ => {
      Alert.alert('Erro', 'Parece que não foi possível responder a esta postagem.');
    });
  };

  const renderPostContent = content => {
    const imageStartIndex = content.indexOf('[');
    const imageEndIndex = content.indexOf(']');

    const beforeImageContent = content.substring(0, imageStartIndex);
    const imageContent = content.substring(imageStartIndex + 1, imageEndIndex);
    const afterImageContent = content.substring(imageEndIndex + 1, content.length);

    if (imageContent.length > 0) {
      return (
        <>
          <Text style={styles.postContent}>{beforeImageContent}</Text>
          <Image style={styles.postImage} src={imageContent} />
          <Text style={styles.postContent}>{afterImageContent}</Text>
        </>
      );
    } else {
      return <Text style={styles.postContent}>{content}</Text>;
    }
  };

  return (
    <IbitterStackScreen
      navigation={navigation}
      headerComponent={
        <Button
          onPress={onReplyPost}
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
      <ReplyMessageList
        ListHeaderComponent={
          <>
            <View style={styles.userInfoContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('User', { choosenUser: post.username })}>
                <CourseImage username={post.username} />
              </TouchableOpacity>
              <View style={{ marginLeft: 8, flexDirection: 'column', justifyContent: 'center' }} >
                <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                <Text style={{ color: '#a0a0a0' }}>@{post.username}</Text>
              </View>
            </View>
            <View style={{ marginTop: 8, marginBottom: 8 }} >
              {renderPostContent(post.content)}
            </View>
            <PostStatistics post={post} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ marginTop: 16, }}>
                <ContentArea
                  label="Resposta"
                  content={content}
                  setContent={setContent}
                  maxLength={255}
                />
              </View>
            </TouchableWithoutFeedback>
          </>
        }
        navigation={navigation}
        username={state.user.username}
        postId={post.id}
      />
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
  postContent: {
    marginLeft: 44,
    color: '#191919',
    fontSize: 16,
    textAlign: 'justify'
  },
  postImage: {
    width: '85%',
    height: 400,
    resizeMode: 'stretch',
    marginLeft: 40,
    borderRadius: 10,
  },
});
