var React = require('react'),
    ReactRouter = require('react-router'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    History = require('react-router').History,
    UserStore = require('../stores/users'),
    Badge = require('./Badge'),
    ApiUserUtil = require('../util/api_user_util');

module.exports = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    var current_user = UserStore.find(parseInt(this.props.currentUserId));
    return ({
      current_user: current_user,
      id: parseInt(this.props.currentUserId)
    })
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function(newProps) {
    var current_user = UserStore.find(parseInt(newProps.currentUserId));
    this.setState({current_user: current_user, unread_count: newProps.messageCount})
  },

  componentWillUnmount: function() {
      console.log("header unmounting");
  },

  handleMatchesButton: function (event) {
    event.preventDefault();
    var current_user = this.state.current_user;
    this.history.pushState(current_user, '/likes/');
  },

  handleMessagesButton: function (event) {
    event.preventDefault();
    var current_user = this.state.current_user;
    this.history.pushState(current_user, '/messages/');
  },

  handleEditProfileButton: function (event) {
    event.preventDefault();
    var current_user = this.state.current_user;
    this.history.pushState(current_user, '/profile/');
  },

  render: function () {
    if (!this.state.current_user) {
      return <div>loading</div>
    };

    return (
      <nav className="header-nav">
        <div id="profile-link" onClick={this.handleEditProfileButton}>
          <img id="img-icon" src={this.state.current_user.image_url}></img>
          <a id="profile-text" className="header-button">My Profile</a>
        </div>
        <h1 className="header-logo">
          <a id="home" className="header-button" href="#">Home</a>
          <a id="matches" className="header-button" onClick={this.handleMatchesButton}>My Matches</a>
          <a id="messages" className="header-button" onClick={this.handleMessagesButton}>
            <div>My Messages</div>
            <Badge currentUserId={this.state.current_user.id}/>
          </a>
        </h1>
      </nav>
    );
  }
});
