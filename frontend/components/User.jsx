var React = require('react'),
    ReactRouter = require('react-router'),
    UserForm = require('./UserForm'),
    SearchBar = require('./SearchBar'),
    ApiUserUtil = require('../util/api_user_util'),
    UserStore = require('../stores/users'),
    History = require('react-router').History,
    UserItem = require('./UserItem');

function _getAllUsers() {
  return UserStore.all();
}

var User = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      users: _getAllUsers()
    };
  },

  // getCurrentUser: function() {
  //   var current_user = ApiUserUtil.fetchCurrentUser();
  // },

  _usersChanged: function() {
    this.setState({users: UserStore.all()});
  },

  componentDidMount: function() {
    this.usersListener = UserStore.addListener(this._usersChanged);
    ApiUserUtil.fetchUsers();
  },

  componentWillUnmount: function() {
    this.usersListener.remove();
  },

  searchResults:function(string) {
    ApiUserUtil.fetchSearchResults(string)
  },

  showDetail: function (event) {
    user = UserStore.find(event.target.id)
    this.history.pushState(this.state, '/user/' + user.id)
  },

  render: function () {
    return (
      <div>
        <div className="container">
          <ul className="side-scroll-ul">
            {this.state.users.map(function(user) {
              if (user.image_url) {
                return (
                  <li key={user.id} onClick={this.showDetail} className="side-scroll-li">
                    <img id={user.id} className="side-scroll-img" src={user.image_url}/>
                    <span className="side-scroll-text">{user.username}</span>
                  </li>
                )
              }
            }.bind(this))}
          </ul>
        </div>
        <SearchBar className="search-container"/>
      </div>
    );
  }
});

module.exports = User;

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
