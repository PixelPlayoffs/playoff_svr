import Server from 'socket.io';

class SocketServer {
    startServer(store) {
        console.log('Server Started...');
        const io = new Server().attach(8090);

        // TODO: This is pushing the entire state...
        store.subscribe(
            () => io.emit('state', store.getState().toJS())
        );

        // TODO: No Auth...
        io.on('connection', (socket) => {
            socket.emit('state', store.getState().toJS());
            socket.on('action', store.dispatch.bind(store));
        });
    }
}

export { SocketServer };
