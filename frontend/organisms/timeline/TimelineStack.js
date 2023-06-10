import React from 'react';
import Timeline from './Timeline';
import CreatePost from './CreatePost';
import GlobalStyles from '../../styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function TimelineStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				headerShadowVisible: false,
				contentStyle: {
					backgroundColor: GlobalStyles.secondaryColor,
				}
			}}
		>
			<Stack.Screen name="Timeline" component={Timeline} />
			<Stack.Screen name="CreatePost" component={CreatePost} />
		</Stack.Navigator>
	);
}
