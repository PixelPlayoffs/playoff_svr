import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import os from 'os';
import Store from './store';
import {SocketServer} from './server';
import { persistVote } from './Actions';

var app = express();
var server = http.Server(app);
var io = socketio(server);

export const store = Store.makeStore();

store.subscribe(() => {
    console.log(JSON.stringify(store.getState().toJS()));
    io.emit('state', store.getState().toJS());
});

io.on('connection', (socket) => {
    console.log('client conenected');
    socket.emit('state', store.getState().toJS());
    socket.on('action', action => {
        store.dispatch(persistVote(action.entry));
    });
});

// start up reading event sourcing DB to dispatch...

const port = 8090;

var healthData = {
    svcName: 'Stream Timer',
    host: os.hostname(),
    port: port,
    status: 'green'
};

app.get('/health', (req, res) => {
    res.status(200).send(JSON.stringify(healthData));
});

app.get('/start', (req, res) => {
    store.dispatch({
        type: 'SET_SEATS',
        seats: [
        "Artist One",
        "Artist Two",
        "Artist Four",
        "Artist Three",
        "Artist Five",
        "Artist Six",
        "Artist Seven",
        "Artist Eight"
    ]});

    store.dispatch({type: 'NEXT'});

    res.status(200).send('started');
});

app.get('/next', (req, res) => {
    store.dispatch({type: 'NEXT'});

    res.status(200).send('next');
});

server.listen(port, ()=> {
    console.log('webserver running at http://localhost:' + port);
});
