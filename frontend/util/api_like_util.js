var ApiLikeActions = require('../actions/api_like_actions');

var ApiLikeUtil = {
  fetchMyLikes: function(){
    $.ajax({
      url: "api/likes",
      success: function (likes) {
        ApiLikeActions.receiveMyLikes(likes);
      },
      error: function(message) {
        console.log(message);
      }
    })
  },

  fetchMyFans: function(){
    $.ajax({
      url: "api/likes",
      success: function (likes) {
        ApiLikeActions.receiveMyFans(likes);
      },
      error: function(message) {
        console.log(message);
      }
    })
  },

  fetchMyLike: function (id, callback) {
    $.ajax({
      url: "api/users/" + id,
      success: function (like) {
        ApiLikeActions.receiveMyLike(like);
        callback && callback(like.id);
      },
      error: function (message) {
        console.log(message);
      }
    });
  },

  fetchMyFan: function (id, callback) {
    $.ajax({
      url: "api/users/" + id,
      success: function (like) {
        ApiLikeActions.receiveMyFan(like);
        callback && callback(like.id);
      },
      error: function (message) {
        console.log(message);
      }
    });
  },

  updateMyLike: function (id, callback) {
    $.ajax({
      url: "api/users/" + id,
      success: function (like) {
        ApiLikeActions.updateMyLike(like);
        callback && callback(like.id);
      },
      error: function (message) {
        console.log(message);
      }
    });
  },

  updateMyFan: function (id, callback) {
    $.ajax({
      url: "api/users/" + id,
      success: function (like) {
        ApiLikeActions.updateMyFan(like);
        callback && callback(like.id);
      },
      error: function (message) {
        console.log(message);
      }
    });
  }
};

module.exports = ApiLikeUtil;
