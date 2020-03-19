import { combineReducers } from 'redux'
import storiesReducer from './storiesReducer'
import userReducer from './userReducer'
import postsReducer from './postsReducer'
import showingStoryReducer from './showingStoryReducer'
import postDetailReducer from './postDetailReducer'
import recommandFriendsReducer from './recommandFriendsReducer'
import bgColorsReducer from './bgColorsReducer'
const rootReducer = combineReducers({
    stories: storiesReducer,
    user: userReducer,
    posts: postsReducer,
    showingStory: showingStoryReducer,
    showingPost: postDetailReducer,
    recommandFriends: recommandFriendsReducer,
    bgColors: bgColorsReducer
})
export default rootReducer