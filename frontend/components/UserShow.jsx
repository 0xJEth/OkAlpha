var React = require('react');
var ReactRouter = require('react-router');

var UserShow = React.createClass({

  getInitialState: function () {
    var userId = this.props.params.userId;
    var user = this._findUserById(userId) || {} ;
    return { user: user };
  },

  _findUserById: function (id) {
    var res;
     UserStore.all().forEach(function (user) {
      if (id == user.id) {
        res = user;
      }
    }.bind(this));
     return res;
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._userChanged);
    // ApiUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  _userChanged: function () {
    var userId = this.props.params.userId;
    var user = this._findUserById(userId);
    this.setState({ user: user });
  },

  render: function () {

    return (
      <div>
        Your profile is awesome
      </div>
    );
  }
});

module.exports = UserShow;
