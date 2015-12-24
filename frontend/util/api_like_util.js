var ApiLikeActions = require('../actions/api_like_actions');

var ApiLikeUtil = {
  fetchLikes: function(){
    $.ajax({
      url: "api/likes",
      success: function (likes) {
        ApiLikeActions.receiveLikes(likes);
      },
      error: function(message) {
        console.log(message);
      }
    })
  },

  updateLike: function (like, callback) {
    $.ajax({
      url: "api/likes/",
      type: "POST",
      data: {like: like},
      success: function (like) {
        ApiLikeActions.receiveLike(like);
        callback && callback(like);
      },
      error: function (message) {
        console.log(message);
      }
    });
  },

  deleteLike: function (like) {
    $.ajax({
      url: "api/likes/" + like.id,
      type: "DELETE",
      success: function () {
        ApiLikeActions.removeLike();
      },
      error: function (message) {
        console.log(message);
      }
    });
  }

};

module.exports = ApiLikeUtil;
