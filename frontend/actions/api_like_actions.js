var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');

var ApiLikeActions = {

  receiveMyLikes: function(likes){
    AppDispatcher.dispatch({
      actionType: Constants.MY_LIKES_RECEIVED,
      likes: likes
    });
  },

  receiveMyLike: function(like){
    AppDispatcher.dispatch({
      actionType: Constants.MY_LIKE_RECEIVED,
      like: like
    });
  },

  updateMyLike: function(like){
    AppDispatcher.dispatch({
      actionType: Constants.MY_LIKE_UPDATED,
      like: like
    });
  },

  receiveMyFans: function(likes){
    AppDispatcher.dispatch({
      actionType: Constants.MY_FANS_RECEIVED,
      likes: likes
    });
  },

  receiveMyFan: function(like){
    AppDispatcher.dispatch({
      actionType: Constants.MY_FAN_RECEIVED,
      like: like
    });
  },

  updateMyFan: function(like){
    AppDispatcher.dispatch({
      actionType: Constants.MY_FAN_UPDATED,
      like: like
    });
  }
}

module.exports = ApiLikeActions;
