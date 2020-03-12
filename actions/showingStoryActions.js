import { showingStoryActions } from '../constants'
export const SetShowingStoryRequest = (story, position, justclosed = false) => {
    return (dispatch) => {
        const showingStory = {
            ...story,
            position,
            justclosed
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
