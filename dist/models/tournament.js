'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

exports.default = function () {
    return (0, _immutable.Map)({
        vote: (0, _immutable.Map)({
            seats: (0, _immutable.List)(),
            tally: (0, _immutable.Map)()
        }),
        round: (0, _immutable.Map)({
            quarterFinals: (0, _immutable.List)(),
            simiFinals: (0, _immutable.List)(),
            finals: (0, _immutable.List)(),
            winner: (0, _immutable.List)()
        }),
        currentRound: 'quarterFinals'
    });
};