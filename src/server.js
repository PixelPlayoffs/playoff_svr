// import Server from 'socket.io';
// import { persistVote } from './Actions';

// class SocketServer {
//     startServer(store) {
//         console.log('Server Started...');
//         const io = new Server().attach(8090);

//         // TODO: This is pushing the entire state...
//         store.subscribe(() => {
//             console.log(JSON.stringify(store.getState().toJS()));
//             io.emit('state', store.getState().toJS());
//         });

//         // TODO: No Auth...
//         io.on('connection', (socket) => {
//             console.log('client conenected');
//             socket.emit('state', store.getState().toJS());
//             socket.on('action', action => {
//                 store.dispatch(persistVote(action.entry));
//             });
//         });
//     }
// }

// export { SocketServer };
