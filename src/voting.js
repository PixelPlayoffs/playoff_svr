/*
    Intent:     This file contains core voting logic and state.
    Author:     @tripdubroot

    ref:        https://facebook.github.io/immutable-js/docs/#/Map/updateIn
    TODO:       Voting:Ctor is me feeling out the overall structure of the state.
*/

import {List, Map} from 'immutable';

class Voting {
    constructor() {
        this.tournament = Map({
            vote: Map({
                seats: List(),
                tally: Map()
            }),
            entries: Map({
                quarterFinals: List(),
                simiFinals: List(),
                finals: List(),
                winner: ''
            })
        });
    }
    setCurrentVoteSeats(state, seats) {
        return state.set('currentSeats', List(seats));
    } 
}

export default new Voting();
