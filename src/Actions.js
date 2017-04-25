export function setState(state) {
    return {type: 'SET_SEATS', state};
}

export function vote(entry) {
    return {meta: {remote: true}, type: 'VOTE', entry};
}

export function next() {
    return {meta: {remote: true}, type: 'NEXT'}
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