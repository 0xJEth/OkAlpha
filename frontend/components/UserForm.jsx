var React = require('react'),
    ReactRouter = require('react-router'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    UserStore = require('../stores/users'),
    History = require('react-router').History,
    Cloud = require('./Cloud'),
    ApiUtil = require('../util/app_util');


module.exports = React.createClass({
  mixins: [LinkedStateMixin, History],

  blankAttrs: {
    email: "",
    gender: "",
    preferred_gender: "",
    bio: ""
  },

  getInitialState: function(){
    return { user: UserStore.find(parseInt(this.props.routeParams.id)) };
  },

  handleProfileSubmit: function(event){
    event.preventDefault();
    var user = UserStore.find(parseInt(this.props.routeParams.id));
    Object.keys(this.state.user).forEach(function (key) {
      if (this.state[key]) {
        user[key] = this.state[key]
      }
    }.bind(this))
    ApiUtil.updateProfile(user, function (id) {
      this.history.pushState(null, "/user/" + id, {});
    }.bind(this));
    this.setState(this.blankAttrs);
  },

  handleCancel: function(event){
    event.preventDefault();
  },

  render: function () {

    var user = UserStore.find(parseInt(this.props.routeParams.id));
    var profileForm = (
      <div>
        <h3>Tell us about yourself!</h3>
        <form className="new-profile" onSubmit={this.handleProfileSubmit}>
          <label>Email address </label>
          <input type="text" valueLink={this.linkState("email")}/>
          <br/>
          <label>Your gender </label>
          <input type="text" valueLink={this.linkState("gender")}/>
          <br/>
          <label>Gender you're interested in: </label>
          <input type="text" valueLink={this.linkState("preferred_gender")}/>
          <br/>
          <label>Short bio </label>
          <input type="text" valueLink={this.linkState("bio")}/>
          <br/>
          <input type="submit" value="Update"/>
        </form>
        <br/><br/>
        <h4>What are you interested in?</h4>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>
  );
    return (
      <div>
        <Cloud key={user.id} user={user}/>
        {profileForm}
      </div>
    );
  }
});
