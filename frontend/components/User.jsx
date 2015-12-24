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
function _getCurrentUser() {
  return UserStore.currentUser();
}

var User = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      users: _getAllUsers(),
      current_user: _getCurrentUser()
    };
  },

  _usersChanged: function() {
    this.setState({users: _getAllUsers(), current_user: _getCurrentUser()});
  },

  componentDidMount: function() {
    this.usersListener = UserStore.addListener(this._usersChanged);
    ApiUserUtil.fetchUsers();
    ApiUserUtil.fetchCurrentUser();
  },

  componentWillUnmount: function() {
    this.usersListener.remove();
  },

  searchResults:function(string) {
    ApiUserUtil.fetchSearchResults(string)
  },

  showDetail: function (event) {
    var current_user = this.state.current_user;
    var user = UserStore.find(event.target.id)
    this.history.pushState(current_user, '/user/' + user.id)
  },

  render: function () {
    return (
      <div>
        <div className="container">
          <ul className="side-scroll-ul">
            {this.state.users.map(function(user) {
              if (this.state.current_user && user.image_url && this.state.current_user.id != user.id) {
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
        <SearchBar currentUser={this.state.current_user}className="search-container"/>
      </div>
    );
  }
});

module.exports = User;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
