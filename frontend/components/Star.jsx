var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiLikeUtil = require('../util/api_like_util'),
    LikeStore = require('../stores/likes'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    History = require('react-router').History,
    UserStore = require('../stores/users');

var Star = React.createClass({
  mixins: [LinkedStateMixin, History],

  getStateFromStore: function () {
    var current_user_id = parseInt(this.props.currentUserId);
    var likes = LikeStore.allMyLikes(current_user_id);
    if (likes.length === 0) {
      var starState = false;
    } else {
      for (var i in likes) {
        if (likes[i].liked_id === parseInt(this.props.user.id)) {
          var starState = true;
          break;
        } else {
          var starState = false;
        }
      }
    }
    var fans = LikeStore.allMyFans(current_user_id)
    if (fans.length === 0) {
      var fansState = false;
    } else {
      for (var i in fans) {
        if (fans[i].user_id === parseInt(this.props.user.id)) {
          var fanState = true;
          break;
        } else {
          var fanState = false;
        }
      }
    }
    return ({liked_id: this.props.user.id, user_id: current_user_id, star: starState, fan: fanState})
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.likeListener = LikeStore.addListener(this._likeChanged);
    this.userListener = UserStore.addListener(this._likeChanged);
    ApiLikeUtil.fetchLikes();
    ApiUserUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.likeListener.remove();
    this.userListener.remove();
  },

  _likeChanged: function () {
    this.setState(this.getStateFromStore());
  },

  handleLike: function(event) {
    event.preventDefault;
    if (this.state.star) {
      var like = LikeStore.findLike(parseInt(this.state.user_id), parseInt(this.state.liked_id));
      ApiLikeUtil.deleteLike(like);
    } else {
      var like = {user_id: parseInt(this.state.user_id), liked_id: parseInt(this.state.liked_id)};
      ApiLikeUtil.updateLike(like);
    }
  },

  render: function () {
    if (typeof this.state.star === 'undefined' && !!this.state.star || !this.state.user_id) {
      return <div></div>
    }
    var username = UserStore.find(parseInt(this.state.liked_id)).username;
    if (this.state.star) {
      var checkbox = <input className="like-checkbox" onChange={function(){}} type="checkbox" checked/>
      var text = "I'm no longer interested in " + username;
    } else if (!this.state.star) {
      var checkbox = <input className="like-checkbox" onChange={function(){}} type="checkbox"/>
      var text = "Let " + username + " know that you're intested!"
    }
    if (this.state.fan) {
      innerHtml = this.props.user.username + " is interested in you!"
      var fanView = <p className="fan-boolean">{innerHtml}</p>;
    } else {
      var fanView = <p className="fan-boolean"></p>
    }
    return (
      <div className="star">
        {fanView}
        <form className="star-form">
          {checkbox}<label htmlFor="like"></label><span onClick={this.handleLike}>{text}</span>
        </form>
      </div>
    );
  }
});

module.exports = Star;
