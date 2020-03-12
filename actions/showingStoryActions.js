import { showingStoryActions } from '../constants'
export const SetShowingStoryRequest = (story, position) => {
    return (dispatch) => {
        const showingStory = {
            ...story,
            position,
        }
        dispatch(SetShowingStorySuccess(showingStory))
    }
}
const FetchDefaultState = () => {
    return {
        type: showingStoryActions.SET_SHOWING_STORY_REQUEST,
    }
}
export const SetShowingStorySuccess = (story) => {
    return {
        type: showingStoryActions.SET_SHOWING_STORY,
        payload: story
    }
}
