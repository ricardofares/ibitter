import React from 'react';
import IbitterStackScreen from '../../atoms/stack/IbitterStackScreen';
import { StyleSheet, View, Text } from 'react-native';

export default function CreatePost({ navigation }) {
	return (
		<IbitterStackScreen navigation={navigation}>
			<Text>Create Post</Text>
		</IbitterStackScreen>
	);
}

const styles = StyleSheet.create({
});
