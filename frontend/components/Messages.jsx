var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiMessageUtil = require('../util/api_message_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    UserItem = require('./UserItem'),
    History = require('react-router').History,
    MessageStore = require('../stores/messages'),
    MessageDetails = require('./MessageDetails'),
    UserStore = require('../stores/users');

var Messages = React.createClass({
  mixins: [LinkedStateMixin, History],

  blankAttrs: {
    receiver: "",
    body: "",
  },

  getStateFromStore: function () {
    var current_user_id = parseInt(this.props.routeParams.id);
    return ({
      current_user_id: current_user_id,
      mySentMessages: MessageStore.allMySentMessages(current_user_id),
      myReceivedMessages: MessageStore.allMyReceivedMessages(current_user_id),
      receiver: "",
      body: "",
      date: "",
      messageDetails: null
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
    var results = [];
    for (var i = 0; i < users.length; i++) {
      var name = users[i].username.split(" ");
      for (var j = 0; j < name.length; j++) {
        for (var k = 0; k < string.length; k++) {
          if (name[j].toLowerCase() === string[k].toLowerCase()) {
            results.push(users[i]);
          }
        }
      }
    }
    return results
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
      var receiver_id = receiver[0].id;
      var body = event.target[1].value;
      var message = {sender_id: this.state.current_user_id, receiver_id: receiver_id, body: body, read: false};
      var conf = confirm("Confirm send message to " + receiver[0].username + "?");
      if (conf) {
        ApiMessageUtil.createMessage(message)
        this.setState(this.blankAttrs);
      }
    }
  },

  showMessage: function(event) {
    event.preventDefault();
    this.setState({messageDetails: event.currentTarget.id})
  },

  render: function () {
    if (!this.state.mySentMessages || !this.state.myReceivedMessages || !this.state.current_user_id) {
      return <div>Loading</div>
    } else {

      var messageReceivedContainer = [];
      this.state.myReceivedMessages.forEach(function(message) {
        var user = UserStore.find(message.sender_id);
        var date = MessageStore.dateToString(message.created_at)
        if (user) {
          if (message.read) {
            var read = "read";
          } else {
            var read = "unread";
          }
          messageReceivedContainer.push(
            <li onClick={this.showMessage} id={message.id} key={message.id} className={read}>
              {user.username}
              <span>{date}</span>
            </li>
          )
        }
      }.bind(this))

      var messageSentContainer = [];
      this.state.mySentMessages.forEach(function(message) {
        var user = UserStore.find(message.receiver_id);
        var date = MessageStore.dateToString(message.created_at)
        if (user) {
          if (message.read) {
            var read = "read";
          } else {
            var read = "unread";
          }
          messageSentContainer.push(
            <li onClick={this.showMessage} id={message.id} key={message.id} className={read}>
              {user.username}
              <span>{date}</span>
            </li>
          )
        }
      }.bind(this))
    }

    return (
      <div>
        <div>
          <ul className="message-div">
            <h2 className="h3">Inbox:</h2>
            {messageReceivedContainer}
          </ul>
          <br/><br/>
          <ul className="message-div">
            <h2 className="h3">Sent Messages:</h2>
            {messageSentContainer}
          </ul>
          <br/><br/><br/><br/>
          <form onSubmit={this.sendMessage}>
            <h2>New Message:</h2>
            <input type="text" name="receiver" valueLink={this.linkState("receiver")}/>
            <br/>
            <textarea cols="40" rows="6" name="body" valueLink={this.linkState("body")}></textarea>
            <br/>
            <input type="submit" value="Send Message"/>
          </form>
        </div>
        <br/><br/><br/>
        <div>
          <div>
            <MessageDetails messageId={this.state.messageDetails} currentUserId={this.state.current_user_id}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Messages;
