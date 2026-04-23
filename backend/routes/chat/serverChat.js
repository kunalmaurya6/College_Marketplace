import { Server } from 'socket.io'
import chatModel from '../../models/model/chatModel.js'
import { connect } from 'http2';

const chatRoute = (appServer) => {
    const io = new Server(appServer);
    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    io.disconnectSockets();
};

export default chatRoute;