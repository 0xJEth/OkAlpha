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
    this.userListener = UserStore.addListener(this._usersChanged);
    ApiUtil.fetchUsers();
  },

  componentWillUnmount: function() {
    this.userListener.remove();
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
      <ul> Users :
          <div className="side-scroll">
            {this.state.users.map(function (user) {
              if (user.image_url) {
                return (<img onClick={this.showDetail} id={user.id} className="side-scroll-img" src={user.image_url}/>)
              }
            }.bind(this))}
          </div>
          <SearchBar/>
      </ul>
    );
  }
});

module.exports = User;
