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
    return MessageStore.find(parseInt(this.props.messageId));
  },

  getInitialState: function () {
    var current_user_id = this.props.currentUserId;
    return ({
      current_user_id: current_user_id,
      body: "",
      sender: "",
      receiver: "",
      created_at: ""
    })
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.messageId) {
      var message = MessageStore.find(parseInt(newProps.messageId));
      this.setState({
        body: message.body,
        sender: UserStore.find(parseInt(message.sender_id)),
        receiver: UserStore.find(parseInt(message.receiver_id)),
        created_at: message.created_at
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

  showDetail: function (event) {
    var current_user = UserStore.find(parseInt(this.state.current_user_id));
    var user = UserStore.find(parseInt(event.target.id));
    this.history.pushState(current_user, '/user/' + user.id)
  },

  render: function () {
    if (!this.state.body) {
      return (<div></div>)
    } else {
      if (this.state.sender.id === this.state.current_user_id) {
        var user = this.state.receiver;
        var title = <h2>Message to {user.username}:</h2>;
      } else {
        var user = this.state.sender;
        var title = <h3>Message from {user.username}:</h3>;
      }
      var time = MessageStore.dateToString(this.state.created_at);
      return (
        <div>
          <li key={user.id} onClick={this.showDetail} className="message-image">
            <img id={user.id} className="message-img" src={user.image_url}/>
          </li>
          <div className="title-container">
            {title}
            <div className="time">Sent at {time}</div>
            <div className="message-body">{this.state.body}</div>
          </div>
          <br/><br/>
        </div>
      );
    }
  }
});

module.exports = MessageDetails;
