import Store from './store';
import {SocketServer} from './server';

export const store = Store.makeStore();
new SocketServer().startServer(store);

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
]
});
store.dispatch({type: 'NEXT'});
var count = 0;
var interval = setInterval(() => {
    store.dispatch({type: 'VOTE', seat: 'Artist One'});
    store.dispatch({type: 'VOTE', seat: 'Artist Two'});
    store.dispatch({type: 'VOTE', seat: 'Artist Two'});
    store.dispatch({type: 'NEXT'});
    count++;

    if (count === 2) { clearInterval(interval) };
}, 25000);
