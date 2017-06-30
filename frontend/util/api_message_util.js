var ApiMessageActions = require('../actions/api_message_actions');

var ApiMessageUtil = {
  fetchMessages: function(){
    $.ajax({
      url: "api/messages",
      success: function (messages) {
        ApiMessageActions.receiveMessages(messages);
      },
      error: function(message) {
        console.log(message);
      }
    })
  },

  createMessage: function (message, callback) {
    $.ajax({
      url: "api/messages/",
      type: "POST",
      data: {message: message},
      success: function (message) {
        ApiMessageActions.receiveMessage(message);
        callback && callback(message);
      },
      error: function (message) {
        console.log(message);
      }
    });
  },

  updateMessage: function (read_message, callback) {
    $.ajax({
      url: "api/messages/" + read_message.id,
      type: "PATCH",
      data: {message: read_message},
      success: function (message) {
        ApiMessageActions.receiveMessage(read_message);
        callback && callback(read_message.id);
      },
      error: function (message) {
        console.log(message);
      }
    });
  },

  deleteMessage: function (message) {
    $.ajax({
      url: "api/messages/" + message.id,
      type: "DELETE",
      success: function () {
        ApiMessageActions.removeMessage();
      },
      error: function (message) {
        console.log(message);
      }
    });
  }

};

module.exports = ApiMessageUtil;
