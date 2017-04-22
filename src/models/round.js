import {Map, List} from 'immutable';

export default () => {
    return Map({
            vote: Map({
                seats: List(),
                tally: Map()
            }),
            round: Map({
                entrys: List(),
                winner: ''
            }),
            currentRound: 'quarterFinals'
        });
};
