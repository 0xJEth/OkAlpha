var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');

var ApiActions = {
  updateUser: function(user){
    console.log("here");
    AppDispatcher.dispatch({
      actionType: Constants.USER_UPDATED,
      user: user
    })
  },

  updateInterests: function(users){
    AppDispatcher.dispatch({
      actionType: Constants.INTERESTS_RECEIVED,
      users: users
    });
  },

  receiveUsers: function(users){
    AppDispatcher.dispatch({
      actionType: Constants.USERS_RECEIVED,
      users: users
    });
  },

  receiveUser: function(user){
    AppDispatcher.dispatch({
      actionType: Constants.USER_RECEIVED,
      user: user
    });
  }
}

module.exports = ApiActions;
