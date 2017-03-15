/*
    Intent:     This file is simply me working with "learning tests"
                to get a good feel for the immutable lib.

    Author:     @tripdubroot
*/

import {List, Map} from 'immutable';

describe('immutability', () => {
    // Testing how an immutable list works
    describe('A List', () => {
        // function that should create a new list with
        // 2nd arg added.
        function addMatchSeat(currentState, seat) {
            return currentState.push(seat);
        }

        // Test that creates a list, then adds another item. 
        // It test that the first list is still intact... immutable.
        it('is immutable', () => {
            let state = List.of('Artist One', 'Artist Two');
            let nextState = addMatchSeat(state, 'Artist Three');

            expect(nextState).toEqual(List.of('Artist One', 'Artist Two', 'Artist Three'));
            expect(state).toEqual(List.of('Artist One', 'Artist Two'));
        });
    });

    // Testing how a tree structure works
    describe('A Tree', () => {
        // Function that will create a new list with
        // 2nd arg added.
        function addMatchSeat(currentState, seat) {
            return currentState.update('match', match => match.push(seat))
        }

        // Test that creates a Map (tree), then addes another item.
        // It tests that the first tree is still intact.. immutable
        it('is immutable', () => {
            let state = Map({
                match: List.of('Artist One', 'Artist Two')
            });
            let nextState = addMatchSeat(state, 'Artist Three');

            expect(nextState).toEqual(Map({match: List.of('Artist One', 'Artist Two', 'Artist Three')}));
            expect(state).toEqual(Map({match: List.of('Artist One', 'Artist Two')}));
        });
    });
});