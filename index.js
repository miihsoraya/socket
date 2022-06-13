const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/chat.html');
});
 
server.listen(PORT, () => {
   console.log('Serv carregando porta: ' + PORT);
});

io.on('connection', (socket) => {
 
   socket.on('disconnect', () => {
      io.emit('send message', {message: `${socket.username} saiu do chat`, user:"Bem vindo"})
   }); //precisa tirar esse user
 
   socket.on('new message', (msg) => {
       console.log(msg) //conversa exibida
       io.emit('send message', {message: msg, user: socket.username});
   });
 
   socket.on('new user', (usr) => {
       socket.username = usr;
       io.emit('send message', {message: `${socket.username} entrou no chat`, user:"Bem vindo"})
   }); //io.emit("new user", nome);    // users[socket.id] = nome;
});
