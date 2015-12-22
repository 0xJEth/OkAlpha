var React = require('react'),
    ReactRouter = require('react-router'),
    UserForm = require('./UserForm'),
    SearchBar = require('./SearchBar'),
    ApiUtil = require('../util/app_util'),
    UserStore = require('../stores/users'),
    History = require('react-router').History,
    UserItem = require('./UserItem');

function _getAllUsers() {
  return UserStore.all();
}

var User = React.createClass({
  mixins: [History],

  getInitialState: function (){
    return {
      users: _getAllUsers(),
      clickedLoc: null,
    };
  },

  _usersChanged: function() {
    this.setState({users: UserStore.all()});
  },

  componentDidMount: function() {
    this.usersListener = UserStore.addListener(this._usersChanged);
    ApiUtil.fetchUsers();
  },

  componentWillUnmount: function() {
    this.usersListener.remove();
  },

  searchResults:function(string) {
    ApiUtil.fetchSearchResults(string)
  },

  showDetail: function (event) {
    user = UserStore.find(event.target.id)
    this.history.pushState(this.state, '/user/' + user.id)
  },

  render: function () {
    return (
      <div>
        <ul className="side-scroll-ul">
          {this.state.users.map(function(user) {
            if (user.image_url) {
              return (
                <li onClick={this.showDetail} className="side-scroll-li">
                  <img id={user.id} className="side-scroll-img" src={user.image_url}/>
                  <span id={user.id} className="side-scroll-text">{user.username}</span>
                </li>
              )}
            }.bind(this))}
          </ul>
          <SearchBar/>
      </div>
    );
  }
});

module.exports = User;

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
