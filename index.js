const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const messages = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// setting up static folder
app.use(express.static(path.join(__dirname , 'public')))
io.on('connection', socket =>{
    console.log('new WS connection')
    //welcome current user
    socket.emit('message' ,messages.formatMessage('chatCordBot','welcome'))

    //broadcast when a user connect
    socket.broadcast.emit('message' ,messages.formatMessage('ChatCord Bot' , 'a user has joined the cha'))



    //user left the chat
    socket.on('disconnect', ()=>{
        io.emit('message' ,messages.formatMessage('chatCordBot', 'a user has left the chat '))
    })

    //Listen for ChatMessage
    socket.on('chatMessage' ,(message)=>{
        io.emit('message' ,messages.formatMessage('USER2020',message))
    } )
})





//server configration
const PORT = process.env.PORT  || 3000
server.listen(PORT , ()=>{
    console.log('server is listening on port :'+ PORT)
})
