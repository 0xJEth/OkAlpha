var Store = require('flux/utils').Store;
var UserConstants = require('../constants/user_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var UserStore = new Store(AppDispatcher);
var _users = [];

var resetUsers = function(benches){
  _users = users.slice(0);
}

UserStore.all = function () {
  return _users.slice(0);
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.USERS_RECEIVED:
      var result = resetUsers(payload.users);
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
