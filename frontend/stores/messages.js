var Store = require('flux/utils').Store,
    Constants = require('../constants/constants'),
    UserStore = require('./users'),
    ApiMessageUtil = require('../util/api_message_util'),
    AppDispatcher = require('../dispatcher/dispatcher');

var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var DAYS = ['Sunday','Mon','Tues','Wed','Thur','Friday','Sat'];

var MessageStore = new Store(AppDispatcher);
var _messages = {};

var resetMessages = function(messages){
  _messages = {};
  messages.forEach(function (message) {
    _messages[message.id] = message;
  });
};

var resetMessage = function (message) {
  _messages[message.id] = message;
};

var removeMessage = function () {
  var messages = [];
  ApiMessageUtil.fetchMessages();
  messages = MessageStore.allMessages();
};

MessageStore.dateToString = function(date){
  var timestamp = new Date(date);
  var minutes = timestamp.getMinutes().toString();
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  return (" " + timestamp.getHours() + ":" +
          minutes + ", " +
          DAYS[timestamp.getDay()] + " " +
          MONTHS[timestamp.getMonth()]+ " " +
          timestamp.getDate()
        )
};

MessageStore.findMessage = function(user_id, message_id) {
  var myMessages = MessageStore.allMyMessages(user_id);
  for (var i = 0; i < myMessages.length; i++) {
     if (myMessages[i].message_id === message_id) {
       return myMessages[i];
     }
   }
   return {};
};

MessageStore.allMessages = function () {
  var messages = [];
  for (var id in _messages) {
    messages.push(_messages[id]) ;
  }
  return messages;
};

MessageStore.allMyReceivedMessages = function (user_id) {
  var messages = [];
  for (var i in _messages) {
    if (_messages[i].receiver_id === user_id) {
      messages.push(_messages[i]) ;
    }
  }
  return messages;
};

MessageStore.allMySentMessages = function (user_id) {
  var messages = [];
  for (var id in _messages) {
    if (_messages[id].sender_id === user_id) {
      messages.push(_messages[id]) ;
    }
  }
  return messages;
};

MessageStore.find = function (id) {
  return _messages[id];
};

MessageStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.MESSAGES_RECEIVED:
      resetMessages(payload.messages);
      break;
    case Constants.MESSAGE_RECEIVED:
      resetMessage(payload.message);
      break;
    case Constants.MESSAGE_REMOVED:
      removeMessage(payload.message);
      break;
  }
  MessageStore.__emitChange();
};

module.exports = MessageStore;
