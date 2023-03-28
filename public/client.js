const socket=io()
let any;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__area')
do{
   any= prompt('Please enter your name:')
} while(!any)
textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter')
    sendMessage(e.target.value)
})
function sendMessage(message){
    let msg={
        user: any,
        message: message.trim()

    }
    // append
    apppendMessage(msg,'outgoing') 
    textarea.value=''
    //scrollTobottom()
    // send to sever
    socket.emit('message',msg)

    
    
}
function apppendMessage(msg,type){
 let mainDiv=document.createElement('div')
 let className=type
 mainDiv.classList.add(className,'message')
 let markup=`
 <h4>${msg.user}</h4>
 <p>${msg.message}</p>
 `
 mainDiv.innerHTML=markup
 messageArea.appendChild(mainDiv)
// messageArea.appendChild(mainDiv)
}
// receive
socket.on('message',(msg)=>{
    apppendMessage(msg,'incoming')
    // scrollTobottom()
})
//   function scrollTobottom(){
//       messageArea.scrollTop=messageArea.scrollHeight
//  }