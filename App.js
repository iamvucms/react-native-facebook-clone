import * as React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Home from './screens/Home'
import Comments from './screens/Comments'
import CommentsPopUp from './screens/CommentsPopUp'
import PostDetail from './screens/PostDetail'
import SharePost from './screens/SharePost'
import { navigationRef } from './rootNavigation'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios'
import GroupScreen from './screens/GroupTab'
import NotificationScreen from './screens/NotificationTab'
import WatchScreen from './screens/WatchTab'
import ShortCutScreen from './screens/ShortCutTab'
import StoryDetailScreen from './screens/StoryDetail'
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();
import { FullPostTool, CheckIn, PhotoUploader, LiveStream } from './screens/PostTools/'

axios.defaults.baseURL = 'http://192.168.1.3:3000'

const homeTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS, gestureResponseDistance: { vertical: 800 } }}>
			<Stack.Screen name="Home" component={Home} />

			<Stack.Screen name="Comments" component={Comments} />
		</Stack.Navigator>
	)
}

const groupTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Group" component={GroupScreen} />
		</Stack.Navigator>
	)
}
const watchTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Watch" component={WatchScreen} />
		</Stack.Navigator>
	)
}
const notificationTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Notification" component={NotificationScreen} />
		</Stack.Navigator>
	)
}
const shortCutTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ShortCutIndex" component={ShortCutScreen} />
		</Stack.Navigator>
	)
}
const MainTab = () => {
	const navigationOptions = {
		style: {
			paddingTop: 44
		},
		showIcon: true,
		showLabel: false,
	}
	return (
		<Tab.Navigator tabBarOptions={navigationOptions}>
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='home' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Home" component={homeTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='users' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Group" component={groupTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='video' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Watch" component={watchTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='bell' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Notification" component={notificationTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='bars' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="ShortCut" component={shortCutTab} />
		</Tab.Navigator>

	);
}
function App() {
	const navigationOptions = {
		headerShown: false,
		...TransitionPresets.ModalSlideFromBottomIOS,
		gestureResponseDistance: {
			vertical: 800
		}
	}
	return (
		<Provider store={store}>
			<NavigationContainer ref={navigationRef} >
				<rootStack.Navigator screenOptions={navigationOptions}>
					<rootStack.Screen component={MainTab} name="MainTab" />
					<rootStack.Screen name="StoryDetail" component={StoryDetailScreen} />
					<rootStack.Screen name="PostDetail" component={PostDetail} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="CommentsPopUp" component={CommentsPopUp} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="SharePost" component={SharePost} />
					<rootStack.Screen name="FullPostTool" component={FullPostTool} />
					<rootStack.Screen name="CheckIn" component={CheckIn} />
					<rootStack.Screen name="PhotoUploader" component={PhotoUploader} />
					<rootStack.Screen name="LiveStream" component={LiveStream} />
				</rootStack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
export default App;