import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import ioClient from 'socket.io-client';
import os from 'os';
import Store from './store';
import * as Actions from './Actions';

var app = express();
var server = http.Server(app);
var io = socketio(server);
const timerSocket = ioClient('http://localhost:3002');

export const store = Store.makeStore();

store.subscribe(() => {
    console.log(JSON.stringify(store.getState().toJS()));
    io.emit('state', store.getState().toJS());
});

io.on('connection', (socket) => {
    console.log('client conenected');
    socket.emit('state', store.getState().toJS());
    socket.on('action', action => {
        store.dispatch(Actions.persistVote(action.entry));    
    });
});

timerSocket.on('timersub', msg => {
  console.log('timer ' + msg);
  store.dispatch(Actions.persistSetTimer(msg));
});

// start up reading event sourcing DB to dispatch...

const port = 8090;

var healthData = {
    svcName: 'playoff_svr',
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
        "Artist Three",
        "Artist Four",
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

app.get('/disablevote', (req, res) => {
    store.dispatch(Actions.persistDisableVote());

    res.status(200).send('disableVote');
});

app.get('/swapvideo', (req, res) => {
    let vid = '//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest'
    store.dispatch(Actions.persistSwapVideoUrl(vid));
    store.dispatch(Actions.persistSwapVideoUrl(vid));

    res.status(200).send('swapVideoUrl');
});

app.get('/setTimerLen', (req, res) => {
    store.dispatch(Actions.persistSetTimerLen(30));

    res.status(200).send('setTimerLen');
});

server.listen(port, ()=> {
    console.log('webserver running at http://localhost:' + port);
});
