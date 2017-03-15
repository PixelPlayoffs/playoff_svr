/*
    Intent:     This file contains core voting logic and state tests.
    Author:     @tripdubroot
*/

import {List, Map} from 'immutable';
import Voting from '../src/voting';

describe('voting logic', () => {
    describe('setCurrentVoteSeats', () => {
        it('adds the seats to the state', ()=>{
            const state = Map();
            const seats = List.of('Artist One', 'Artist Two');
            const nextState = Voting.setCurrentVoteSeats(state, seats);

            expect(nextState).toEqual(Map({
                currentSeats: List.of('Artist One', 'Artist Two')
            }));
        });

        it('converst to immutable', () => {
            const state = Map();
            const seats = ['Artist One', 'Artist Two'];
            const nextState = Voting.setCurrentVoteSeats(state, seats);

            expect(nextState).toEqual(Map({
                currentSeats: List.of('Artist One', 'Artist Two')
            }));
        });
    });
});
