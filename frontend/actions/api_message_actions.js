var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');

var ApiMessageActions = {

  receiveMessages: function(messages) {
    AppDispatcher.dispatch({
      actionType: Constants.MESSAGES_RECEIVED,
      messages: messages
    });
  },

  receiveMessage: function(message) {
    AppDispatcher.dispatch({
      actionType: Constants.MESSAGE_RECEIVED,
      message: message
    });
  },

  removeMessage: function(message) {
    AppDispatcher.dispatch({
      actionType: Constants.MESSAGE_REMOVED,
      message: message
    });
  }
}

module.exports = ApiMessageActions;
