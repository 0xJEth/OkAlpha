var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');

var ApiActions = {
  receiveProfile: function(users){
    AppDispatcher.dispatch({
      actionType: Constants.PROFILE_RECEIVED,
      users: users
    })
  },

  receiveInterests: function(users){
    AppDispatcher.dispatch({
      actionType: Constants.INTERESTS_RECEIVED,
      users: users
    });
  },

  receiveUsers: function(users){
    AppDispatcher.dispatch({
      actionType: Constants.USER_RECEIVED,
      users: users
    });
  }
}

module.exports = ApiActions;
