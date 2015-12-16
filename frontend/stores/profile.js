var Store = require('flux/utils').Store;
var Constants = require('../constants/constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ProfileStore = new Store(AppDispatcher);
_profile = {};

var resetProfile = function(profile){
  _profile = {};
  profile.forEach(function (profile) {
    _profile[profile.id] = profile;
  });
}

UserStore.all = function () {
  return _users.slice(0);
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.PROFILE_RECEIVED:
      var result = resetUsers(payload.users);
      ProfileStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
