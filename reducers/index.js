import { combineReducers } from 'redux'
import storiesReducer from './storiesReducer'
import userReducer from './userReducer'
import postsReducer from './postsReducer'
import showingStoryReducer from './showingStoryReducer'
import postDetailReducer from './postDetailReducer'
import recommendFriendsReducer from './friendsReducer'
import bgColorsReducer from './bgColorsReducer'
import systemImagesReducer from './systemImagesReducer'
import groupsReducer from './groupsReducer'
import groupPostsReducer from './groupPostsReducer'
import groupCategoriesReducer from './groupCategoriesReducer'
import historyReducer from './historyReducer'
import groupDetailReducer from './groupDetailReducer'
import categoryGroupListReducer from './categoryGroupListReducer'
import watchVideosReducer from './watchVideosReducer'
import videoControlReducer from './videoControlReducer'
import watchSearchRecommendsReducer from './watchSearchRecommendsReducer'
import userXreducer from './userXreducer'
import notificationsReducer from './notificationsReducer'
import searchResultReducer from './searchResultReducer'
import productsReducer from './productsReducer'
import pageDetailReducer from './pageReducer'
const rootReducer = combineReducers({
    stories: storiesReducer,
    user: userReducer,
    posts: postsReducer,
    showingStory: showingStoryReducer,
    showingPost: postDetailReducer,
    friends: recommendFriendsReducer,
    bgColors: bgColorsReducer,
    systemImages: systemImagesReducer,
    groups: groupsReducer,
    groupPosts: groupPostsReducer,
    groupCategories: groupCategoriesReducer,
    history: historyReducer,
    groupDetail: groupDetailReducer,
    categoryGroupList: categoryGroupListReducer,
    watch: watchVideosReducer,
    videoControl: videoControlReducer,
    watchSearchRecommends: watchSearchRecommendsReducer,
    userX: userXreducer,
    notifications: notificationsReducer,
    searchResult: searchResultReducer,
    marketplaceProducts: productsReducer,
    page: pageDetailReducer
})
export default rootReducer