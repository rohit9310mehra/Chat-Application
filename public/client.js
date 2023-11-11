const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let user = document.querySelector('.userName')

do {
    name = prompt('Please enter your name: ')
} while(!name)
// let userName = ` <b>${msg.user}</b>`;
user.innerHTML = name;
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

// user.addEventListener("keyup", function (event) {
//     user.value = name;
// } )


function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')

    let className = type
    mainDiv.classList.add(className, 'message')


    
    let markup = `
        <b><span>${msg.user}</span></b>:&nbsp;&nbsp;<p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



