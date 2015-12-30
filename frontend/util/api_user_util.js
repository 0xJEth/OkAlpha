var ApiUserActions = require('../actions/api_user_actions');

var ApiUserUtil = {

  fetchCurrentUser: function(){
    $.ajax({
      url: "api/sessions",
      success: function (current_user) {
        ApiUserActions.getCurrentUser(current_user);
      },
      error: function(message) {
        console.log(message);
      }
    })
  },

  fetchUsers: function(){
    $.ajax({
      url: "api/users",
      success: function (users) {
        ApiUserActions.receiveUsers(users);
      },
      error: function(message) {
        console.log(message);
      }
    })
  },

  fetchUser: function (id, callback) {
    $.ajax({
      url: "api/users/" + id,
      success: function (user) {
        ApiUserActions.receiveUser(user);
        callback && callback(user.id);
      },
      error: function (message) {
        console.log(message);
      }
    });
  },

  updateProfile: function (user, callback) {
    $.ajax({
      url: "api/users/" + user.id,
      type: "PATCH",
      data: {user: user},
      success: function (user) {
        ApiUserActions.updateUser(user);
        callback && callback(user.id);
      },
      error: function (message) {
        console.log(message);
      }
    });
  },


  fetchSearchResults: function (searchParams) {
    $.ajax({
      url: "api/users",
      success: function (users) {
        ApiUserActions.receiveSearchParams(searchParams);
      },
      error: function(message) {
        console.log(message);
      }
    })
  }

};
module.exports = ApiUserUtil;
