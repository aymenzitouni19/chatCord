const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// setting up static folder
app.use(express.static(path.join(__dirname , 'public')))
io.on('connection', socket =>{
    console.log('new WS connection')
    //welcome current user
    socket.emit('message' , 'welcome to socket.io')

    //broadcast when a user connect
    socket.broadcast.emit('message' , 'a user has joined the chat')


    //user left the chat
    socket.on('disconnect', ()=>{
        io.emit('message' , 'a user has left the chat')
    })
})





//server configration
const PORT = process.env.PORT  || 3000
server.listen(PORT , ()=>{
    console.log('server is listening on port :'+ PORT)
})
