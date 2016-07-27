var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiInterestUtil = require('../util/api_interest_util'),
    UserStore = require('../stores/users'),
    InterestStore = require('../stores/interests'),
    MessageStore = require('../stores/messages'),
    UserItem = require('./UserItem'),
    History = require('react-router').History;

var RecentActivity = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    var current_user = this.props.currentUser;
    var current_user_id = parseInt(this.props.currentUser.id);
    return ({
      users: UserStore.all(),
      interests: InterestStore.allInterests(),
      current_user: current_user,
      current_user_id: current_user_id
    })
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  _activityChanged: function() {
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function() {
    this.usersListener = UserStore.addListener(this._activityChanged);
    this.interestsListener = InterestStore.addListener(this._activityChanged);
    ApiUserUtil.fetchUsers();
    ApiUserUtil.fetchCurrentUser();
    ApiInterestUtil.fetchInterests();
  },

  componentWillUnmount: function() {
    this.usersListener.remove();
    this.interestsListener.remove();
  },

  populateActivity: function() {
    if (this.state.users.length > 0 && this.state.interests.length > 0) {
      var users = this.state.users;
      var interests = this.state.interests;
      var activity_array = users.concat(interests);
      activity_array.sort(function (a, b) {
        if (a.updated_at < b.updated_at) {
          return 1;
        }
        if (a.updated_at > b.updated_at) {
          return -1;
        }
        return 0;
      });
      return activity_array
    }
  },

  render: function () {
    var activity = this.populateActivity();
    if (activity) {
      var activity_show = [];
      var user;
      var pronoun;
      var i = 0;
      var action;
      while (activity_show.length < 11) {
        action = activity[i];
        user = UserStore.find(action.user_id || action.id);
        if (user.id != this.state.current_user_id) {
          if (user.gender === "male") {
            pronoun = "his";
          } else if (user.gender === "female") {
            pronoun = "her";
          } else {
            pronoun = "their";
          }
          if (action.interest) {
            var string = user.username + " has added " + action.interest + " to " + pronoun + " interests";
            activity_show.push(<div><img id={user.id} className="activity-image" src={user.image_url}/>
                               <UserItem key={i} user={user} text={string}/></div>);
          } else if (Date.now() - Date.parse(user.created_at) < 604800000) {
            var string = user.username + " is a new member!";
            activity_show.push(<div><img id={user.id} className="activity-image" src={user.image_url}/>
                               <UserItem key={i} user={user} text={string}/></div>);
          } else {
            var string = user.username + " has updated " + pronoun + " profile";
            activity_show.push(<div><img id={user.id} className="activity-image" src={user.image_url}/>
                               <UserItem key={i} user={user} text={string}/></div>);
          }
        }
        i += 1;
      }
      return (
        <div className="activity-div">
        <hr className="bar"/><hr className="bar"/>
          <h3>Recent Activity</h3>
          <ul className="activity-ul">
            {activity_show}
          </ul>
        </div>
      );
    } else {
      return (<div></div>)
    }
  }
});

module.exports = RecentActivity;
