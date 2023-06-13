import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { timeDiff } from '../../utils';

export default function RepliedContent({ navigation, repliedPost }) {
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
    </TouchableWithoutFeedback >
  );
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
    borderWidth: 0.25,
    borderColor: '#b0b0b0',
    borderRadius: 10,
  },
  repliedContent: {
    paddingTop: 8,
    paddingBottom: 8,
  },
});
