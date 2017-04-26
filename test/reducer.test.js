import {Map, List} from 'immutable';
import Reducer from '../src/reducer';
import Tournament from '../src/models/tournament';

describe('reducer', () => {
    it('handels SET_SEATS', () => {
        const state = Tournament();
        const seats = [
            'Artist One',
            'Artist Two',
            'Artist Three',
            'Artist Four',
            'Artist Five',
            'Artist Six',
            'Artist Seven',
            'Artist Eight'
        ];
        const action = {type: 'SET_SEATS', seats: seats};
        const nextState = new Reducer(state, action);

        expect(nextState).toEqual(Map({
            vote: Map({
                seats: List(),
                tally: Map()
            }),
            round: Map({
                quarterFinals: List.of(
                    'Artist One',
                    'Artist Two',
                    'Artist Three',
                    'Artist Four',
                    'Artist Five',
                    'Artist Six',
                    'Artist Seven',
                    'Artist Eight'
                ),
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
        }));
    });

    it('handels NEXT', () => {
        const state = Map({
            vote: Map({
                seats: List.of(
                    'Artist One',
                    'Artist Two'
                    ),
                tally: Map({
                    'Artist One': 1,
                    'Artist Two': 2,
                })
            }),
            round: Map({
                quarterFinals: List.of(
                    'Artist Three',
                    'Artist Four',
                    'Artist Five',
                    'Artist Six',
                    'Artist Seven',
                    'Artist Eight'
                ),
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
        const action = {type: 'NEXT'};
        const nextState = new Reducer(state, action);

        expect(nextState).toEqual(Map({
            vote: Map({
                seats: List.of(
                    'Artist Three',
                    'Artist Four'
                    ),
                tally: Map()
            }),
            round: Map({
                quarterFinals: List.of(
                    'Artist Five',
                    'Artist Six',
                    'Artist Seven',
                    'Artist Eight'
                ),
                simiFinals: List.of(
                    'Artist Two'
                ),
                finals: List(),
                winner: List()
            }),
            videoSource: '',
            vidSourceSwap: false,
            timer: '',
            timerLen: '',
            votingDisabled: false,
            currentRound: 'quarterFinals'
        }));
    });

    it('handels VOTE', () => {
        const state = Map({
            vote: Map({
                seats: List.of(
                    'Artist One',
                    'Artist Two'
                    ),
                tally: Map()
            }),
            round: Map({
                quarterFinals: List.of(
                    'Artist Three',
                    'Artist Four',
                    'Artist Five',
                    'Artist Six',
                    'Artist Seven',
                    'Artist Eight'
                ),
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
        const action = {type: 'VOTE', entry: 'Artist One'};
        const nextState = new Reducer(state, action);

        expect(nextState).toEqual(Map({
            vote: Map({
                seats: List.of(
                    'Artist One',
                    'Artist Two'
                    ),
                tally: Map({
                    'Artist One': 1
                })
            }),
            round: Map({
                quarterFinals: List.of(
                    'Artist Three',
                    'Artist Four',
                    'Artist Five',
                    'Artist Six',
                    'Artist Seven',
                    'Artist Eight'
                ),
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
        }));
    });

    it('has an initial state', () => {
        const seats = [
            'Artist One',
            'Artist Two',
            'Artist Three',
            'Artist Four',
            'Artist Five',
            'Artist Six',
            'Artist Seven',
            'Artist Eight'
        ];
        const action = {type: 'SET_SEATS', seats: seats};
        const nextState = Reducer(undefined, action);

        expect(nextState).toEqual(Map({
            vote: Map({
                seats: List(),
                tally: Map()
            }),
            round: Map({
                quarterFinals: List.of(
                    'Artist One',
                    'Artist Two',
                    'Artist Three',
                    'Artist Four',
                    'Artist Five',
                    'Artist Six',
                    'Artist Seven',
                    'Artist Eight'
                ),
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
        }));
    });

    it('can be used with reduce', () => {
        const seats = [
            'Artist One',
            'Artist Two',
            'Artist Three',
            'Artist Four',
            'Artist Five',
            'Artist Six',
            'Artist Seven',
            'Artist Eight'
        ];
        const actions = [
            {type: 'SET_SEATS', seats: seats},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Artist Two'},
            {type: 'VOTE', entry: 'Artist One'},
            {type: 'VOTE', entry: 'Artist Two'},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Artist Three'},
            {type: 'VOTE', entry: 'Artist Four'},
            {type: 'VOTE', entry: 'Artist Four'},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Artist Five'},
            {type: 'VOTE', entry: 'Artist Six'},
            {type: 'VOTE', entry: 'Artist Six'},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Artist Seven'},
            {type: 'VOTE', entry: 'Artist Eight'},
            {type: 'VOTE', entry: 'Artist Eight'},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Artist Two'},
            {type: 'VOTE', entry: 'Artist Four'},
            {type: 'VOTE', entry: 'Artist Four'},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Artist Six'},
            {type: 'VOTE', entry: 'Artist Eight'},
            {type: 'VOTE', entry: 'Artist Eight'},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Artist Four'},
            {type: 'VOTE', entry: 'Artist Eight'},
            {type: 'VOTE', entry: 'Artist Eight'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(Reducer, Tournament());

        expect(finalState).toEqual(Map({
                vote: Map({
                    seats: List(),
                    tally: Map()
                }),
                round: Map({
                    quarterFinals: List(),
                    simiFinals: List(),
                    finals: List(),
                    winner: List.of('Artist Eight')
                }),
                videoSource: '',
                vidSourceSwap: false,
                timer: '',
                timerLen: '',
                votingDisabled: false,
                currentRound: 'winner'
            }));
    });
});