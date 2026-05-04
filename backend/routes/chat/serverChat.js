import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../../models/model/user.js'
import chatModel from '../../models/model/chatModel.js'

const activeUsers = new Map();

const addActiveSocket = (userId, socketId) => {
    const sockets = activeUsers.get(userId) || new Set();
    sockets.add(socketId);
    activeUsers.set(userId, sockets);
};

const removeActiveSocket = (userId, socketId) => {
    const sockets = activeUsers.get(userId);
    if (!sockets) return;

    sockets.delete(socketId);
    if (sockets.size) {
        activeUsers.set(userId, sockets);
    } else {
        activeUsers.delete(userId);
    }
};

const getActiveUserIds = () => Array.from(activeUsers.keys());

const chatServer = (appServer) => {
    const io = new Server(appServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on('connection', async (socket) => {
        const { token } = socket.handshake.auth || {};

        if (!token) {
            return socket.disconnect(true);
        }

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            const user = await User.findById(decoded.id).select('_id');

            if (!user) {
                return socket.disconnect(true);
            }

            userId = user._id.toString();
        } catch (error) {
            return socket.disconnect(true);
        }

        socket.join(userId);
        addActiveSocket(userId, socket.id);
        io.emit('active_users', getActiveUserIds());

        socket.on('private_message', async ({ to, message }) => {
            const text = typeof message === 'string' ? message.trim() : '';

            if (!mongoose.Types.ObjectId.isValid(to) || !text) {
                socket.emit('message_error', { message: 'Valid receiver and message text are required' });
                return;
            }

            try {
                const chat = await chatModel.create({
                    by: userId,
                    to,
                    message: text,
                });

                const event = {
                    _id: chat._id.toString(),
                    by: chat.by.toString(),
                    to: chat.to.toString(),
                    message: chat.message,
                    createdAt: chat.createdAt,
                };

                io.to(to).emit('private_message', event);
                socket.emit('private_message', event);
            } catch (error) {
                socket.emit('message_error', { message: 'Unable to send message' });
            }
        });

        socket.on('disconnect', () => {
            removeActiveSocket(userId, socket.id);
            io.emit('active_users', getActiveUserIds());
        });
    });
};

export default chatServer;
