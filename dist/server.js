'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SocketServer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketServer = function () {
    function SocketServer() {
        _classCallCheck(this, SocketServer);
    }

    _createClass(SocketServer, [{
        key: 'startServer',
        value: function startServer(store) {
            console.log('Server Started...');
            var io = new _socket2.default().attach(8090);

            // TODO: This is pushing the entire state...
            store.subscribe(function () {
                return io.emit('state', store.getState().toJS());
            });

            // TODO: No Auth...
            io.on('connection', function (socket) {
                socket.emit('state', store.getState().toJS());
                socket.on('action', store.dispatch.bind(store));
            });
        }
    }]);

    return SocketServer;
}();

exports.SocketServer = SocketServer;