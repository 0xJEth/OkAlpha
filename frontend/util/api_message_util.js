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

  updateMessage: function (read_messaage, callback) {
    $.ajax({
      url: "api/messages/" + read_messaage.id,
      type: "PATCH",
      data: {message: read_messaage},
      success: function (message) {
        ApiMessageActions.receiveMessage(read_messaage);
        callback && callback(read_messaage.id);
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
