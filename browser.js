if (!window.WebSocket) {
   document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
}

// создать подключение
var socket = new WebSocket("ws://localhost:8081");


var inputMessage = document.getElementById('imput-message');
var login = 'noname';
var state = document.getElementById('state');

var Message = function(par){
   var obj = {
      login: login,
      message: par.message.value
   }

   return obj;
};

(function(){
   login = prompt('Введите Ваше имя:', 'noname');
   document.getElementById('view-name').innerHTML = login;
})();


// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {

   var outgoingMessage = new Message(this);

  socket.send(JSON.stringify(outgoingMessage));
  inputMessage.value = '';

  return false;
};

inputMessage.onfocus = function() {
   var message = {
      login: login,
      state: "&hellip;"
   };
   socket.send(JSON.stringify(message));
}
inputMessage.onblur = function() {
   var message = {
      login: login,
      state: "&not;"
   };
   socket.send(JSON.stringify(message));
}



// обработчик входящих сообщений
socket.onmessage = function(event) {
   var incomingMessage = JSON.parse(event.data);

   if(typeof(incomingMessage.state) != "undefined"){

      console.log(incomingMessage.state);

      if(incomingMessage.state == "&hellip;"){
         state.innerHTML = incomingMessage.login + " : набирает сообщение";
      }

      if(incomingMessage.state == "&not;"){
         state.innerHTML="";
      }

   }else{
      showMessage(incomingMessage.login+' : '+incomingMessage.message);
   };
};

// показать сообщение в div#subscribe
function showMessage(message) {
  var messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
}
