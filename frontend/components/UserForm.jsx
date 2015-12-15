var React = require('react');
var ReactRouter = require('react-router');

var UserForm = React.createClass({
  mixins: [LinkedStateMixin],
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      description: "",
      seating: 2
    };
  },

  handleSubmit: function(event){
    event.preventDefault();
  },

  navigateToSearch: function(){
    this.props.history.pushState(null, "/");
  },

  handleCancel: function(event){
    event.preventDefault();
  },

  render: function () {

    return (
      <div>
        Fill out your profile
      </div>
    );
  }
});

module.exports = UserForm;
