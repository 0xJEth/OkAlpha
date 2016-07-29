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
    if (!current_user_id) {
      var current_user_id = parseInt(this.props.routeParams.id)
    }
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
      var matchContainer = {};
      this.state.myMatches.forEach(function(interest) {
        var user = UserStore.find(parseInt(interest.user_id));
        if (user) {
          if (matchContainer[user.id]) {
            matchContainer[user.id].push(interest)
          } else {
            matchContainer[user.id] = [interest]
          }
        }
      })
      var matchList = [];
      Object.keys(matchContainer).forEach(function(id) {
        var user = UserStore.find(parseInt(id));
        if (user) {
          var matchLi = [];
          matchLi.push(<UserItem key={id} user={user} className="like-list-item"/>);
          matchContainer[user.id].forEach(function(interest) {
            matchLi.push(<p key={interest.id + 100} className="match-text">{"likes " + interest.interest}</p>);
          })
        }
        matchList.push(<div className="match-list-div">{matchLi}</div>);
      })
    }

    return (
      <ul className="likes-div">
        <h3 className="h3">Users with shared interests:</h3>
        {matchList}
      </ul>
    );
  }
});

module.exports = Matches;
