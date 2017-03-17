import Store from './src/store';
import {SocketServer} from './src/server';

export const store = Store.makeStore();
new SocketServer().startServer(store);

store.dispatch({
    type: 'SET_SEATS',
    seats: require('./entries.json')
});
store.dispatch({type: 'NEXT'});
