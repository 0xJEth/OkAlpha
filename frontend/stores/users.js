var Store = require('flux/utils').Store,
    Constants = require('../constants/constants'),
    ApiUserUtil = require('../util/api_user_util'),
    AppDispatcher = require('../dispatcher/dispatcher');

var UserStore = new Store(AppDispatcher);
var _users = {};
var current_user = {};

var resetUsers = function(users){
  _users = {};
  users.forEach(function (user) {
    _users[user.id] = user;
  });
};

var resetUser = function (user) {
  _users[user.id] = user;
};

var getCurrentUser = function(user) {
  current_user = user;
};

UserStore.currentUser = function() {
  return current_user;
};

UserStore.all = function () {
  var users = [];
  for (var id in _users) {
    users.push(_users[id]);
  }
  return users;
};

UserStore.find = function (id) {
  return _users[id];
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.USERS_RECEIVED:
      resetUsers(payload.users);
      break;
    case Constants.USER_RECEIVED:
      resetUser(payload.user);
      break;
    case Constants.USER_UPDATED:
      resetUser(payload.user);
      break;
    case Constants.SEARCH_PARAMS_RECEIVED:
      UserStore.fetchSearchResults(payload.searchParams);
      break;
    case Constants.CURRENT_USER_RECEIVED:
      getCurrentUser(payload.current_user);
      break;
  }
  UserStore.__emitChange();
};

module.exports = UserStore;
