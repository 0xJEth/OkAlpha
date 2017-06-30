var React = require('react'),
    ReactRouter = require('react-router'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    History = require('react-router').History,
    UserStore = require('../stores/users'),
    Cloud = require('./Cloud'),
    Interests = require('./Interests'),
    Header = require('./Header'),
    ApiUserUtil = require('../util/api_user_util');

var LinkedStateRadioGroupMixin = {
  radioGroup: function(key) {
    return {
      valueLink: function(value) {
        return {
          value : this.state[key] == value,
          requestChange: function() {
            var s = {};
            s[key] = value;
            this.setState(s)
          }.bind(this)
        }
      }.bind(this)
    }
  }
}

module.exports = React.createClass({
  mixins: [LinkedStateMixin, History, LinkedStateRadioGroupMixin],

  blankAttrs: {
    email: "",
    gender: "",
    preferred_gender: "",
    bio: ""
  },

  getStateFromStore: function () {
    var user = UserStore.currentUser();
    if (user) {
      return ({
        user: user,
        gender: user.gender,
        preferred_gender: user.preferred_gender
      })
    } else {
      return ({
        user: null,
        gender: null,
        preferred_gender: null
      })
    }
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._userChanged);
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
      this.history.pushState(null, "/", {});
    }.bind(this));
    this.setState(this.blankAttrs);
  },

  render: function () {
    if (!this.state.user) {
      return <div>loading</div>
    };

    var gender = this.radioGroup("gender");
    var preferred_gender = this.radioGroup("preferred_gender");

    var user = this.state.user;

    if (this.state.gender != "male" && this.state.gender!= "female") {
      var linkstate = this.linkState("gender");
      var genderState = this.state.gender;
    } else {
      var linkstate = "";
      var genderState = "";
    }

    if (
        this.state.preferred_gender!= "male" &&
        this.state.preferred_gender!= "female" &&
        this.state.preferred_gender!= "no preference"
        )
    {
      var preferredlinkstate = this.linkState("preferred_gender");
      var preferredGenderState = this.state.preferred_gender;
    } else {
      var preferredlinkstate = "";
      var preferredGenderState = "";
    }

    var profileForm = (
      <div className="attr-form">
        <h3>Tell us about yourself!</h3>
        <form onSubmit={this.handleProfileSubmit}>
          <label className="profile-label">Email address :</label>
          <input type="text" defaultValue={user.email} valueLink={this.linkState("email")}/>
          <br/>
          <label className="profile-label">Your gender :</label>
            <br/>
            <input type="radio" name="gender" checkedLink={gender.valueLink("male")}/>
            <label>Male</label>
            <br/>
            <input type="radio" name="gender" checkedLink={gender.valueLink("female")}/>
            <label>Female</label>
            <br/>
            <input type="radio" name="gender" checkedLink={gender.valueLink(genderState)}/>
            <label>Other</label>
            <input id="profile-textbox1" type="text" valueLink={linkstate}/>
            <br/><br/>
          <label className="profile-label">Gender interested in :</label>
            <br/>
            <input type="radio" name="preferred-gender" checkedLink={preferred_gender.valueLink("male")}/>
            <label>Male</label>
            <br/>
            <input type="radio" name="preferred-gender" checkedLink={preferred_gender.valueLink("female")}/>
            <label>Female</label>
            <br/>
            <input type="radio" name="preferred-gender" checkedLink={preferred_gender.valueLink("no preference")}/>
            <label>No preference</label><br/>
            <input type="radio" name="preferred-gender" checkedLink={preferred_gender.valueLink(preferredGenderState)}/>
            <label>Other</label>
            <input id="profile-textbox2" type="text" valueLink={preferredlinkstate}/>

            <br/><br/>
          <label className="profile-label">About me :</label>
          <textarea cols="40" rows="5" defaultValue={user.bio} valueLink={this.linkState("bio")}></textarea>
          <br/>
          <input id="update" className="profile-button" type="submit" value="Save"/>
          <a className="profile-button" href="#">Cancel</a>
        </form>
      </div>
  );
    return (
      <div className="profile-cont">
        <div className="profile-form">
          <Cloud key={user.id} user={user}/>
          {profileForm}
          <Interests user={user}/>
        </div>

      </div>
    );
  }
});
