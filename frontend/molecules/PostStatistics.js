import React from 'react';
import { handleUserLike } from '../utils';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

export default function PostStatistics({ state, dispatch, post }) {
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

  return (
    <View>
      <View style={styles.statistics}>
        <TouchableWithoutFeedback
          onPress={adapterHandleUserLike}
        >
          <Image
            style={styles.statisticsIcon}
            source={post.i_liked ? require('../assets/images/heart-fill.png') : require('../assets/images/heart.png')}
          />
        </TouchableWithoutFeedback>
        <Text>{post.likes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statistics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statisticsIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  }
});
