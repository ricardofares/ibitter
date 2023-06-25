import GlobalConfig from '../../../config';
import GlobalStyles from "../../../styles"
import Header from "../../../molecules/Header";
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { IbitterContext } from '../../providers/IbitterProvider';
import { StyleSheet, View, Image, TouchableWithoutFeedback, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import CourseImage from '../../../atoms/CourseImage';
import PostStatistics from '../../../molecules/PostStatistics';
import RepliedContent from '../RepliedContent';
import { timeDiff } from '../../../utils';
import Button from '../../../atoms/Button';

export default function User({ navigation, route }) {
    const { choosenUser } = route.params;
    const { state, dispatch } = useContext(IbitterContext);
    const [posts, setPosts] = useState([])
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        const loadUserPosts = async () => {
            try {
                // Send a GET request to the API endpoint to retrieve all the posts
                const postResponse = await axios.get(`${GlobalConfig.apiUrl}/posts?username=${choosenUser}`)

                // Send a GET request to thte API endpoint to retrieve all the likes made by this user.
                const likesResponse = await axios.get(`${GlobalConfig.apiUrl}/getlike?username=${choosenUser}`)

                for (const post of postResponse.data) {
                    post.i_liked = false;

                    for (const likes of likesResponse.data)
                        if (post.id === likes.post_id)
                            post.i_liked = true;
                }

                // Update the state of the component with the received post data.
                setPosts(postResponse.data.filter(post => post.username === choosenUser));
            } catch (e) {
                // Display an alert to the user informing them about the server being offline.
                if (e.message === 'Network Error') {
                    Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
                    return;
                }

                /// Catch unexpected error.
                console.error(e);
            }

        };

        checkFollowingStatus();
        loadUserPosts();
    }, [])

    const checkFollowingStatus = async () => {
        try {
            const followersResponse = await axios.get(`${GlobalConfig.apiUrl}/followers?username=${state.user.username}`);

            for (const f of followersResponse.data) {
                if (f.followed === choosenUser) {
                    setFollowing(true);
                    return;
                }
            }
        } catch (e) {
            // Display an alert to the user informing them about the server being offline.
            if (e.message === 'Network Error') {
                Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
                return;
            }
        }

        setFollowing(false);
    }

    const unfollow = async () => {
        try {
            const followResponse = await axios.post(`${GlobalConfig.apiUrl}/unfollow?follower=${state.user.username}&followed=${choosenUser}`);

            setFollowing(false)
        } catch (e) {
            // Display an alert to the user informing them about the server being offline.
            if (e.message === 'Network Error') {
                Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
                return;
            }

            /// Catch unexpected error.
            console.error(e);
        }
    }

    const follow = async () => {
        try {
            if (!choosenUser !== state.user.username) {
                const followResponse = await axios.post(`${GlobalConfig.apiUrl}/follow?follower=${state.user.username}&followed=${choosenUser}`);
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
                <TouchableOpacity onPress={() => navigation.navigate('User', { choosenUser: post.username })}>
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
                    {renderPostContent(post.content)}
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
                username={choosenUser}
                navigation={navigation}
            />
            <FlatList
                ListHeaderComponent={
                    state.user.username !== choosenUser ?
                        (following ?
                            <View style={{ padding: 16 }}><Button text="Desseguir" onPress={unfollow} /></View> :
                            <View style={{ padding: 16 }}><Button text="Seguir" onPress={follow} /></View>)
                        : <></>
                }
                data={posts}
                renderItem={({ item }) => renderPost(item)}
                // @Hack A hack to allow the user to scroll down until reach the bottom of the last post.
                //       Without that the user also can reach the last post, however, to reach the bottom
                //       of it is needed a scroll up.
                ListFooterComponent={<Text>{"\n\n"}</Text>}
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
    postImage: {
        width: '85%',
        height: 400,
        resizeMode: 'stretch',
        marginLeft: 40,
        borderRadius: 10,
    },
});
