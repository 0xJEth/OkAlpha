var React = require('react');
var ReactRouter = require('react-router');
var UserForm = require('./UserForm')

var User = React.createClass({
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
