import {Map, List} from 'immutable';

export default () => {
    return Map({
            vote: Map({
                seats: List(),
                tally: Map()
            }),
            round: Map({
                quarterFinals: List(),
                simiFinals: List(),
                finals: List(),
                winner: List()
            }),
            videoSource: '',
            vidSourceSwap: false,
            timer: '',
            timerLen: '',
            votingDisabled: false,
            currentRound: 'quarterFinals'
        });
};
