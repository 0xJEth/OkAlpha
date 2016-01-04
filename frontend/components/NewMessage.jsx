var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiMessageUtil = require('../util/api_message_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    UserItem = require('./UserItem'),
    History = require('react-router').History,
    MessageStore = require('../stores/messages'),
    UserStore = require('../stores/users');

var NewMessage = React.createClass({
  mixins: [LinkedStateMixin, History],

  blankAttrs: {
    receiver: "",
    body: "",
  },

  getStateFromStore: function () {
    var current_user_id = parseInt(this.props.currentUserId);

    if (this.props.userId) {
      var receiver = UserStore.find(parseInt(this.props.userId));
    } else {
      var receiver = {username: ""};
    }

    return ({
      current_user_id: current_user_id,
      receiver: receiver,
      body: ""
    })
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.messageListener = MessageStore.addListener(this._messageChanged);
    this.userListener = UserStore.addListener(this._messageChanged);
    ApiMessageUtil.fetchMessages();
    ApiUserUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.messageListener.remove();
    this.userListener.remove();
  },

  _messageChanged: function () {
    this.setState(this.getStateFromStore());
  },

  findUsername: function(string) {
    string = string.split(" ");
    var users = UserStore.all();
    for (var i = 0; i < users.length; i++) {
      var name = users[i].username.split(" ");
      for (var j = 0; j < name.length; j++) {
        for (var k = 0; k < string.length; k++) {
          if (name[j].toLowerCase() === string[k].toLowerCase()) {
            return users[i];
          }
        }
      }
    }
  },

  sendMessage: function (event) {
    event.preventDefault();
    var string = event.target[0].value;
    var receiver = this.findUsername(string);
    if (receiver.length === 0) {
      alert("No user found with that name");
    } else if (receiver.length > 1) {
      alert("Multiple users found with that name");
    } else {
      var receiver_id = receiver.id;
      var body = event.target[1].value;
      var message = {sender_id: this.state.current_user_id, receiver_id: receiver_id, body: body, read: false};
      var conf = confirm("Confirm send message to " + receiver.username + "?");
      if (conf) {
        ApiMessageUtil.createMessage(message)
        this.setState(this.blankAttrs);
      }
    }
  },

  render: function () {
    if (!this.state.current_user_id) {
      return <div></div>
    }

    var username = this.state.receiver.username;
    return (
      <div>
        <form onSubmit={this.sendMessage} className="new-message-form">
          <input placeholder="Recipient" type="text" defaultValue={username} valueLink={this.linkState("receiver.username")}/>
          <br/>
          <textarea cols="40" rows="6" name="body" valueLink={this.linkState("body")}></textarea>
          <br/>
          <input className="new-message-button" type="submit" value="Send Message"/>
        </form>
      </div>
    );
  }
});

module.exports = NewMessage;
