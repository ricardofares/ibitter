import React, { useContext } from 'react';
import GlobalConfig from '../config';
import axios from 'axios';
import { IbitterContext } from '../organisms/providers/IbitterProvider';
import { handleUserLike } from '../utils';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';

export default function PostStatistics({ navigation, post }) {
  const { state, dispatch } = useContext(IbitterContext);

  const adapterHandleUserLike = () => {
    handleUserLike(state.user.username, post.id, !post.i_liked, dispatch);

    // @Hack That is a hack that is used to update directly the post. Using that,
    //       there is no need to query the post from the database again, therefore,
    //       we consume less network bandwidth.
    if (post.i_liked)
      post.likes--;
    else
      post.likes++;
    post.i_liked = !post.i_liked;
  };

  const retweetPost = () => {
    if (post.i_retweet) {
      Alert.alert('Rebeet Inválido', 'Você já realizou um rebeet desta postagem.');
      return;
    }

    axios.post(`${GlobalConfig.apiUrl}/newpost`, {
      username: state.user.username,
      content: post.content,
      retweetOf: post.id,
    }).then(_ => {
      Alert.alert('Rebeet Realizado', 'Você acabou de rebeetar esta postagem com sucesso.');

      dispatch({
        type: 'DO_TIMELINE_UPDATE',
      });
    }).catch(e => {
      Alert.alert('Erro', 'Parece que não foi possível rebeetar a esta postagem.');
      console.warn(`An error has occurred while the user ${state.user.username} was trying to rebeet the post with id ${post.id}.`, e);
    });
  };

  const confirmRetweet = () => {
    Alert.alert(
      'Rebeet',
      'Você deseja confirmar o rebeet?',
      [
        {
          text: 'Sim',
          onPress: retweetPost,
        },
        {
          text: 'Não',
        }
      ],
    );
  };

  return (
    <View style={{ marginLeft: 40 }}>
      <View style={styles.statistics}>
        <TouchableWithoutFeedback
          onPress={adapterHandleUserLike}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.statisticsIcon}
              source={post.i_liked ? require('../assets/images/heart-fill.png') : require('../assets/images/heart.png')}
            />

            <Text style={[styles.statisticsNumberText, post.i_liked ? { color: '#f91880' } : {}]}>{post.likes}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.push('Reply', { post })}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.statisticsIcon}
              source={require('../assets/images/message.png')}
            />
            <Text style={styles.statisticsNumberText}>{post.messages_count}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={confirmRetweet}
        >
          <View style={{ flexDirection: 'row' }}>
            {
              post.i_retweet ?
                <Image
                  style={styles.statisticsIcon}
                  source={require('../assets/images/retweeted.png')}
                />
                :
                <Image
                  style={styles.statisticsIcon}
                  source={require('../assets/images/retweet.png')}
                />
            }
            <Text style={[styles.statisticsNumberText, post.i_retweet ? { color: '#00ba7c' } : {}]}>{post.retweets_count}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statistics: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statisticsIcon: {
    width: 18.75,
    height: 18.75,
    padding: 8,
    marginRight: 8,
  },
  statisticsNumberText: {
    marginRight: 16,
    color: '#536471',
  },
});
