var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiLikeUtil = require('../util/api_like_util'),
    LikeStore = require('../stores/likes'),
    UserStore = require('../stores/users');

var Star = React.createClass({
  getStateFromStore: function () {
    for (var id in LikeStore.allMyLikes()) {
      if (myLikes[id].liked_id === this.props.user.id) {
        return {star: true};
      }
    }
    return {star: false};
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.myLikeListener = LikeStore.addListener(this._myLikeChanged);
    ApiLikeUtil.fetchMyLike(parseInt(this.props.user.id));
  },

  componentWillUnmount: function () {
    this.myLikeListener.remove();
  },

  _myLikeChanged: function () {
    this.setState(this.getStateFromStore());
  },

  handleLike: function(event) {
    event.preventDefault;
    var starState = this.getStateFromStore().star;
    var user_liked = UserStore.find(parseInt(this.props.user.id));
    var current_user = LikeStore.
    ApiLikeUtil.updateMyLike(user_liked.id)
    // return {star: !starState}
  },

  render: function () {
    if (typeof this.state.star === 'undefined') {
      return <div></div>
    }
    return (
      <form className="star-form">
        <input onClick={this.handleLike} id="star-checkbox" type="checkbox" name="like" value="star"/>Like!
      </form>
    );
  }
});

module.exports = Star;
