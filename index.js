/*const express   = require("express")
const path      = require("path")

var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

app.get("/", (req, res) => {
    res.sendFile( path.join(__dirname, "public/index.html"))
})
app.listen(8080)
app.use(express.static(__dirname + "/public"))

io.on("connection", (socket) => {
    console.log("csatlakozott")
    socket.on("disconnet", (s) => {
        console.log("lecsatlakozott")
    })
})*/
/*
const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
    console.log("asd")
    client.on('event', data => {  });
    client.on('disconnect', () => {  });
});
server.listen(8080);
*/

const { createWebSocketStream } = require("ws");

const   client      =   require("engine.io-client"),
        express     =   require("express"),
        app         =   express(),
        port        =   3000,
        server      =   require("http").createServer(app),
        VideoServer =   require("http"),
        fs          =   require("fs"),
        io          =   require("socket.io")(server),
        url         =   require("url"),
        path        =   require("path");

clients = []
count = 0;

debug = true

VideoStatus = false;
VideoTime   = 5;

io.on("connection", (socket) => {
    socket2 = socket

    clients[count] = socket.id
    if(debug)console.log(count+1 + ". client connected " + clients[count] )
    count++;

    socket.on("disconnect", () => {
        count--;
        for(i = 0; i < clients.length; i++){
            if(clients[i] == socket.id) {clients.splice(i, 1)}
        }
    })

    socket.on("messageFromUser", (param) => {
        console.log(param)
        socket.broadcast.emit("messageFromServer", param)
    })
})



app.get("/", function(req, res){
    res.sendFile('index.html',{root: path.join(__dirname, './public')})
})

app.use(express.static(path.join(__dirname, '')))

server.listen(port, () => {
    console.log("server listening on port: "+port)
});