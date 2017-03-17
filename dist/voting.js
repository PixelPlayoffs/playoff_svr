'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Intent:     This file contains core voting logic and state.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Author:     @tripdubroot
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ref:        https://facebook.github.io/immutable-js/docs/#/Map/updateIn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _immutable = require('immutable');

var _tournament = require('./models/tournament');

var _tournament2 = _interopRequireDefault(_tournament);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Voting = function () {
    function Voting() {
        _classCallCheck(this, Voting);
    }

    _createClass(Voting, [{
        key: 'getInitialState',
        value: function getInitialState() {
            return (0, _tournament2.default)();
        }
    }, {
        key: 'setCurrentVoteSeats',
        value: function setCurrentVoteSeats(state, seats) {
            return state.set('currentSeats', (0, _immutable.List)(seats));
        }
    }, {
        key: 'createTournament',
        value: function createTournament(state, seats) {
            return state.mergeIn(['round', 'quarterFinals'], seats);
        }
    }, {
        key: 'getNextMatch',
        value: function getNextMatch(state) {
            var currentRound = state.get('currentRound');
            var winner = this.getWinner(state.get('vote'));

            if (winner.isArray) {
                // Need to new up a rematch if tie
                return 'Tie Match';
            }

            switch (currentRound) {
                case 'quarterFinals':
                    var seats = state.getIn(['round', 'quarterFinals']);
                    var nextRound = state.getIn(['round', 'simiFinals']).push(winner);
                    var newState = state.merge({
                        vote: (0, _immutable.Map)({
                            seats: seats.take(2),
                            tally: (0, _immutable.Map)()
                        }),
                        round: (0, _immutable.Map)({
                            quarterFinals: seats.skip(2),
                            simiFinals: typeof winner === 'string' ? nextRound : (0, _immutable.List)(),
                            finals: (0, _immutable.List)(),
                            winner: (0, _immutable.List)()
                        }),
                        currentRound: 'quarterFinals'
                    });

                    return newState.getIn(['vote', 'seats']).count() === 0 ? this.getNextMatch(newState.set('currentRound', 'simiFinals')) : newState;

                case 'simiFinals':
                    var seats = state.getIn(['round', 'simiFinals']);
                    var nextRound = state.getIn(['round', 'finals']).push(winner);
                    var newState = state.merge({
                        vote: (0, _immutable.Map)({
                            seats: seats.take(2),
                            tally: (0, _immutable.Map)()
                        }),
                        round: (0, _immutable.Map)({
                            quarterFinals: (0, _immutable.List)(),
                            simiFinals: seats.skip(2),
                            finals: typeof winner === 'string' ? nextRound : (0, _immutable.List)(),
                            winner: (0, _immutable.List)()
                        }),
                        currentRound: 'simiFinals'
                    });

                    return newState.getIn(['vote', 'seats']).count() === 0 ? this.getNextMatch(newState.set('currentRound', 'finals')) : newState;

                case 'finals':
                    var seats = state.getIn(['round', 'finals']);
                    var nextRound = state.getIn(['round', 'winner']).push(winner);
                    var newState = state.merge({
                        vote: (0, _immutable.Map)({
                            seats: seats.take(2),
                            tally: (0, _immutable.Map)()
                        }),
                        round: (0, _immutable.Map)({
                            quarterFinals: (0, _immutable.List)(),
                            simiFinals: (0, _immutable.List)(),
                            finals: seats.skip(2),
                            winner: typeof winner === 'string' ? nextRound : (0, _immutable.List)()
                        }),
                        currentRound: 'finals'
                    });

                    return newState.getIn(['vote', 'seats']).count() === 0 ? this.getNextMatch(newState.set('currentRound', 'winner')) : newState;

                case 'winner':
                    var nextRound = state.getIn(['round', 'winner']);
                    var newState = state.merge({
                        vote: (0, _immutable.Map)({
                            seats: (0, _immutable.List)(),
                            tally: (0, _immutable.Map)()
                        }),
                        round: (0, _immutable.Map)({
                            quarterFinals: (0, _immutable.List)(),
                            simiFinals: (0, _immutable.List)(),
                            finals: (0, _immutable.List)(),
                            winner: nextRound
                        }),
                        currentRound: 'winner'
                    });

                    return newState;

                default:
                    break;
            }
        }
    }, {
        key: 'getWinner',
        value: function getWinner(vote) {
            if (!vote) return [];

            var _vote$get = vote.get('seats'),
                _vote$get2 = _slicedToArray(_vote$get, 2),
                a = _vote$get2[0],
                b = _vote$get2[1];

            var aVotes = vote.getIn(['tally', a], 0);
            var bVotes = vote.getIn(['tally', b], 0);
            if (aVotes > bVotes) return a;else if (aVotes < bVotes) return b;else return [a, b];
        }
    }, {
        key: 'vote',
        value: function vote(state, seat) {
            return state.updateIn(['vote', 'tally', seat], 0, function (tally) {
                return tally + 1;
            });
        }
    }]);

    return Voting;
}();

exports.default = new Voting();