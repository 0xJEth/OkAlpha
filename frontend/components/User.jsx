var React = require('react'),
    ReactRouter = require('react-router'),
    UserForm = require('./UserForm'),
    SearchBar = require('./SearchBar'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiMessageUtil = require('../util/api_message_util'),
    UserStore = require('../stores/users'),
    History = require('react-router').History,
    UserItem = require('./UserItem'),
    Header = require('./Header'),
    RecentActivity = require('./RecentActivity');

var User = React.createClass({
  mixins: [History],

  getStateFromStore: function() {
    var current_user = UserStore.currentUser();
    var users = UserStore.all();
    return ({
      current_user: current_user,
      users: users
    })
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._usersChanged);
    var state = this.getStateFromStore();
    var showUsers = this.randomize(state.current_user, state.users);
    this.setState({
      current_user: state.current_user,
      users: state.users,
      showUsers: showUsers
    });
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  _usersChanged: function () {
    var state = this.getStateFromStore();
    var showUsers = this.randomize(state.current_user, state.users);
    this.setState({
      current_user: state.current_user,
      users: state.users,
      showUsers: showUsers
    });
  },

  searchResults:function(string) {
    ApiUserUtil.fetchSearchResults(string)
  },

  showDetail: function (event) {
    var current_user = this.state.current_user;
    var user = UserStore.find(parseInt(event.target.id));
    this.history.pushState(current_user, '/user/' + user.id)
  },

  randomize: function(current_user, users) {
    var showUsers = [];
    if (users.length > 0) {
      var copyUsers = users.slice(0);
      while(showUsers.length < 6 && copyUsers.length > 0) {
        var rand = Math.floor(Math.random() * copyUsers.length);
        var user = copyUsers[rand];
        copyUsers.splice(rand, 1);
        if (
            current_user && user &&
            current_user.id != user.id &&
            user.image_url != "http://res.cloudinary.com/jolinar1013/image/upload/v1451896155/OkAlpha/ljrlqsnwviwsfaykklje.png" &&
            user.image_url != "http://www.gl-assessment.ie/sites/gl/files/images/1414510022_user-128.png"
            )
          {
            if (
                current_user.preferred_gender === "no preference" ||
                current_user.preferred_gender === user.gender ||
                !current_user.preferred_gender ||
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
    if (!this.state.current_user || !this.state.showUsers) {
      return <div>loading</div>
    };
    return (
      <div>
        <div className="container">
          <ul className="side-scroll-ul">
            <li id="header-li" className="side-scroll-li">
              <div  id="header" className="side-scroll-img">Here are some users you might be interested in based on your gender preferences!</div>
              <span id="no-text" className="side-scroll-text"></span>
            </li>
            {this.state.showUsers.map(function(user) {
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
