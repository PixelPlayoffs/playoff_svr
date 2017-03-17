'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.store = undefined;

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _server = require('./server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = exports.store = _store2.default.makeStore();
new _server.SocketServer().startServer(store);

store.dispatch({
    type: 'SET_SEATS',
    seats: ["Artist One", "Artist Two", "Artist Four", "Artist Three", "Artist Five", "Artist Six", "Artist Seven", "Artist Eight"]
});
store.dispatch({ type: 'NEXT' });