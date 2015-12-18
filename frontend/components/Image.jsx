var React = require("react");

module.exports = React.createClass({
  render: function () {
    return(
      <div className="image" key={this.props.user.id}>
        <img src={this.props.user.image_url}/>
      </div>
    );
  }
});
