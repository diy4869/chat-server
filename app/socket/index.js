const koa = require('koa')
const app = new koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const Mock = require('mockjs')

// 需要发送的对象
var users = []

io.on('connection', socket => {
  console.log('socket已连接')
  // io.emit('newFriends', 'hello world')
  socket.emit('newFriends', '哈哈哈哈')
  // io.emit('addUsers', '有新好友' + newFriends)
  socket.on('addUser', data => {
    console.log(data)
    socket.user_id = data.user_id
    socket.friends_id = data.friends_id
    socket.verify_message = data.verify_message
    if (socket.user_id !== socket.friends_id) {
      newFriends++
      socket.emit('newFriends', '哈f 哈哈哈' + newFriends)
    } else {
      console.log(2)
    }
  })
  users.push(socket.id)
  console.log(socket.id)
  console.log(io.sockets)
  console.log(users)
  // socket.broadcast.emit('send message', 123455)
  console.log('=======')
  socket.on('privateMessage', data => {
    console.log(socket)
    let private = JSON.parse(data)
    console.log(private)
    console.log(io)
    let d = JSON.parse(data)
    console.log(d)
    console.log(io)
    console.log(io.sockets.sockets)
    io.sockets.sockets[users[0]].emit('privateMessage', d)
    
    
  })
})
io.on('disconnection', () => {
  console.log('断开连接')
})
server.listen(2333, () => {
  console.log('正在监听端口')
})

