/*
    Intent:     This file contains core voting logic and state tests.
    Author:     @tripdubroot
*/

import {List, Map} from 'immutable';
import Voting from '../src/voting';
import Tournament from '../src/models/tournament';

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

    describe('createTournament', () => {
        it('adds seats to quarter finals', () => {
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
            const nextState = Voting.createTournament(state, seats);

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
    });

    describe('getNextMatch', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
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
            });
            const nextState = Voting.getNextMatch(state);

            expect(nextState).toEqual(Map({
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
            }));
        });

        it('puts a winner of quarterFinals match into next simiFinals', () => {
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
            const nextState = Voting.getNextMatch(state);

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

        it('puts last winner of quarterFinals match into next simiFinals', () => {
            const state = Map({
                vote: Map({
                    seats: List.of(
                        'Artist Seven',
                        'Artist Eight'
                        ),
                    tally: Map({
                        'Artist Seven': 1,
                        'Artist Eight': 2,
                    })
                }),
                round: Map({
                    quarterFinals: List(),
                    simiFinals: List.of(
                        'Artist Two',
                        'Artist Four',
                        'Artist Six'
                    ),
                    finals: List(),
                    winner: List()
                }),
                currentRound: 'quarterFinals'
            });
            const nextState = Voting.getNextMatch(state);

            expect(nextState).toEqual(Map({
                vote: Map({
                    seats: List.of(
                        'Artist Two',
                        'Artist Four'
                        ),
                    tally: Map()
                }),
                round: Map({
                    quarterFinals: List(),
                    simiFinals: List.of(
                        'Artist Six',
                        'Artist Eight'
                    ),
                    finals: List(),
                    winner: List()
                }),
                currentRound: 'simiFinals'
            }));
        });

        it('puts a winner of simiFinals match into next finals', () => {
            const state = Map({
                vote: Map({
                    seats: List.of(
                        'Artist Two',
                        'Artist Four'
                        ),
                    tally: Map({
                        'Artist Two': 1,
                        'Artist Four': 2
                    })
                }),
                round: Map({
                    quarterFinals: List(),
                    simiFinals: List.of(
                        'Artist Six',
                        'Artist Eight'
                    ),
                    finals: List(),
                    winner: List()
                }),
                currentRound: 'simiFinals'
            });
            const nextState = Voting.getNextMatch(state);

            expect(nextState).toEqual(Map({
                vote: Map({
                    seats: List.of(
                        'Artist Six',
                        'Artist Eight'
                        ),
                    tally: Map()
                }),
                round: Map({
                    quarterFinals: List(),
                    simiFinals: List(),
                    finals: List.of(
                        'Artist Four'
                    ),
                    winner: List()
                }),
                currentRound: 'simiFinals'
            }));
        });

        it('puts last winner of simiFinals match into next finals', () => {
            const state = Map({
                vote: Map({
                    seats: List.of(
                        'Artist Six',
                        'Artist Eight'
                        ),
                    tally: Map({
                        'Artist Six': 1,
                        'Artist Eight': 2
                    })
                }),
                round: Map({
                    quarterFinals: List(),
                    simiFinals: List(),
                    finals: List.of(
                        'Artist Four'
                    ),
                    winner: List()
                }),
                currentRound: 'simiFinals'
            });
            const nextState = Voting.getNextMatch(state);

            expect(nextState).toEqual(Map({
                vote: Map({
                    seats: List.of(
                        'Artist Four',
                        'Artist Eight'
                        ),
                    tally: Map()
                }),
                round: Map({
                    quarterFinals: List(),
                    simiFinals: List(),
                    finals: List(),
                    winner: List()
                }),
                currentRound: 'finals'
            }));
        });

        it('puts winner of finals match into winner', () => {
            const state = Map({
                vote: Map({
                    seats: List.of(
                        'Artist Four',
                        'Artist Eight'
                        ),
                    tally: Map({
                        'Artist Four': 1,
                        'Artist Eight': 2
                    })
                }),
                round: Map({
                    quarterFinals: List(),
                    simiFinals: List(),
                    finals: List(),
                    winner: List()
                }),
                currentRound: 'finals'
            });
            const nextState = Voting.getNextMatch(state);

            expect(nextState).toEqual(Map({
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

    describe('vote', () => {
        it ('creates a tally for the voted seat', () => {
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
            const nextState = Voting.vote(state, 'Artist One');

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

        it ('adds to existing tally for the voted seat', () => {
            const state = Map({
                vote: Map({
                    seats: List.of(
                        'Artist One',
                        'Artist Two'
                        ),
                    tally: Map({
                        'Artist One': 1,
                        'Artist Two': 1,
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
            const nextState = Voting.vote(state, 'Artist Two');

            expect(nextState).toEqual(Map({
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
            }));
        });
    });
});
