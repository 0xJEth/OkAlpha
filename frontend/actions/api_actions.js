var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');

var ApiActions = {
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

  receiveSearchParams: function(searchParams) {
    console.log(searchParams)
    AppDispatcher.dispatch({
      actionType: Constants.SEARCH_PARAMS_RECEIVED,
      searchParams: searchParams
    })
  }
}

module.exports = ApiActions;
