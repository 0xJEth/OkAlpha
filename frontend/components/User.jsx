var React = require('react'),
    ReactRouter = require('react-router'),
    UserForm = require('./UserForm'),
    SearchBar = require('./SearchBar'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiMessageUtil = require('../util/api_message_util'),
    UserStore = require('../stores/users'),
    MessageStore = require('../stores/messages'),
    History = require('react-router').History,
    UserItem = require('./UserItem'),
    RecentActivity = require('./RecentActivity');

function _getStateFromStore() {
  var current_user = UserStore.currentUser();
  var myMessages = MessageStore.allMyReceivedMessages(current_user.id);

  return ({
    current_user: current_user,
    users: UserStore.all(),
    messageCount: 0
  })
}

var User = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return _getStateFromStore();
  },

  _usersChanged: function() {
    this.setState(_getStateFromStore());
    var myMessages = MessageStore.allMyReceivedMessages(this.state.current_user.id);
    var unread_count = 0;
    myMessages.forEach(function(message){
      if (!message.read && !message.receiver_delete) {
        unread_count += 1;
      }
    })
    this.setState({messageCount: unread_count});
  },

  componentDidMount: function() {
    this.usersListener = UserStore.addListener(this._usersChanged);
    this.messageListener = MessageStore.addListener(this._usersChanged);
    ApiMessageUtil.fetchMessages();
    ApiUserUtil.fetchUsers();
    ApiUserUtil.fetchCurrentUser();
  },

  componentWillUnmount: function() {
    this.usersListener.remove();
    this.messageListener.remove();
  },

  searchResults:function(string) {
    ApiUserUtil.fetchSearchResults(string)
  },

  showDetail: function (event) {
    var current_user = this.state.current_user;
    var user = UserStore.find(parseInt(event.target.id));
    this.history.pushState(current_user, '/user/' + user.id)
  },

  randomize: function() {
    var showUsers = [];
    if (this.state.users.length > 0) {
      var copyUsers = this.state.users.slice(0);
      while(showUsers.length < 6 && copyUsers.length > 0) {
        var rand = Math.floor(Math.random() * copyUsers.length);
        var user = copyUsers[rand];
        copyUsers.splice(rand, 1);
        if (
            this.state.current_user && user &&
            this.state.current_user.id != user.id &&
            user.image_url != "http://res.cloudinary.com/jolinar1013/image/upload/v1451896155/OkAlpha/ljrlqsnwviwsfaykklje.png" &&
            user.image_url != "http://www.gl-assessment.ie/sites/gl/files/images/1414510022_user-128.png"
            )
          {
            if (
                this.state.current_user.preferred_gender === "no preference" ||
                this.state.current_user.preferred_gender === user.gender ||
                !this.state.current_user.preferred_gender ||
                (user.gender != "male" && user.gender != "female")
                )
              {
                showUsers.push(user);
              }
          }
      }
    }
    return showUsers;
  },

  render: function () {
    if (this.state.messageCount > 0) {
      var badge = document.getElementById("badge");
      badge.className = "show",
      badge.innerHTML = this.state.messageCount;
    }

    var showUsers = this.randomize();
    return (
      <div>
        <div className="container">
          <ul className="side-scroll-ul">
            <li id="header-li" className="side-scroll-li">
                <div  id="header" className="side-scroll-img">Here are some users you might be interested in based on your gender preferences!</div>
                <span id="no-text" className="side-scroll-text"></span>
              </li>
          {showUsers.map(function(user) {
              if (this.state.current_user) {
                return (
                  <li key={user.id} onClick={this.showDetail} className="side-scroll-li">
                    <img id={user.id} className="side-scroll-img" src={user.image_url}/>
                    <span id={user.id} className="side-scroll-text">{user.username}</span>
                  </li>
                )
              }
            }.bind(this))}
          </ul>
        </div>
        <SearchBar currentUser={this.state.current_user} className="search-container"/>
        <RecentActivity currentUser={this.state.current_user} className="recent-activity"/>
      </div>
    );
  }
});

module.exports = User;
