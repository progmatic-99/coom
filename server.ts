import { Server } from "socket.io";

let users = {};
let socketToRoom = {};
const maximum = 2;

const io = new Server(3000);

io.on('connection', socket => {
  socket.on('join_room', data => {
    if (users[data.room]) {
      const length = users[data.room].length;

      if (length === maximum) {
        socket.to(socket.id).emit('room_full');
        return;
      }

      users[data.room].push({id: socket.id, email: data.email});
    } else {
      users[data.room] = [{id: socket.id, email: data.email}];
    }
    socketToRoom[socket.id] = data.room;

    socket.join(data.room);
    console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

    const usersInThisRoom = users[data.room].filter(user => user.id !== socket.id);

    console.log(usersInThisRoom);

    io.sockets.to(socket.id).emit('all_users', usersInThisRoom);
  });

  socket.on('offer', (sdp: RTCSessionDescription) => {
    console.log('offer: ' + socket.id);
    socket.broadcast.emit('getOffer', sdp);
  });
})
