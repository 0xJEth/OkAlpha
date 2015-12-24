var Store = require('flux/utils').Store,
    Constants = require('../constants/constants'),
    UserStore = require('./users'),
    ApiLikeUtil = require('../util/api_like_util'),
    AppDispatcher = require('../dispatcher/dispatcher');

var LikeStore = new Store(AppDispatcher);
var _likes = {};

var resetLikes = function(likes){
  _likes = {};
  likes.forEach(function (like) {
    _likes[like.id] = like;
  });
};

var resetLike = function (like) {
  _likes[like.id] = like;
};

var removeLike = function () {
  var likes = [];
  ApiLikeUtil.fetchLikes();
  likes = LikeStore.allLikes();
};

LikeStore.findLike = function(user_id, liked_id) {
  var myLikes = LikeStore.allMyLikes(user_id);
  for (var i = 0; i < myLikes.length; i++) {
     if (myLikes[i].liked_id === liked_id) {
       return myLikes[i];
     }
   }
   return {};
};

LikeStore.allLikes = function () {
  var likes = [];
  for (var id in _likes) {
    likes.push(_likes[id]) ;
  }
  return likes;
};

LikeStore.allMyLikes = function (user_id) {
  var likes = [];
  for (var id in _likes) {
    if (_likes[id].user_id === user_id) {
      likes.push(_likes[id]) ;
    }
  }
  return likes;
};

LikeStore.find = function (id) {
  return _likes[id];
};

LikeStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.LIKES_RECEIVED:
      resetLikes(payload.likes);
      break;
    case Constants.LIKE_RECEIVED:
      resetLike(payload.like);
      break;
    case Constants.LIKE_REMOVED:
      removeLike(payload.like);
      break;
  }
  LikeStore.__emitChange();
};

module.exports = LikeStore;
