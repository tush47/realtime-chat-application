// node server which will handle the socketio connections
const io=require('socket.io')(8000)
const users={};
// io on makes objecrts of these 
// if any new user joins,let other users connected to the server know!
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
// socketon tells what happens to these
        // console.log("New user",name)
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message: message ,name: users[socket.id]})
    });
    // if someone leaves the chat let others know
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
    
})