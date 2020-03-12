import { combineReducers } from 'redux'
import storiesReducer from './storiesReducer'
import userReducer from './userReducer'
import postsReducer from './postsReducer'
import showingStoryReducer from './showingStoryReducer'
const rootReducer = combineReducers({
    stories: storiesReducer,
    user: userReducer,
    posts: postsReducer,
    showingStory: showingStoryReducer
})
export default rootReducer