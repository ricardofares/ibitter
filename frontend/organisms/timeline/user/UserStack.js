import { createNativeStackNavigator } from "@react-navigation/native-stack";
import User from './User';

const Stack = createNativeStackNavigator();

export default function UserStack() {
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
            <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
    );
}
