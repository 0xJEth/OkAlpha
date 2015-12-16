var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],

  showDetail: function () {
    this.history.pushState(null, '/user/' + this.props.user.id, {});
  },

  render: function () {
    return(
      <li onClick={this.showDetail} className="user-item">
        <p>{this.props.user.username}</p>
      </li>
    );
  }
});
