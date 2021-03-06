/*
    Intent:     This file contains core voting logic and state.
    Author:     @tripdubroot

    ref:        https://facebook.github.io/immutable-js/docs/#/Map/updateIn
*/

import {List, Map} from 'immutable';
import Tournament from './models/tournament';

class Voting {
    getInitialState() {
        return Tournament();
    }
    setCurrentVoteSeats(state, seats) {
        return state.set('currentSeats', List(seats));
    }

    createTournament(state, seats) {
        return state.mergeIn(['round', 'quarterFinals'], seats);
    }

    getNextMatch(state) {
        let currentRound = state.get('currentRound');
        let winner = this.getWinner(state.get('vote'));

        if (winner.isArray) {
            // Need to new up a rematch if tie
            return 'Tie Match';
        }

        switch (currentRound) {
            case 'quarterFinals':
                var seats = state.getIn(['round', 'quarterFinals']);
                var videoSource = state.get('videoSource');
                var timerLen = state.get('timerLen');
                var nextRound = state.getIn(['round', 'simiFinals']).push(winner);
                var newState = state.merge({
                    vote: Map({
                        seats: seats.take(2),
                        tally: Map()
                    }),
                    round: Map({
                        quarterFinals: seats.skip(2),
                        simiFinals: (typeof winner === 'string') ? nextRound : List(),
                        finals: List(),
                        winner: List()
                    }),
                    videoSource: videoSource,
                    vidSourceSwap: false,
                    timer: '',
                    timerLen: timerLen,
                    votingDisabled: false,
                    currentRound: 'quarterFinals'
                });

                return (newState.getIn(['vote', 'seats']).count() === 0) ?
                    this.getNextMatch(newState.set('currentRound', 'simiFinals')) :
                    newState;

            case 'simiFinals':
                var seats = state.getIn(['round', 'simiFinals']);
                var videoSource = state.get('videoSource');
                var timerLen = state.get('timerLen');
                var nextRound = state.getIn(['round', 'finals']).push(winner);
                var newState = state.merge({
                    vote: Map({
                        seats: seats.take(2),
                        tally: Map()
                    }),
                    round: Map({
                        quarterFinals: List(),
                        simiFinals: seats.skip(2),
                        finals: (typeof winner === 'string') ? nextRound : List(),
                        winner: List()
                    }),
                    videoSource: videoSource,
                    vidSourceSwap: false,
                    timer: '',
                    timerLen: timerLen,
                    votingDisabled: false,
                    currentRound: 'simiFinals'
                });

                return (newState.getIn(['vote', 'seats']).count() === 0) ?
                    this.getNextMatch(newState.set('currentRound', 'finals')) :
                    newState;

            case 'finals':
                var seats = state.getIn(['round', 'finals']);
                var videoSource = state.get('videoSource');
                var timerLen = state.get('timerLen');
                var nextRound = state.getIn(['round', 'winner']).push(winner);
                var newState = state.merge({
                    vote: Map({
                        seats: seats.take(2),
                        tally: Map()
                    }),
                    round: Map({
                        quarterFinals: List(),
                        simiFinals: List(),
                        finals: seats.skip(2),
                        winner: (typeof winner === 'string') ? nextRound : List()
                    }),
                    videoSource: videoSource,
                    vidSourceSwap: false,
                    timer: '',
                    timerLen: timerLen,
                    votingDisabled: false,
                    currentRound: 'finals'
                });

                return (newState.getIn(['vote', 'seats']).count() === 0) ?
                    this.getNextMatch(newState.set('currentRound', 'winner')) :
                    newState;

                case 'winner':
                    var nextRound = state.getIn(['round', 'winner']);
                    var videoSource = state.get('videoSource');
                    var timerLen = state.get('timerLen');
                    var newState = state.merge({
                        vote: Map({
                            seats: List(),
                            tally: Map()
                        }),
                        round: Map({
                            quarterFinals: List(),
                            simiFinals: List(),
                            finals: List(),
                            winner: nextRound
                        }),
                        videoSource: videoSource,
                        vidSourceSwap: false,
                        timer: '',
                        timerLen: timerLen,
                        votingDisabled: false,
                        currentRound: 'winner'
                    });

                    return newState;

            default:
                break;
        }
    }

    getWinner(vote) {
        if(!vote) return [];
        const [a, b] = vote.get('seats');
        const aVotes = vote.getIn(['tally', a], 0);
        const bVotes = vote.getIn(['tally', b], 0);
        if (aVotes > bVotes) return a;
        else if (aVotes < bVotes) return b;
        else return [a, b];
    }

    vote(state, seat) {
        let timerCount = state.get('timer');
        let newState = state.updateIn(['timer'], t => t = timerCount);
        return newState.updateIn(
            ['vote', 'tally', seat],
            0,
            tally => tally + 1
        );
    }

    disableVoting(state) {
        return state.updateIn(
            ['votingDisabled'], disable => !disable
        );
    }

    swapVideoUrl(state, url) {
        let newState = state.updateIn(
            ['videoSource'], src => src = url
        );

        return newState.updateIn(
            ['vidSourceSwap'], disable => !disable
        );
    }

    setTimer(state, count) {
        let length = state.get('timerLen');
        return state.updateIn(['timer'], t => t = (count/length)*100);
    }

    setTimerLen(state, length) {
        return state.updateIn(['timerLen'], t => t = length);
    }
}

export default new Voting();
