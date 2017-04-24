import Voting from './voting';

export default function reducer(state = Voting.getInitialState(), action) {
    switch (action.type) {
        case 'SET_SEATS':
            return Voting.createTournament(state, action.seats);
        case 'NEXT':
            return Voting.getNextMatch(state);
        case 'VOTE':
            return Voting.vote(state, action.entry)
    }
    return state;
}
