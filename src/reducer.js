import Voting from './voting';

export default function reducer(state = Voting.getInitialState(), action) {
    switch (action.type) {
        case 'SET_SEATS':
            return Voting.createTournament(state, action.seats);
        case 'NEXT':
            return Voting.getNextMatch(state);
        case 'VOTE':
            return Voting.vote(state, action.entry);
        case 'DISABLE_VOTE':
            return Voting.disableVoting(state);
        case 'SWAP_VIDEO':
            return Voting.swapVideoUrl(state, action.url);
        case 'TIMER':
            return Voting.setTimer(state, action.count);
        case 'TIMER_LEN':
            return Voting.setTimerLen(state, action.length);
    }
    return state;
}
