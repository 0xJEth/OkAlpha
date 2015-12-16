var Store = require('flux/utils').Store;
var Constants = require('../constants/constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var UserStore = new Store(AppDispatcher);
var _users = [];

var resetUsers = function(users){
  _users = users.slice(0);
}

UserStore.all = function () {
  return _users.slice(0);
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.USERS_RECEIVED:
      var result = resetUsers(payload.users);
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
