export function setState(state) {
    return {type: 'SET_SEATS', state};
}

export function vote(entry) {
    return {meta: {remote: true}, type: 'VOTE', entry};
}

export function next() {
    return {meta: {remote: true}, type: 'NEXT'}
}

export function disableVote() {
    return {meta: {remote: true}, type: 'DISABLE_VOTE'};
}

export function swapVideoUrl(url) {
    return {meta: {remote: true}, type: 'SWAP_VIDEO', url};
}

export function setTimer(count) {
    return {meta: {remote: true}, type: 'TIMER', count}
}

export function setTimerLen(length) {
    return {meta: {remote: true}, type: 'TIMER_LEN', length}
}

export function persistSetState(state) {
    return dispatch => {
        // TODO: write to SB
        dispatch(setState(state));
    }
}

export function persistVote(entry) {
    return dispatch => {
        // TODO: write to SB
        dispatch(vote(entry));
    }
}

export function persistNext() {
    return dispatch => {
        // TODO: write to SB
        dispatch(next());
    }
}

export function persistDisableVote() {
    return dispatch => {
        // TODO: write to SB
        dispatch(disableVote());
    }
}

export function persistSwapVideoUrl(url) {
    return dispatch => {
        // TODO: write to SB
        dispatch(swapVideoUrl(url));
    }
}

export function persistSetTimer(count) {
    return dispatch => {
        // TODO: write to SB
        dispatch(setTimer(count));
    }
}

export function persistSetTimerLen(length) {
    return dispatch => {
        // TODO: write to SB
        dispatch(setTimerLen(length));
    }
}
