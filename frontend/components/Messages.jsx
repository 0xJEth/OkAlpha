var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiMessageUtil = require('../util/api_message_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    UserItem = require('./UserItem'),
    History = require('react-router').History,
    MessageStore = require('../stores/messages'),
    NewMessage = require('./NewMessage'),
    MessageDetails = require('./MessageDetails'),
    UserStore = require('../stores/users');

var Messages = React.createClass({
  mixins: [LinkedStateMixin, History],

  getStateFromStore: function () {
    var current_user_id = parseInt(this.props.routeParams.id);
    var messages = MessageStore.allMyReceivedMessages(current_user_id);
    var count = 0;
    messages.forEach(function(message){
      if (!message.read) {
        count += 1;
      }
    })
    return ({
      current_user_id: current_user_id,
      mySentMessages: MessageStore.allMySentMessages(current_user_id),
      myReceivedMessages: messages,
      unreadMessageCount: count,
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

  showMessage: function(event) {
    event.preventDefault();
    this.setState({messageDetails: parseInt(event.currentTarget.id)})
  },

  deleteMessage: function(event){
    event.preventDefault();
    var message = MessageStore.find(parseInt(event.target.id));
    ApiMessageUtil.deleteMessage(message);
  },

  render: function () {
    if (!this.state.mySentMessages || !this.state.myReceivedMessages || !this.state.current_user_id) {
      return <div>Loading</div>
    } else {

      var messageReceivedContainer = [];
      this.state.myReceivedMessages.forEach(function(message) {
        var user = UserStore.find(parseInt(message.sender_id));
        var date = MessageStore.dateToString(message.created_at)
        if (user) {
          if (message.read) {
            var read = "read";
          } else {
            var read = "unread";
          }
          messageReceivedContainer.unshift(
            <div key={message.id}>
              <button title="delete" className="remove-interest" id={message.id} onClick={this.deleteMessage}>X</button>
              <li onClick={this.showMessage} id={message.id} className="message-list-item">
                <div className={read}>
                  {user.username}
                  <span className="date">{date}</span>
                </div>
              </li>
            </div>
          )
        }
      }.bind(this))
      messageReceivedContainer.unshift(<li key={1001} className="message-label">User<span className="date-label">Date</span></li>);
      if (messageReceivedContainer.length === 1) {
        messageReceivedContainer[0] = <li key={1002} className={"no messages"}>No messages</li>;
      }

      var messageSentContainer = [];
      this.state.mySentMessages.forEach(function(message) {
        var user = UserStore.find(parseInt(message.receiver_id));
        var date = MessageStore.dateToString(message.created_at)
        if (user) {
          messageSentContainer.unshift(
            <div key={message.id}>
              <button title="delete" className="remove-interest" id={message.id} onClick={this.deleteMessage}>X</button>
              <li onClick={this.showMessage} id={message.id} className="message-list-item">
                <div className="read">
                  {user.username}
                  <span className="date">{date}</span>
                </div>
              </li>
            </div>
          )
        }
      }.bind(this))
      messageSentContainer.unshift(<li key={1003} className="message-label">User<span className="date-label">Date</span></li>);
      if (messageSentContainer.length === 1) {
        messageSentContainer[0] = <li key={1004} className={"no messages"}>No messages</li>;
      }
    }

    if (this.state.messageDetails) {
      var detailsClassName = "message-details";
    } else {
      var detailsClassName = "message-details-hidden";
    }

    return (
      <div className="whole">
        <div className="message-container">
          <div className="message-panel">
            <ul className="message-ul">
              <h2 className="h2">Inbox:</h2>
              {messageReceivedContainer}
            </ul>
            <br/><br/>
            <ul className="message-ul">
              <h2 className="h2">Sent Messages:</h2>
              {messageSentContainer}
            </ul>
            <br/><br/><br/><br/>
            <h3 className="h3">Send New Message: </h3>
            <NewMessage key={this.state.current_user_id} currentUserId={this.state.current_user_id}/>
          </div>
          <div className={detailsClassName}>
            <MessageDetails key={this.state.messageDetails} messageId={this.state.messageDetails} currentUserId={this.state.current_user_id}/>
          </div>
        </div>
        <footer>
          <a className="nav-button" href="#">Back</a>
        </footer>
      </div>
    );
  }
});

module.exports = Messages;
