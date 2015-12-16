var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchUsers: function(){
    var filter = FilterParamsStore.params();
    $.get('api/users', filter, function(users){
      ApiActions.receiveAll(users);
    });
  },
  createProfile: function(data){
    $.post('api/users', { user: data }, function(user) {
      ApiActions.receiveProfile([profile]);
    });
  },
  createInterests: function(data) {
    $.post('api/reviews', { review: data }, function (user) {
      ApiActions.receiveInterests([interests]);
    });
  }
};

module.exports = ApiUtil;
