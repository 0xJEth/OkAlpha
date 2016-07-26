var React = require('react'),
    History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],

  showDetail: function () {
    var state = this.props.user;
    this.history.pushState(state, '/user/' + state.id)
  },

  render: function () {
    if (this.props.text) {
      var text = this.props.text;
    } else {
      var text = this.props.user.username;
    }
    return(
      <li onClick={this.showDetail} className="user-item">
        {text}
      </li>
    );
  }
});
