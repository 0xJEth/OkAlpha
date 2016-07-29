var React = require('react'),
    ReactRouter = require('react-router'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    History = require('react-router').History,
    UserStore = require('../stores/users'),
    ApiMessageUtil = require('../util/api_message_util'),
    MessageStore = require('../stores/messages');

module.exports = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    var current_user_id = parseInt(this.props.currentUserId);
    var current_user = UserStore.find(current_user_id);
    var messages = MessageStore.allMyReceivedMessages(current_user_id);
    var count = 0;
    messages.forEach(function(message) {
      if (!message.read && !message.receiver_delete) {
        count += 1;
      }
    });
    return ({
      current_user: current_user,
      id: current_user_id,
      messages: messages,
      count: count
    })
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.messageListener = MessageStore.addListener(this._messagesChanged);
    ApiMessageUtil.fetchMessages();
  },

  componentWillUnmount: function () {
    this.messageListener.remove();
  },

  _messagesChanged: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    if (!this.state.count) {
      return <div></div>
    };
    if (this.state.count > 0) {
      var className = "show";
    } else {
      var className = "hide"
    }
    return (
      <span className={className} id="badge">{this.state.count}</span>
    );
  }
});
