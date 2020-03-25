import { videoControlActions } from '../constants'
export const SetWatchingVideo = (playingId, isPlaying = true) => {
    const payload = {
        playingId,
        isPlaying
    }
    return {
        type: videoControlActions.SET_WATCHING_VIDEO,
        payload
    }
}
export const SetFixedHeighWatchingVideo = (height) => {
    const payload = {
        fixedHeightWatchVideo: height
    }
    return {
        type: videoControlActions.SET_FIXED_HEIGH_WATCHING_VIDEO,
        payload
    }
}
export const ResetWatchingStatus = () => {
    return {
        type: videoControlActions.RESET_WATCHING_STATUS,
    }
}

