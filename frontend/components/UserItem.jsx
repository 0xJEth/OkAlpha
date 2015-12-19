var React = require('react'),
    History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],

  showDetail: function () {
    var state = this.props.user;
    this.history.pushState(state, '/user/' + state.id)
  },

  render: function () {
    return(
      <li onClick={this.showDetail} className="user-item">
        {this.props.user.username}
      </li>
    );
  }
});
