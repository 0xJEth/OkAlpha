var React = require("react");

module.exports = React.createClass({
  render: function () {
    return(
      <div key={this.props.user.id}>
        <img className="larger-image" src={this.props.user.image_url}/>
      </div>
    );
  }
});
