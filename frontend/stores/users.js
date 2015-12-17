var Store = require('flux/utils').Store;
var Constants = require('../constants/constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var UserStore = new Store(AppDispatcher);
var _users = {};

var resetUsers = function(users){
  _users = {};
  users.forEach(function (user) {
    _users[user.id] = user;
  });
}

var resetUser = function (user) {
  // console.log(user)
  // console.log(_users[user.id])
  _users[user.id] = user;
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
}

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
  }
  UserStore.__emitChange();
};

module.exports = UserStore;
