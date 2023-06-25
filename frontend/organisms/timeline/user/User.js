import GlobalConfig from '../../../config';
import GlobalStyles from "../../../styles"
import Header from "../../../molecules/Header";
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { IbitterContext } from '../../providers/IbitterProvider';
import { StyleSheet, View, Image, TouchableWithoutFeedback, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import CourseImage from '../../../atoms/CourseImage';
import PostStatistics from '../../../molecules/PostStatistics';
import RepliedContent from '../RepliedContent';
import { timeDiff } from '../../../utils';
import Button from '../../../atoms/Button';

export function goToUserPage(state, username, navigation) {
    state.choosenUser = username
    navigation.navigate('User')
}

export default function User({ navigation }) {
    const { state, dispatch } = useContext(IbitterContext);
    const [posts, setPosts] = useState([])
    const [following, setFollowing] = useState(false)

    function postIsFromUser(post) {
        return (post.username === state.choosenUser)
    }

    useEffect(() => {
        const loadUserPosts = async () => {
            try {
                // Send a GET request to the API endpoint to retrieve all the posts
                const postResponse = await axios.get(`${GlobalConfig.apiUrl}/posts?username=${state.choosenUser}`)

                // Send a GEET request to thte API endpoint to retrieve all the likes made by this user.
                const likesResponse = await axios.get(`${GlobalConfig.apiUrl}/getlike?username=${state.choosenUser}`)
                for (const post of postResponse.data) {
                    post.i_liked = false;

                    for (const likes of likesResponse.data)
                        if (post.id === likes.post_id)
                            post.i_liked = true;
                }

                // Update the state of the component with the received post data.
                setPosts(postResponse.data.filter(postIsFromUser));
            } catch (e) {
                // Display an alert to the user informing them about the server being offline.
                if (e.message === 'Network Error') {
                    Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
                    return;
                }
            }

        };

        setFollowing(isFollowed())
        loadUserPosts()
    }, [])

  const isFollowed = async () => {
      try {
        const followersResponse = await axios.get(`${GlobalConfig.apiUrl}/followers?username=${state.user.username}`);

        for (const f of followersResponse.data) {
            if (f.followed === state.choosenUser) {
                return true
            }
        }
      } catch (e) {
        // Display an alert to the user informing them about the server being offline.
        if (e.message === 'Network Error') {
          Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
          return;
        }
      }
      return false
  }

  const unfollow = async () => {
      try {
          if (!state.choosenUser !== state.user.username) {
              const followResponse = await axios.post(`${GlobalConfig.apiUrl}/unfollow?follower=${state.user.username}&followed=${state.choosenUser}`);
              setFollowing(false)
          }
      } catch (e) {
        // Display an alert to the user informing them about the server being offline.
        if (e.message === 'Network Error') {
          Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
          return;
        }
      }
  }

  const follow = async () => {
      try {
          if (!state.choosenUser !== state.user.username) {
              const followResponse = await axios.post(`${GlobalConfig.apiUrl}/follow?follower=${state.user.username}&followed=${state.choosenUser}`);
              setFollowing(true)
          }
      } catch (e) {
        // Display an alert to the user informing them about the server being offline.
        if (e.message === 'Network Error') {
          Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
          return;
        }
      }
  }

    const renderPost = post =>
        <View style={styles.postContainer}>
            {
                post.retweet_of !== null ?
                    <View style={{
                        marginLeft: 40,
                        marginBottom: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{ width: 18, height: 18 }}
                            source={require('../../../assets/images/retweet.png')}
                        />
                        <Text style={{ marginLeft: 4, color: '#5e6573', fontSize: 12, fontWeight: 'bold' }}>{post.name} Rebeetou</Text>
                    </View>
                    : <></>
            }
            <View style={styles.postHeaderContainer}>
                <TouchableOpacity onPress={() => goToUserPage(state, post.username, navigation)}>
                    <CourseImage username={post.username} />
                </TouchableOpacity>
                <View style={{ marginLeft: 8, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.postHeaderName}>{post.name}</Text>
                        <Text style={styles.postHeaderTime}>&#8226; {timeDiff(post.posted_at, new Date())}</Text>
                    </View>
                    <Text style={styles.postHeaderUsername}>@{post.username}</Text>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Reply', { post })}>
                <View>
                    <Text style={styles.postContent}>{post.content}</Text>
                </View>
            </TouchableWithoutFeedback>
            {post.reply_to ?
                <RepliedContent navigation={navigation} repliedPostId={post.reply_to} />
                :
                <></>
            }
            <PostStatistics navigation={navigation} state={state} dispatch={dispatch} post={post} />
        </View>;


    return (
        <View style={styles.mainContainer}>
            <Header
                username={state.choosenUser}
                navigation={navigation}
            />
            <FlatList
                ListHeaderComponent={
                    state.user.username !== state.choosenUser ?
        (following ?
            <Button text="Desseguir" onPress={unfollow} /> :
            <Button text="Seguir" onPress={follow} />)
                    : <></>
                }
                data={posts}
                renderItem={({ item }) => renderPost(item)}
                // @Hack A hack to allow the user to scroll down until reach the bottom of the last post.
                //       Without that the user also can reach the last post, however, to reach the bottom
                //       of it is needed a scroll up.
                ListFooterComponent={
                    <>
                        <Text>{"\n\n"}</Text>
                        <ActivityIndicator style={{ padding: 16 }} />
                    </>
                }
            />
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
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingLeft: 42,
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'justify',
        color: '#181818',
    },
    postStatisticsContainer: {
    },
    postStatistics: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postStatisticsIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
});
