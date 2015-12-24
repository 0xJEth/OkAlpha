var React = require('react'),
    ReactRouter = require('react-router'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    UserStore = require('../stores/users'),
    History = require('react-router').History,
    Cloud = require('./Cloud'),
    ApiUserUtil = require('../util/api_user_util');


module.exports = React.createClass({
  mixins: [LinkedStateMixin, History],

  blankAttrs: {
    email: "",
    gender: "",
    preferred_gender: "",
    bio: ""
  },
  
  getStateFromStore: function () {
    return { user: UserStore.find(parseInt(this.props.routeParams.id)) };
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUserUtil.fetchUser(parseInt(newProps.routeParams.id));
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._userChanged);
    ApiUserUtil.fetchUser(parseInt(this.props.routeParams.id));
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  _userChanged: function () {
    this.setState(this.getStateFromStore());
  },

  handleProfileSubmit: function(event){
    event.preventDefault();
    var user = UserStore.find(parseInt(this.props.routeParams.id));
    Object.keys(this.state.user).forEach(function (key) {
      if (this.state[key]) {
        user[key] = this.state[key]
      }
    }.bind(this))
    ApiUserUtil.updateProfile(user, function (id) {
      this.history.pushState(null, "/user/" + id, {});
    }.bind(this));
    this.setState(this.blankAttrs);
  },

  handleCancel: function(event){
    event.preventDefault();
  },

  render: function () {
    if (!this.state.user) {
      return <div>loading</div>
    }

    var user = UserStore.find(parseInt(this.props.routeParams.id));

    var profileForm = (
      <div className="attr-form">
        <h3>Tell us about yourself!</h3>
        <form onSubmit={this.handleProfileSubmit}>
          <label className="profile-label">Email address :</label>
          <input type="text" defaultValue={user.email} valueLink={this.linkState("email")}/>
          <br/>
          <label className="profile-label">Your gender :</label>
          <input type="text" defaultValue={user.gender} valueLink={this.linkState("gender")}/>
          <br/>
          <label className="profile-label">Gender interested in :</label>
          <input type="text" defaultValue={user.preferred_gender} valueLink={this.linkState("preferred_gender")}/>
          <br/><br/>
          <label className="profile-label">About me :</label>
          <textarea cols="40" rows="5" defaultValue={user.bio} valueLink={this.linkState("bio")}></textarea>
          <br/>
          <input className="profile-button" type="submit" value="Update"/>
        </form>
        <br/><br/>
        <h4>What are you interested in?</h4>
        <button id="update-button" className="profile-button" onClick={this.handleCancel}>Cancel</button>
      </div>
  );
    return (
      <div>
        <div className="profile-form">
          <Cloud key={user.id} user={user}/>
          {profileForm}
        </div>
        <footer id="footer">
          <a className="nav-button" href="#">Back</a>
        </footer>
      </div>
    );
  }
});
