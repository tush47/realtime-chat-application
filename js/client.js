// nodeserver and client are different webs
// we need to connect them
const socket=io('http://localhost:8000',{transports:['websocket']});
const form=document.getElementById('send-container');
const messageInput=document.getElementsByClassName('messageInp')
const messageContainer =document.querySelector(".container")
var audio=new Audio('ting.mp3');
const append=(message,position)=>{
    const messageElement = document.createElement('div');
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position=='left'){
audio.play();
}

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right'); 
    socket.emit('send',message);
    messageInput.value=''
})
const name=prompt("enter your name to join");
socket.emit('new-user-joined', name)

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,`right`)
})
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})
socket.on('leave',name=>{
    append(`${name} : ${data.message}`,'left')
})
 


