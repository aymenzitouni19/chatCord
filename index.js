const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const messages = require('./utils/messages')
const {userJoin , getCurrentUser , userLeave , getRoomUsers} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// setting up static folder
app.use(express.static(path.join(__dirname , 'public')))
io.on('connection', socket =>{
    socket.on('joinRoom' , (us)=>{
        const user = userJoin(socket.id,us.username,us.room)
        console.log(user)
        socket.join(user.room)
        //welcome current user 3nd client
        socket.emit('message' ,messages.formatMessage(user.username,'u joind the room'+ user.room))

        
    
        //broadcast when a user connect 3and otherClients
        socket.broadcast
        .to(user.room)
        .emit('message' ,messages.formatMessage(user.username ,user.username+' has joined the cha'))


        //send room info
        io
        .to(user.room)
        .emit('roomUsers' , {
            room : user.room,
            users : getCurrentUser(user.room)
        })

        
    
    })
   


    

    //Listen for ChatMessage
    socket.on('chatMessage' ,(message)=>{
        const user = getCurrentUser(socket.id)
        io.to(user.room)
        .emit('message' ,messages.formatMessage(user.username,message))
    } )
    //user left the chat
    socket.on('disconnect', ()=>{
        const user = userLeave(socket.id)
        if(user){
            io
            .to(user.room)
            .emit('message' ,messages.formatMessage(user.username, user.username+' has left the chat '))

        }

    })
})





//server configration
const PORT = process.env.PORT  || 3000
server.listen(PORT , ()=>{
    console.log('server is listening on port :'+ PORT)
})
