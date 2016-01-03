var React = require('react'),
    ReactRouter = require('react-router'),
    UserForm = require('./UserForm'),
    SearchBar = require('./SearchBar'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiMessageUtil = require('../util/api_message_util'),
    UserStore = require('../stores/users'),
    MessageStore = require('../stores/messages'),
    History = require('react-router').History,
    Messages = require('./Messages');

var MessageDetails = React.createClass({
  mixins: [History],

  getStateFromStore: function() {
    return MessageStore.find(this.props.messageId);
  },

  getInitialState: function () {
    var current_user_id = this.props.currentUserId;

    if (!this.props.messageId) {
      return ({
        current_user_id: current_user_id,
        message: "",
        body: "",
        sender: "",
        receiver: ""
      })
    } else {
      var message = this.getStateFromStore()
      return ({
        message: message,
        body: message.body,
        sender: UserStore.find(message.sender_id),
        receiver: UserStore.find(message.receiver_id)
      })
    }
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.messageId) {
      var message = MessageStore.find(newProps.messageId)
      this.setState({
        message: message,
        body: message.body,
        sender: UserStore.find(message.sender_id),
        receiver: UserStore.find(message.receiver_id)
      })
      ApiMessageUtil.updateMessage({
        body: message.body,
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        read: true,
        id: message.id
      })
    }
  },

  _messagesChanged: function() {
    this.setState({message: this.getStateFromStore()});
  },

  componentDidMount: function() {
    this.messagesListener = MessageStore.addListener(this._messagesChanged);
    this.userListener = UserStore.addListener(this._messagesChanged);
    ApiMessageUtil.fetchMessages();
    ApiUserUtil.fetchUsers();
  },

  componentWillUnmount: function() {
    this.messagesListener.remove();
    this.userListener.remove();
  },

  render: function () {
    if (!this.state.message) {
      return (<div></div>)
    } else {

      if (this.state.sender.id === this.state.current_user_id) {
        var title = <h3>Message to {this.state.receiver.username}</h3>;
      } else {
        var title = <h3>Message from {this.state.sender.username}</h3>;
      }
      var time = MessageStore.dateToString(this.state.message.created_at);
      return (
        <div>
          {title}
          <div>Sent at {time}</div>
          <br/><br/>
          <div>{this.state.body}</div>
        </div>
      );
    }
  }
});

module.exports = MessageDetails;
