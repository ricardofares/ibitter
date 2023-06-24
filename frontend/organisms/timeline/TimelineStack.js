import React from 'react';
import GlobalStyles from '../../styles';
import Timeline from './Timeline';
import CreatePost from './CreatePost';
import Reply from './Reply';
import ChatList from './chat/ChatList';
import Chat from './chat/Chat';
import SendMessage from './chat/SendMessage';
import Configuration from './configuration/Configuration';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function TimelineStack({ navigation }) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				headerShadowVisible: false,
				contentStyle: {
					backgroundColor: GlobalStyles.secondaryColor,
				},
			}}
		>
			<Stack.Screen name="Timeline" component={Timeline} initialParams={{ drawerNavigation: navigation }} />
			<Stack.Screen name="CreatePost" component={CreatePost} initialParams={{ drawerNavigation: navigation }} />
			<Stack.Screen name="Reply" component={Reply} initialParams={{ drawerNavigation: navigation }} />
			<Stack.Screen name="ChatList" component={ChatList} initialParams={{ drawerNavigation: navigation }} />
			<Stack.Screen name="Chat" component={Chat} initialParams={{ drawerNavigation: navigation }} />
			<Stack.Screen name="SendMessage" component={SendMessage} initialParams={{ drawerNavigation: navigation }} />
			<Stack.Screen name="Configuration" component={Configuration} initialParams={{ drawerNavigation: navigation }} />
		</Stack.Navigator>
	);
}
