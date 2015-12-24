var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiLikeUtil = require('../util/api_like_util'),
    LikeStore = require('../stores/likes'),
    UserStore = require('../stores/users');

var Star = React.createClass({
  getStateFromStore: function () {
    var current_user = UserStore.currentUser();
    // move logic to store
    var likes = LikeStore.allMyLikes(current_user.id)
    if (likes.length === 0) {
      var starState = false;
    } else {
      for (var id in likes) {
        if (likes[id].liked_id === this.props.user.id) {
          var starState = true;
          break;
        } else {
          var starState = false;
        }
      }
    }
    return ({liked_id: this.props.user.id, user_id: current_user.id, star: starState})
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.likeListener = LikeStore.addListener(this._likeChanged);
    ApiLikeUtil.fetchLikes();
  },

  componentWillUnmount: function () {
    this.likeListener.remove();
  },

  _likeChanged: function () {
    this.setState(this.getStateFromStore());
  },

  handleLike: function(event) {
    event.preventDefault;
    if (this.state.star) {
      var like = LikeStore.findLike(this.state.user_id, this.state.liked_id)
      ApiLikeUtil.deleteLike(like)
    } else {
      var like = {user_id: this.state.user_id, liked_id: this.state.liked_id};
      ApiLikeUtil.updateLike(like)
    }
  },

  render: function () {
    if (typeof this.state.star === 'undefined' && !!this.state.star) {
      return <div></div>
    }
    if (this.state.star) {
      var checkbox = <input onChange={this.handleLike} id="star-checkbox" type="checkbox" name="like" value="star" checked/>
      var text = "Unlike"
    } else if (!this.state.star) {
      var checkbox = <input onChange={this.handleLike} id="star-checkbox" type="checkbox" name="like" value="star"/>
      var text = "Like!"
    }
    return (
      <form className="star-form">
        {checkbox}{text}
      </form>
    );
  }
});

module.exports = Star;
