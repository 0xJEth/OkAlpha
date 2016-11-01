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
    Header = require('./Header'),
    UserStore = require('../stores/users');

var Messages = React.createClass({
  mixins: [LinkedStateMixin, History],

  getStateFromStore: function () {
    var user = UserStore.currentUser();
    var current_user_id = user.id;
    var messages = MessageStore.allMyReceivedMessages(current_user_id);
    var count = 0;
    messages.forEach(function(message){
      if (!message.read && !message.receiver_delete) {
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
    this.setState({messageDetails: parseInt(event.currentTarget.id)});
    var message = MessageStore.find(parseInt(event.currentTarget.id));
    if (message.receiver_id === this.state.current_user_id && !message.read) {
      ApiMessageUtil.updateMessage({
        body: message.body,
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        read: true,
        id: message.id,
        created_at: message.created_at,
        receiver_delete: message.receiver_delete,
        sender_delete: message.sender_delete
      })
    }
  },

  deleteMessage: function(event){
    event.preventDefault();
    var id = (parseInt(event.target.id));
    if (id === this.state.messageDetails) {
      this.setState({messageDetails: undefined});
    }
    var message = MessageStore.find(id);
    if (message.sender_id === this.state.current_user_id && !message.receiver_delete) {
      ApiMessageUtil.updateMessage({
        body: message.body,
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        read: message.read,
        id: message.id,
        created_at: message.created_at,
        receiver_delete: message.receiver_delete,
        sender_delete: true
      })
    } else if (message.receiver_id === this.state.current_user_id && !message.sender_delete) {
      ApiMessageUtil.updateMessage({
        body: message.body,
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        read: message.read,
        id: message.id,
        created_at: message.created_at,
        receiver_delete: true,
        sender_delete: message.sender_delete
      })
    } else {
      ApiMessageUtil.deleteMessage(message);
    }
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
          if (!message.receiver_delete) {
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
        }
      }.bind(this))
      messageReceivedContainer.unshift(<li key={1001} className="message-label">User<span className="date-label">Date</span></li>);
      if (messageReceivedContainer.length === 1) {
        messageReceivedContainer[0] = <li key={1002} className={"no-messages"}>No messages</li>;
      }

      var messageSentContainer = [];
      this.state.mySentMessages.forEach(function(message) {
        var user = UserStore.find(parseInt(message.receiver_id));
        var date = MessageStore.dateToString(message.created_at)
        if (user) {
          if (!message.sender_delete) {
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
        }
      }.bind(this))
      messageSentContainer.unshift(<li key={1003} className="message-label">User<span className="date-label">Date</span></li>);
      if (messageSentContainer.length === 1) {
        messageSentContainer[0] = <li key={1004} className="no-messages">No messages</li>;
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
              <h2 className="h2">Inbox</h2>
              {messageReceivedContainer}
            </ul>
            <br/><br/>
            <ul className="message-ul">
              <h2 className="h2">Sent</h2>
              {messageSentContainer}
            </ul>
            <br/><br/><br/><br/>
            <h2 className="h2">Compose New</h2>
            <NewMessage key={this.state.current_user_id} currentUserId={this.state.current_user_id}/>
          </div>
          <div className={detailsClassName}>
            <MessageDetails key={this.state.messageDetails} messageId={this.state.messageDetails} currentUserId={this.state.current_user_id}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Messages;
