const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on("message", (message) => {
        console.log(message);
        io.to(message.room).emit("message", message); //socket.emit envia só para o lado de lá, o io envia para todos os lados.
    });

    socket.on("join_room", (room) => {
        socket.join(room)
    });


})



const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});