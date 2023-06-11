import React, { useState, useContext, useEffect } from 'react';
import GlobalStyles from '../../styles';
import axios from 'axios';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import { IbitterContext } from '../providers/IbitterProvider';
import { handleUserLike, timeDiff } from '../../utils';

export default function Timeline({ navigation }) {
  const { state, dispatch } = useContext(IbitterContext);
  const [posts, setPosts] = useState([]);
  const [currentTab, setCurrentTab] = useState('ForYou');

  useEffect(() => {
    /// \brief Loads all the posts from the database using the API.
    ///
    /// This function sends a GET request to the specified API endpoint
    /// to fetch all the posts stored in the database.
    ///
    /// Upon successful retrieval, the received post data is used to update the state of the component
    /// by calling the `setPosts` function with the fetched data.
    ///
    /// In case of any errors, the function checks if the backend is offline by examining the error message.
    /// If the error message indicates a network error, an alert is shown to the user, notifying them of the
    /// server unavailability.
    const loadAllPosts = async () => {
      try {
        // Send a GET request to the API endpoint to retrieve all the posts
        const postResponse = await axios.get(`http://192.168.100.55:5000/posts`);

        // Send a GEET request to thte API endpoint to retrieve all the likes made by this user.
        const likesResponse = await axios.get(`http://192.168.100.55:5000/getlike?username=${state.user.username}`);

        for (const post of postResponse.data) {
          post.i_liked = false;

          for (const likes of likesResponse.data)
            if (post.id === likes.post_id)
              post.i_liked = true;
        }

        // Update the state of the component with the received post data.
        setPosts(postResponse.data);
      } catch (e) {
        // Display an alert to the user informing them about the server being offline.
        if (e.message === 'Network Error') {
          Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
          return;
        }
      }

    };

    // Call the loadAllPosts function to fetch and load all the posts from the database.
    loadAllPosts();
  }, [state.lastTimelineUpdate]);

  const renderPost = post =>
    <View style={styles.postContainer}>
      <View style={styles.postHeaderContainer}>
        <Image
          style={styles.userIcon}
          source={require('../../assets/images/Photo.png')}
        />
        <Text style={styles.postHeaderUsername}>{post.username}</Text>
        <Text style={styles.postHeaderTime}>&#8226; {timeDiff(post.posted_at, new Date())}</Text>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      <View style={styles.postStatisticsContainer}>
        <View style={styles.postStatistics}>
          <TouchableWithoutFeedback
            onPress={() => handleUserLike(state.user.username, post.id, !post.i_liked, dispatch)}
          >
            <Image
              style={styles.postStatisticsIcon}
              source={post.i_liked ? require('../../assets/images/heart-fill.png') : require('../../assets/images/heart.png')}
            />
          </TouchableWithoutFeedback>
          <Text>{post.likes}</Text>
        </View>
      </View>
    </View>;


  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.userIcon}
          source={require('../../assets/images/Photo.png')}
        />
        <Text style={styles.headerTitle}>@{state.user.username || 'Username Placeholder'}</Text>
        <Image
          style={styles.sendIcon}
          source={require('../../assets/images/send.png')}
        />
      </View>
      <View style={styles.navigatorContainer}>
        <TouchableWithoutFeedback onPress={() => setCurrentTab('ForYou')}>
          <View style={styles.navigatorTabContainer}>
            <Text style={[styles.navigatorTabTitle, currentTab === 'ForYou' ? styles.navigatorActiveTabTitle : {}]}>Selecionados</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setCurrentTab('Following')}>
          <View style={styles.navigatorTabContainer}>
            <Text style={[styles.navigatorTabTitle, currentTab === 'Following' ? styles.navigatorActiveTabTitle : {}]}>
              Seguindo
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        style={{ height: '100%' }}
        data={posts}
        renderItem={({ item }) => renderPost(item)}

      />
      <TouchableOpacity
        style={{ position: 'absolute', marginTop: '180%', left: '85%' }}
        activeOpacity={0.75}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <View style={styles.addPostIconContainer}>
          <Text style={styles.addPostIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {

  },
  headerContainer: {
    paddingLeft: GlobalStyles.paddingLeft,
    paddingRight: GlobalStyles.paddingRight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
  navigatorContainer: {
    marginTop: 16,
    borderRadius: 5,
    padding: 4,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigatorTabContainer: {
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navigatorTabTitle: {
    paddingTop: 8,
    paddingBottom: 8,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#b7b7b7',
  },
  navigatorActiveTabTitle: {
    backgroundColor: 'white',
    color: 'black',
  },
  addPostIconContainer: {
    position: 'absolute',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 50,
    backgroundColor: 'black',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addPostIcon: {
    color: 'white',
    fontSize: 32,
  },
  postContainer: {
    marginTop: 16,
    paddingLeft: GlobalStyles.paddingLeft,
    paddingRight: GlobalStyles.paddingRight,
    paddingBottom: 16,
    borderBottomWidth: 5,
    borderColor: '#f0f0f0',
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
  postContent: {
    marginTop: 8,
    textAlign: 'justify',
    color: '#181818',
  },
  postStatisticsContainer: {
    marginTop: 8,
  },
  postStatistics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatisticsIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  }
});
