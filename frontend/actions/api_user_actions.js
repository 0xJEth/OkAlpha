var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');

var ApiUserActions = {
  updateUser: function(user){
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
  },

  getCurrentUser: function(current_user){
    AppDispatcher.dispatch({
      actionType: Constants.CURRENT_USER_RECEIVED,
      current_user: current_user
    });
  },

  receiveSearchParams: function(searchParams) {
    AppDispatcher.dispatch({
      actionType: Constants.SEARCH_PARAMS_RECEIVED,
      searchParams: searchParams
    })
  },

  removeSession: function(user) {
    AppDispatcher.dispatch({
      actionType: Constants.SESSION_REMOVED,
      user: user
    });
  }
}

module.exports = ApiUserActions;
