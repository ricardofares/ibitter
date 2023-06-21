import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GlobalConfig from '../../config';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { IbitterContext } from '../providers/IbitterProvider';
import { timeDiff } from '../../utils';

export default function RepliedContent({ navigation, repliedPostId }) {
  const { state } = useContext(IbitterContext);
  const [repliedPost, setRepliedPost] = useState({});
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    const loadRepliedPost = async () => {
      try {
        const response = await axios.get(`${GlobalConfig.apiUrl}/getpost?postId=${repliedPostId}&username=${state.user.username}`);

        // Check if no post has been found in the database to be fetched. Therefore, this categorize an error since
        // it is supposed that this post exists.
        if (response.data.length === 0) {
          console.error(`A post with the identifier (${repliedPostId}) were unable to be fetched from the database.`);
          return;
        }

        const repliedPost = response.data[0];

        // Update the replied post that has its contents fetched from the database,
        // and update the flag busy to `false` to indicate that the post has already
        // been fetched and can be shown to the user.
        setRepliedPost(repliedPost);
        setBusy(false);
      } catch (e) {
        console.warn(e);
      }
    };

    // Load the replied post from the database using the post identifier
    // that has been specified by the `RepliedContent` parameter.
    loadRepliedPost();
  }, []);

  if (isBusy) {
    return <ActivityIndicator />;
  } else {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Reply', { post: repliedPost })}
      >
        <View style={{ marginBottom: 8 }}>
          <View style={styles.repliedContentContainer}>
            <View style={styles.postHeaderContainer}>
              <Image
                style={styles.userIcon}
                source={require('../../assets/images/Photo.png')}
              />
              <Text style={styles.postHeaderUsername}>{repliedPost.username}</Text>
              <Text style={styles.postHeaderTime}>&#8226; {timeDiff(repliedPost.posted_at, new Date())}</Text>
            </View>
            <Text style={styles.repliedContent}>{repliedPost.content}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  userIcon: {
    width: 24,
    height: 24,
    borderRadius: 7,
  },
  postHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeaderUsername: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  postHeaderTime: {
    marginLeft: 8,
    color: '#a0a0a0',
  },
  repliedContentContainer: {
    padding: 16,
    marginTop: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 10,
  },
  repliedContent: {
    paddingTop: 8,
    paddingBottom: 8,
  },
});
