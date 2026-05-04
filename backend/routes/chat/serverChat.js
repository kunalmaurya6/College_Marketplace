import { Server } from 'socket.io'
import chatModel from '../../models/model/chatModel.js'

const activeUsers = new Map();

const chatServer = (appServer) => {
    const io = new Server(appServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        const { userId } = socket.handshake.auth;

        if (!userId) {
            return socket.disconnect(true);
        }

        socket.join(userId);
        activeUsers.set(userId, socket.id);
        io.emit('active_users', Array.from(activeUsers.keys()));

        socket.on('private_message', async ({ to, message }) => {
            if (!to || !message) return;

            const chat = await chatModel.create({
                by: userId,
                to,
                message,
            });

            const event = {
                _id: chat._id,
                by: chat.by,
                to: chat.to,
                message: chat.message,
                createdAt: chat.createdAt,
            };

            io.to(to).emit('private_message', event);
            socket.emit('private_message', event);
        });

        socket.on('disconnect', () => {
            activeUsers.delete(userId);
            io.emit('active_users', Array.from(activeUsers.keys()));
        });
    });
};

export default chatServer;