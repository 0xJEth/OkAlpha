var React = require('react'),
    ReactRouter = require('react-router'),
    UserForm = require('./UserForm'),
    ApiUtil = require('../util/app_util')
    UserStore = require('../stores/users');

function _getAllUsers() {
  return UserStore.all();
}

var User = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  _usersChanged: function(){
    this.setState({users: _getAllUsers()});
  },

  getInitialState: function(){
    return {
      users: _getAllUsers(),
      clickedLoc: null,
    };
  },

  componentDidMount: function(){
    this.userListener = UserStore.addListener(this._usersChanged);
    // ApiUtil.fetchUsers();
  },

  componentWillUnmount: function(){
    this.userListener.remove();
  },

  render: function () {

    return (
      <div>
        <div className="user-form">
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = User;
