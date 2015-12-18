var React = require('react'),
    ReactRouter = require('react-router'),
    UserForm = require('./UserForm'),
    SearchBar = require('./SearchBar'),
    ApiUtil = require('../util/app_util'),
    UserStore = require('../stores/users'),
    UserItem = require('./UserItem');

function _getAllUsers() {
  return UserStore.all();
}

var User = React.createClass({
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
    this.userListener = UserStore.addListener(this._usersChanged);
    ApiUtil.fetchUsers();
  },

  componentWillUnmount: function() {
    this.userListener.remove();
  },

  searchResults:function(string) {
    ApiUtil.fetchSearchResults(string)
  },

  render: function () {

    return (
      <ul> Users :
          <SearchBar/>

      </ul>
    );
  }
});

module.exports = User;
