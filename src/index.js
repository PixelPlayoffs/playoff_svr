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
