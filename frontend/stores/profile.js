var Store = require('flux/utils').Store;
var Constants = require('../constants/constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ProfileStore = new Store(AppDispatcher);
_profile = {};

var resetProfile = function(profile){
  _profile = {};
  profile.forEach(function (key) {
    _profile[key] = profile;
  });
}

ProfileStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.PROFILE_RECEIVED:
    debugger
      var result = resetProfile(payload.users);
      break;
  }
  ProfileStore.__emitChange();
};

module.exports = ProfileStore;
