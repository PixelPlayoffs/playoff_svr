import {Map, List} from 'immutable';
import Reducer from '../src/reducer';
import Tournament from '../models/tournament';

describe('reducer', () => {
    it('handels SET_ENTRIES', () => {
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
        const action = {type: 'SET_ENTRIES', seats: seats};
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
            currentRound: 'quarterFinals'
        });
        const action = {type: 'VOTE', seat: 'Artist One'};
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
        const action = {type: 'SET_ENTRIES', seats: seats};
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
            {type: 'SET_ENTRIES', seats: seats},
            {type: 'NEXT'},
            {type: 'VOTE', seat: 'Artist One'},
            {type: 'VOTE', seat: 'Artist Two'},
            {type: 'VOTE', seat: 'Artist Two'},
            {type: 'NEXT'},
            {type: 'VOTE', seat: 'Artist Three'},
            {type: 'VOTE', seat: 'Artist Four'},
            {type: 'VOTE', seat: 'Artist Four'},
            {type: 'NEXT'},
            {type: 'VOTE', seat: 'Artist Five'},
            {type: 'VOTE', seat: 'Artist Six'},
            {type: 'VOTE', seat: 'Artist Six'},
            {type: 'NEXT'},
            {type: 'VOTE', seat: 'Artist Seven'},
            {type: 'VOTE', seat: 'Artist Eight'},
            {type: 'VOTE', seat: 'Artist Eight'},
            {type: 'NEXT'},
            {type: 'VOTE', seat: 'Artist Two'},
            {type: 'VOTE', seat: 'Artist Four'},
            {type: 'VOTE', seat: 'Artist Four'},
            {type: 'NEXT'},
            {type: 'VOTE', seat: 'Artist Six'},
            {type: 'VOTE', seat: 'Artist Eight'},
            {type: 'VOTE', seat: 'Artist Eight'},
            {type: 'NEXT'},
            {type: 'VOTE', seat: 'Artist Four'},
            {type: 'VOTE', seat: 'Artist Eight'},
            {type: 'VOTE', seat: 'Artist Eight'},
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
                currentRound: 'winner'
            }));
    });
});