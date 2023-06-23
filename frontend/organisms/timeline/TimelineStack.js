import React from 'react';
import GlobalStyles from '../../styles';
import Timeline from './Timeline';
import CreatePost from './CreatePost';
import Reply from './Reply';
import ChatList from './chat/ChatList';
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
			<Stack.Screen name="Reply" component={Reply} />
			<Stack.Screen name="ChatList" component={ChatList} />
		</Stack.Navigator>
	);
}
