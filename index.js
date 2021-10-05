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

io.on("connection", (socket) => {
    socket2 = socket

    clients[count] = socket.id
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