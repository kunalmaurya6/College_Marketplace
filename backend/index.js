import express from 'express'
import 'dotenv/config'
import connectDB from './utils/DB/DB.js'
import routes from './routes/route.js'
import httpServer from 'http'
import chatServer from './routes/chat/serverChat.js'
import cors from 'cors'
import dbConnection from './utils/DB/connect.js'

const app = express()

const server=httpServer.createServer(app);

chatServer(server);

const PORT = process.env.PORT


chatServer(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(dbConnection);

app.use('/api',routes);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        message: `Page not found`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});

export default app;

server.listen(PORT, async () => {
    console.log("Server running on: ", PORT);
})
