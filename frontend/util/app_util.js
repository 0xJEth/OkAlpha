var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  // fetchUsers: function(){
  //   $.get('api/users', function(users){
  //     ApiActions.receiveAll(users);
  //   });
  // },

  createInterests: function(data) {
    $.post('api/users', { user: data }, function (user) {
      ApiActions.receiveInterests([user]);
    });
  },

  updateUser: function (user, callback) {
    $.ajax({
      url: "api/users/:userId",
      method: "PATCH",
      data: {user: user},
      success: function (user) {
        ApiActions.updateUser(user);
        callback && callback(user.id);
      },
      error: function (message) {
        console.log(message);
      }
    })
  }
};

module.exports = ApiUtil;
