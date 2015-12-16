var React = require('react'),
    ReactRouter = require('react-router'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../util/app_util');


var UserForm = React.createClass({
  mixins: [LinkedStateMixin],
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      email: "",
      image_url: "",
      gender: "",
      preferred_gender: "",
      bio: "",
      interests: ""
    };
  },

  handleProfileSubmit: function(event){
    event.preventDefault();
    var profile = Object.assign({}, this.state);
    ApiUtil.updateUser(profile);
    this.navigateToIndex();
  },

  handleInterestSubmit: function(event){
    event.preventDefault();
    var interests = Object.assign({}, this.state);
    ApiUtil.createInterests(interests);
    this.navigateToIndex();
  },

  navigateToIndex: function(){

  },

  handleCancel: function(event){
    event.preventDefault();
    this.navigateToIndex();
  },

  render: function () {

    var profileForm = (
      <div>
        <h3>Tell us about yourself!</h3>
        <form className="new-profile" onSubmit={this.handleProfileSubmit}>
          <label>Email address </label>
          <input type="text" valueLink={this.linkState('email')}/>
          <br/>
          <label>Your gender </label>
          <input type="text" valueLink={this.linkState('gender')}/>
          <br/>
          <label>Gender you're interested in dating </label>
          <input type="text" value={this.linkState('preferred_gender')}/>
          <br/>
          <label>Short bio </label>
          <input type="text" value={this.linkState('bio')}/>
          <br/>
          <input type="submit" value="Update"/>
        </form>
        <br/><br/>
        <h4>What are you interested in?</h4>
        <form className="new-interests" onSubmit={this.handleInterestSubmit}>
          <input type="submit" value="Update"/>
        </form>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>
  );

    return (
      <div>
        {profileForm}
      </div>
    );
  }
});

module.exports = UserForm;
