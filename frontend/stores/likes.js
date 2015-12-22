var Store = require('flux/utils').Store,
    Constants = require('../constants/constants'),
    AppDispatcher = require('../dispatcher/dispatcher');

var LikeStore = new Store(AppDispatcher);
var _likes = {};

var resetMyLikes = function(likes){
  _likes = {};
  likes.forEach(function (like) {
    _likes[like.id] = like;
  });
};

var resetMyLike = function (like) {
  _likes[like.id] = like;
};

var updateMyLike = function (like) {
  console.log(this);
};

var resetFanLikes = function(likes){
  _likes = {};
  likes.forEach(function (like) {
    _likes[like.id] = like;
  });
};

var resetFanLike = function (like) {
  _likes[like.id] = like;
};

var updateFanLike = function (like) {
  _likes[like.id] = like;
};

LikeStore.allMyLikes = function (user_id) {
  var myLikes = [];
  for (var id in _likes) {
    if (_likes[id].user_id = user_id) {
      likes.push(_likes[id]) ;
    }
  }
  return myLikes;
};

LikeStore.allMyFans = function (user_id) {
  var myFans = [];
  for (var id in _likes) {
    if (_likes[id].liked_id = user_id) {
      likes.push(_likes[id]) ;
    }
  }
  return myFans;
};

LikeStore.find = function (id) {
  return _likes[id];
}

LikeStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.MY_LIKES_RECEIVED:
      resetMyLikes(payload.likes);
      break;
    case Constants.MY_LIKE_RECEIVED:
      resetMyLike(payload.like);
      break;
    case Constants.MY_LIKE_UPDATED:
      updateMyLike(payload.like);
      break;
    case Constants.MY_FANS_RECEIVED:
      resetFanLikes(payload.likes);
      break;
    case Constants.MY_FAN_RECEIVED:
      resetFanLike(payload.like);
      break;
    case Constants.MY_FAN_UPDATED:
      updateFanLike(payload.like);
      break;
  }
  LikeStore.__emitChange();
};

module.exports = LikeStore;
