var React = require('react'),
    ReactRouter = require('react-router'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    History = require('react-router').History,
    UserStore = require('../stores/users'),
    MessageStore = require('../stores/messages'),
    Messages = require('./Messages'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiMessageUtil = require('../util/api_message_util');

module.exports = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    var current_user = UserStore.find(parseInt(this.props.currentUserId));
    return ({
      current_user: current_user,
      id: parseInt(this.props.currentUserId),
      unread_count: this.props.messageCount
    })
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function(newProps) {
    var current_user = UserStore.find(parseInt(newProps.currentUserId));
    this.setState({current_user: current_user, unread_count: newProps.messageCount})
  },

  handleMatchesButton: function (event) {
    event.preventDefault();
    var current_user = this.state.current_user;
    this.history.pushState(current_user, '/likes/' + this.state.id);
  },

  handleMessagesButton: function (event) {
    event.preventDefault();
    var current_user = this.state.current_user;
    this.history.pushState(current_user, '/messages/' + this.state.id);
  },

  handleEditProfileButton: function (event) {
    event.preventDefault();
    var current_user = this.state.current_user;
    this.history.pushState(current_user, '/profile/' + this.state.id);
  },

  render: function () {
    if (!this.state.current_user) {
      return <div>loading</div>
    };

    return (
      <nav className="header-nav">
        <a id="profile-link" onClick={this.handleEditProfileButton}>
          <img id="img-icon" src={this.state.current_user.image_url}></img>
          <span className="profile-hover">Edit Profile</span>
        </a>
        <h1 className="header-logo">
          <a className="header-button" href="#">OkAlpha</a>
          <a className="header-button" onClick={this.handleMatchesButton}>My Matches</a>
          <a className="header-button" onClick={this.handleMessagesButton}>
            <div>My Messages</div>
            <span className="hidden" id="badge"></span>
          </a>
        </h1>
      </nav>
    );
  }
});
