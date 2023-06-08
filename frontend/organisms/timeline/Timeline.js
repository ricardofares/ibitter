import React, { useState } from 'react';
import GlobalStyles from '../../styles';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Timeline() {
	const [currentTab, setCurrentTab] = useState('ForYou');

	return (
		<View style={styles.mainContainer}>
			<View style={styles.headerContainer}>
				<Image
					style={styles.userIcon}
					source={require('../../assets/images/Photo.png')}
				/>
				<Text style={styles.headerTitle}>Nome do Usuário</Text>
				<Image
					style={styles.sendIcon}
					source={require('../../assets/images/send.png')}
				/>
			</View>
			<View style={styles.navigatorContainer}>
				<View style={styles.navigatorTabContainer}>
					<Text
						style={[styles.navigatorTabTitle, currentTab === 'ForYou' ? styles.navigatorActiveTabTitle : {}]}
						onPress={() => setCurrentTab('ForYou')}
					>
						Selecionados
					</Text>
				</View>
				<View style={styles.navigatorTabContainer}>
					<Text style={[styles.navigatorTabTitle, currentTab === 'Following' ? styles.navigatorActiveTabTitle : {}]}
						onPress={() => setCurrentTab('Following')}
					>
						Seguindo
					</Text>
				</View>
			</View>
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

});
