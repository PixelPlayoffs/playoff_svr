import {Map, List} from 'immutable';
import Store from '../src/store';
import Tournament from '../models/tournament';

describe('store', () => {
    it('is a Redux store configured with the correct reducer', () => {
        const store = Store.makeStore();
        expect(store.getState()).toEqual(Tournament());

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
        store.dispatch({type: 'SET_SEATS', seats: seats});

        expect(store.getState()).toEqual(Map({
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
});
