var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    ApiInterestUtil = require('../util/api_interest_util'),
    ApiLikeUtil = require('../util/api_like_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    History = require('react-router').History,
    Star = require('./Star'),
    NewMessage = require('./NewMessage'),
    InterestStore = require('../stores/interests'),
    LikeStore = require('../stores/likes'),
    Header = require('./Header'),
    UserStore = require('../stores/users');

var UserShow = React.createClass({
  mixins: [LinkedStateMixin, History],

  getStateFromStore: function () {
    var id = parseInt(this.props.params.id)
    return { user: UserStore.find(id),
             current_user: UserStore.currentUser(),
             interests: InterestStore.allMyInterests(id)};
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUserUtil.fetchUser(parseInt(newProps.params.id));
    ApiInterestUtil.fetchInterests();
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._userChanged);
    this.interestsListener = InterestStore.addListener(this._userChanged);
    this.likeListener = LikeStore.addListener(this._userChanged);
    ApiUserUtil.fetchUser(parseInt(this.props.params.id));
    ApiInterestUtil.fetchInterests();
    ApiLikeUtil.fetchLikes();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.interestsListener.remove();
    this.likeListener.remove();
  },

  _userChanged: function () {
    this.setState(this.getStateFromStore());
  },


  render: function () {
    if (!this.state.user || !this.state.current_user) {
      return <div>loading</div>
    }
    var thisId = parseInt(this.props.routeParams.id);
    var thisUser = UserStore.find(parseInt(thisId));
    var profileProps = [];
    if (thisUser.image_url) {
      var thumbnail = <img className="profile" src={thisUser.image_url}/>
    } else {
      var thumbnail = <img className="blank" src={"http://www.gl-assessment.ie/sites/gl/files/images/1414510022_user-128.png"}/>
    }
    if (thisUser.email) {
      profileProps.push(<li key="profile-email">Email: {thisUser.email}</li>)
    }
    if (thisUser.gender) {
      profileProps.push(<li key="profile-gender">Gender: {thisUser.gender}</li>)
    }
    if (thisUser.preferred_gender) {
      profileProps.push(<li key="profile-pref-gender">Interested in: {thisUser.preferred_gender}</li>)
    }
    if (thisUser.bio) {
      profileProps.push(<div key="profile-bio"><br/><br/><li>About me :</li><li>{thisUser.bio}</li></div>)
    }
    if (profileProps.length < 1) {
      profileProps.push(<li key="profile-empty">Nothing here yet</li>)
    }

    if (this.state.interests.length === 0) {
      var interestsContainer = <li>No interests yet!</li>
    } else {
      var interestsContainer = [];
      this.state.interests.forEach(function(interest) {
        var interestCapitalized = interest.interest.charAt(0).toUpperCase() + interest.interest.slice(1);
        interestsContainer.push(<li key={interest.id} className="interest-item">{interestCapitalized}</li>)
      })
    }

    if (thisUser.id != this.state.current_user.id) {
      var star = <Star key={thisUser.id} user={thisUser} currentUserId={this.state.current_user.id}/>
    } else {
      var star = <p></p>
    }

    return (
      <div className="user-body">
        <div className="background">
        </div>
        <div className="user-info">
          <div className="left">
            {thumbnail}{star}
            <div className="user-details">
              <h2>{thisUser.username}</h2>
              {profileProps}
              <br/><br/>
              <h4>{thisUser.username + "'s Interests:"} </h4>
              <br/>
              {interestsContainer}
            </div>
          </div>
          <div className="profile-message">
            <h3>Send {thisUser.username.split(" ")[0]} a Message</h3>
            <NewMessage currentUserId={this.state.current_user.id} userId={this.state.user.id}/>
          </div>
          <footer>
            <a className="nav-button" href="#">Back</a>
          </footer>
        </div>
      </div>
    );
  }
});

module.exports = UserShow;
