var React = require('react'),
    ReactRouter = require('react-router'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    UserStore = require('../stores/users'),
    InterestStore = require('../stores/interests'),
    History = require('react-router').History,
    ApiInterestUtil = require('../util/api_interest_util'),
    ApiUserUtil = require('../util/api_user_util');

var Interests = React.createClass({
      mixins: [LinkedStateMixin, History],

  blankInt: {
    interest: ""
  },

  getStateFromStore: function () {
    var current_user_id = parseInt(this.props.user.id);
    return ({
      interests: InterestStore.allMyInterests(current_user_id),
      user_id: current_user_id
    })
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.interestListener = InterestStore.addListener(this._interestChanged);
    this.userListener = UserStore.addListener(this._interestChanged);
    ApiInterestUtil.fetchInterests();
    ApiUserUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.interestListener.remove();
    this.userListener.remove();
  },

  _interestChanged: function () {
    this.setState(this.getStateFromStore());
  },

  handleInterestSubmit: function(event){
    event.preventDefault();
    this.state.interests.push(this.state.interest)
    var interest = {user_id: this.props.user.id, interest: this.state.interest}
    ApiInterestUtil.updateInterest(interest)
    this.setState(this.blankInt);
  },

  removeInterest: function(event){
    event.preventDefault();
    var interest = InterestStore.find(parseInt(event.target.id));
    ApiInterestUtil.deleteInterest(interest);
  },

  render: function () {
    if (!this.state.interests) {
      return <div></div>
    } else {

      var interestsContainer = [];
      this.state.interests.forEach(function(interest) {
        if (typeof interest.interest === "undefined") {
          var interestCapitalized = "";
        } else {
          var interestCapitalized = interest.interest.charAt(0).toUpperCase() + interest.interest.slice(1);
        }
        interestsContainer.push(
          <li className="interest-item" key={interest.id}>
            {interestCapitalized}
            <button title="delete" className="remove-interest" id={interest.id} onClick={this.removeInterest}>X</button>
          </li>
        )
      }.bind(this))

      return (
        <div className="interest-form">
          <h3>What are you interested in?</h3>
            <ul className="interest-list">
              {interestsContainer}
            </ul>
          <form className="interest-submit-form" onSubmit={this.handleInterestSubmit}>
            <input className="profile-button" type="submit" value="Add Interest"/>
            <input type="text" valueLink={this.linkState("interest")}/>
          </form>
        </div>
      );
    }
  }

})

module.exports = Interests;
