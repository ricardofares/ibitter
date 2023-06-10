import React, { useState, useContext, useEffect } from 'react';
import GlobalStyles from '../../styles';
import axios from 'axios';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import { IbitterContext } from '../providers/IbitterProvider';

export default function Timeline({ navigation }) {
	const { state } = useContext(IbitterContext);
	const [posts, setPosts] = useState([]);
	const [currentTab, setCurrentTab] = useState('ForYou');

	useEffect(() => {
		const loadPosts = async () => {
			try {
				const postResponse = await axios.get(`http://192.168.100.55:5000/posts?username=${state.user.username}`);

				// Updates the posts.
				setPosts(postResponse.data);
			} catch (e) {
				// Check if the back-end is offline. If so, then an alert will be shown to
				// the user informing it.
				if (e.message === 'Network Error') {
					Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
					return;
				}
			}

		};

		/// \brief Load the posts from the database using the API.
		loadPosts();
	}, [state.lastTimelineUpdate]);

	return (
		<View style={styles.mainContainer}>
			<View style={styles.headerContainer}>
				<Image
					style={styles.userIcon}
					source={require('../../assets/images/Photo.png')}
				/>
				<Text style={styles.headerTitle}>{state.user.username || 'Username Placeholder'}</Text>
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
				renderItem={({ item }) => <Text>{item.content}</Text>}
				ListHeaderComponent={
					<TouchableOpacity
						style={{ position: 'absolute', marginTop: '160%', left: '85%' }}
						activeOpacity={0.75}
						onPress={() => navigation.navigate('CreatePost')}
					>
						<View style={styles.addPostIconContainer}>
							<Text style={styles.addPostIcon}>+</Text>
						</View>
					</TouchableOpacity>
				}
				stickyHeaderIndices={[0]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		paddingLeft: GlobalStyles.paddingLeft,
		paddingRight: GlobalStyles.paddingRight,
	},
	headerContainer: {
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
		borderRadius: '100%',
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
	}


});
