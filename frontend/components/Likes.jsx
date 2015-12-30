var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiLikeUtil = require('../util/api_like_util'),
    LikeStore = require('../stores/likes'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    UserItem = require('./UserItem'),
    History = require('react-router').History,
    UserStore = require('../stores/users');

var Likes = React.createClass({
  mixins: [LinkedStateMixin, History],

  getStateFromStore: function () {
    var current_user_id = parseInt(this.props.routeParams.id);
    return ({
      current_user_id: current_user_id,
      myLikes: LikeStore.allMyLikes(current_user_id),
      myFans: LikeStore.allMyFans(current_user_id)
    })
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

  render: function () {
    if (!this.state.myLikes || !this.state.myFans) {
      return <div></div>
    } else {

      var likesContainer = [];
      this.state.myLikes.forEach(function(like) {
        var user = UserStore.find(like.liked_id);
        likesContainer.push(<UserItem key={user.id} user={user} className="like-list-item"/>)
      })

      var fansContainer = [];
      this.state.myFans.forEach(function(fan) {
        var user = UserStore.find(fan.user_id);
        fansContainer.push(<UserItem key={user.id} user={user} className="like-list-item"/>)
      })

      var mutualContainer = [];
      if (!this.state.myFans) {
        mutualContainer.push(<div></div>)
      } else {
        this.state.myLikes.forEach(function(like) {
          this.state.myFans.forEach(function(fan) {
            if (like.liked_id === fan.user_id) {
              var user = UserStore.find(like.liked_id);
              mutualContainer.push(<UserItem key={user.id} user={user} className="like-list-item"/>)
            }
          })
        }.bind(this))
      }

      return (
        <div className="likes-container">
          <ul className="likes-div">
            <h3 className="h3" >People I've liked:</h3>
            {likesContainer}
          </ul>
          <ul className="likes-div">
            <h3 className="h3">People who've liked me:</h3>
            {fansContainer}
          </ul>
          <ul className="likes-div">
            <h3 className="h3">My mutual likes:</h3>
            {mutualContainer}
          </ul>
        </div>
      );
    }
  }
});

module.exports = Likes;
