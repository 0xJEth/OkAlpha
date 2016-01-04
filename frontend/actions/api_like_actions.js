var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');

var ApiLikeActions = {

  receiveLikes: function(likes) {
    AppDispatcher.dispatch({
      actionType: Constants.LIKES_RECEIVED,
      likes: likes
    });
  },

  receiveLike: function(like) {
    console.log(like);
    AppDispatcher.dispatch({
      actionType: Constants.LIKE_RECEIVED,
      like: like
    });
  },

  removeLike: function(like) {
    AppDispatcher.dispatch({
      actionType: Constants.LIKE_REMOVED,
      like: like
    });
  }
}

module.exports = ApiLikeActions;
