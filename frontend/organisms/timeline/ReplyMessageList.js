import React, { useContext, useEffect, useState } from 'react';
import GlobalStyles from '../../styles';
import GlobalConfig from '../../config';
import PostStatistics from '../../molecules/PostStatistics';
import CourseImage from '../../atoms/CourseImage';
import axios from 'axios';
import {
  StyleSheet, View, Text, FlatList, Image, TouchableWithoutFeedback
} from 'react-native';
import { IbitterContext } from '../providers/IbitterProvider';
import { timeDiff } from '../../utils';

export default function ReplyMessageList({ ListHeaderComponent, navigation, username, postId }) {
  const { state, dispatch } = useContext(IbitterContext);

  // This state will store the array containing the messages
  // from the specified post by `postId`. Further, this array will
  // be set after fetching these messages from the database.
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    axios.get(`${GlobalConfig.apiUrl}/postmessages?postId=${postId}&username=${username}`)
      .then(response => {
        // Fetch the data returned from the response.
        const { data } = response;

        // Update the message list.
        setMessageList(data);
      })
      .catch(_ => {
        Alert.alert('Erro', 'Não foi possível carregar as mensagens de resposta para esta postagem');
      });
  }, [state.lastTimelineUpdate, postId]);

  const renderMessage = post =>
    <View style={styles.postContainer}>
      <View style={styles.postHeaderContainer}>
        <CourseImage
          style={styles.userIcon}
          username={post.username}
        />
        <View style={{ marginLeft: 8, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.postHeaderName}>{post.name}</Text>
            <Text style={styles.postHeaderTime}>&#8226; {timeDiff(post.posted_at, new Date())}</Text>
          </View>
          <Text style={styles.postHeaderUsername}>@{post.username}</Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.push('Reply', { post })}>
        <View>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
      </TouchableWithoutFeedback>
      <PostStatistics state={state} dispatch={dispatch} post={post} />
    </View>;

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      data={messageList}
      renderItem={({ item }) => renderMessage(item)}
      // @Hack A hack to allow the user to scroll down until reach the bottom of the last post.
      //       Without that the user also can reach the last post, however, to reach the bottom
      //       of it is needed a scroll up.
      ListFooterComponent={
        <Text>{"\n".repeat(20)}</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  postContainer: {
    marginTop: 16,
    paddingLeft: GlobalStyles.paddingLeft,
    paddingRight: GlobalStyles.paddingRight,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#dfdfdf',
  },
  postHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeaderName: {
    fontWeight: 'bold',
  },
  postHeaderUsername: {
    opacity: 0.50,
  },
  postHeaderTime: {
    marginLeft: 8,
    color: '#a0a0a0',
  },
  postContent: {
    marginLeft: 40,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'justify',
    color: '#181818',
  },
});
