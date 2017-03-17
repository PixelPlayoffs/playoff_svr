'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;

var _voting = require('./voting');

var _voting2 = _interopRequireDefault(_voting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _voting2.default.getInitialState();
    var action = arguments[1];

    switch (action.type) {
        case 'SET_SEATS':
            return _voting2.default.createTournament(state, action.seats);
        case 'NEXT':
            return _voting2.default.getNextMatch(state);
        case 'VOTE':
            return _voting2.default.vote(state, action.seat);
    }
    return state;
}