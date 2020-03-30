import * as React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Home from './screens/Home'
import 'react-native-gesture-handler';
import Comments from './screens/Comments'
import CommentsPopUp from './screens/CommentsPopUp'
import PostDetail from './screens/PostDetail'
import SharePost from './screens/SharePost'
import PostOptions from './screens/PostOptions'
import { navigationRef } from './rootNavigation'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios'
import GroupScreen from './screens/GroupTab'
import NotificationScreen from './screens/NotificationTab'
import WatchScreen from './screens/WatchTab'
import WatchDetailList from './screens/WatchTab/WatchDetailList'
import WatchOptions from './screens/WatchTab/WatchOptions'
import WatchSearch from './screens/Search/WatchSearch'
import WatchDetail from './screens/WatchTab/WatchDetail';
import ShortCutScreen from './screens/ShortCutTab'
import ProfileScreen from './screens/ProfileTab'
import StoryDetailScreen from './screens/StoryDetail'
import GroupSearch from './screens/Search/GroupSearch'
import GroupCategory from './screens/GroupTab/GroupCategory'
import GroupCategories from './screens/GroupTab/GroupCategories'
import GroupProfile from './screens/GroupTab/Group'

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();
import { FullPostTool, CheckIn, PhotoUploader, LiveStream } from './screens/PostTools/'
import { Platform } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll'
import { BASE_URL } from './constants'
import SeenVideos from './screens/WatchTab/SeenVideos';


axios.defaults.baseURL = BASE_URL

const homeTab = () => {
	// CameraRoll.getPhotos({
	// 	first: 20,
	// 	assetType: 'Photos',
	// }).then(result => {
	// 	console.log(result)
	// })
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS, gestureResponseDistance: { vertical: 800 } }}>
			<Stack.Screen name="Home" component={Home} />

			<Stack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="Comments" component={Comments} />
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
const WatchScreenWithIsFocused = (props) => {
	const isFocused = useIsFocused();
	return <WatchScreen {...props} isFocused={isFocused}></WatchScreen>;
}
const watchTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Watch" component={WatchScreenWithIsFocused} />
		</Stack.Navigator>
	)
}
const profileTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Profile" component={ProfileScreen} />
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
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='user-circle' size={22} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Profile" component={profileTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='bell' size={22} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Notification" component={notificationTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='bars' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="ShortCut" component={shortCutTab} />
		</Tab.Navigator>

	);
}
function App() {
	const TransitionPreset = Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {}
	const navigationOptions = {
		headerShown: false,
		...TransitionPreset,
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
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="WatchOptions" component={WatchOptions} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="WatchSearch" component={WatchSearch} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="SeenVideos" component={SeenVideos} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="WatchDetail" component={WatchDetail} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="WatchDetailList" component={WatchDetailList} />
					<rootStack.Screen options={{ gestureEnabled: false }}
						name="GroupCategory" component={GroupCategory} />
					<rootStack.Screen options={{ gestureEnabled: false }}
						name="GroupCategories" component={GroupCategories} />
					<rootStack.Screen options={{ gestureEnabled: false }}
						name="GroupSearch" component={GroupSearch} />
					<rootStack.Screen options={{ gestureEnabled: false }}
						name="GroupProfile" component={GroupProfile} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="CommentsPopUp" component={CommentsPopUp} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="SharePost" component={SharePost} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="PostOptions" component={PostOptions} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="FullPostTool" component={FullPostTool} />
					<rootStack.Screen name="CheckIn" component={CheckIn} />
					<rootStack.Screen name="PhotoUploader" component={PhotoUploader} />
					<rootStack.Screen name="LiveStream" component={LiveStream} />
				</rootStack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
export default App;