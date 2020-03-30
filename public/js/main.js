const socket = io()
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName =  document.getElementById('room-name')
const usersList =  document.getElementById('users')
const {username , room} = Qs.parse(location.search,{
    ignoreQueryPrefix : true,
})


socket.emit('joinRoom', {username,room})
//message from server
socket.on('message' , message =>{
    console.log(message)
    outputMessage(message)

})

// socket.on('roomUsers', ({ room, users }) => {
//     outputRoomName(room);
//     outputUsers(users);
//   });
//Message submit 
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    // Get message text
    const msg = e.target.elements.msg.value

    // emit message to server
    socket.emit('chatMessage' , msg)
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})


function outputMessage(message){
    var div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = '<p class="meta">'+message.username + '<span>'+message.time+'</span></p><p class="text">'+ message.text +'</p>'
    document.querySelector('.chat-messages').append(div)
}


// function outputRoomName(room){
//    roomName.innerHTML = room
// }

// function outputUsers(users){
//     usersList.innerHTML = ''
//     users.map(user=>usersList.innerHTML+='<li>'+user.username+'</li>')
// }