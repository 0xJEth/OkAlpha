var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiInterestUtil = require('../util/api_interest_util'),
    InterestStore = require('../stores/interests'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    UserItem = require('./UserItem'),
    History = require('react-router').History,
    UserStore = require('../stores/users');

var Matches = React.createClass({
  mixins: [LinkedStateMixin, History],

  getStateFromStore: function () {
    var current_user_id = parseInt(this.props.id);
    return ({
      current_user_id: current_user_id,
      myMatches: InterestStore.allMyMatches(current_user_id)
    })
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.matchListener = InterestStore.addListener(this._matchChanged);
    this.userListener = UserStore.addListener(this._matchChanged);
    ApiInterestUtil.fetchInterests();
    ApiUserUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.matchListener.remove();
    this.userListener.remove();
  },

  _matchChanged: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    if (!this.state.myMatches) {
      return <div></div>
    } else {
      var matchContainer = [];
      this.state.myMatches.forEach(function(interest) {
        var user = UserStore.find(interest.user_id);
        matchContainer.push(<UserItem key={user.id} user={user} className="like-list-item"/>)
        matchContainer.push(<p className="match-text">{"likes " + interest.interest}</p>)
      })
    }

    return (
      <ul className="likes-div">
        <h3 className="h3">Recommended Matches:</h3>
        {matchContainer}
      </ul>
    );
  }
});

module.exports = Matches;
