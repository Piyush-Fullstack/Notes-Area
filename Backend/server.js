require('dotenv').config();
const connectDb = require('./src/db/db');
const app = require('./src/app');
const http = require('http');
const { Server } = require('socket.io');

connectDb();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// socket events
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // join a note room
    socket.on("join_note", (noteId) => {
        socket.join(noteId);
        console.log(`Client ${socket.id} joined room: ${noteId}`);
    });

    // broadcast updates
    socket.on("note_update", (data) => {
        const { noteId, title, content } = data;

        socket.to(noteId).emit("note_updated", {
            title,
            content
        });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server is Running');
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;
