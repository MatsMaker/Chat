if (!window.WebSocket) {
   document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
}

// создать подключение
var socket = new WebSocket("ws://localhost:8081");


var inputMessage = document.getElementById('imput-message');
var state = document.getElementById('state');

// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {

  var outgoingMessage = this.message.value;
  socket.send(outgoingMessage);
  inputMessage.value = '';

  return false;
};

inputMessage.onfocus = function() {
   state.innerHTML="&hellip;";
   socket.send("&hellip;");
}
inputMessage.onblur = function() {
   state.innerHTML="";
   socket.send("&not;");
}



// обработчик входящих сообщений
socket.onmessage = function(event) {
   var incomingMessage = event.data;
   if(incomingMessage == "&hellip;"){
      state.innerHTML="&hellip;";
   }

   if(incomingMessage == "&not;"){
      state.innerHTML="";
   }

   if(incomingMessage != "&hellip;" && incomingMessage != "&not;"){
      showMessage(incomingMessage);
   };
};

// показать сообщение в div#subscribe
function showMessage(message) {
  var messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
}
