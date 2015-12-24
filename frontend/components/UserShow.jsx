var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUserUtil = require('../util/api_user_util'),
    Star = require('./Star'),
    UserStore = require('../stores/users');

var UserShow = React.createClass({

  getStateFromStore: function () {
    return { user: UserStore.find(parseInt(this.props.params.id)), current_user: UserStore.currentUser()};
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUserUtil.fetchUser(parseInt(newProps.params.id));
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._userChanged);
    ApiUserUtil.fetchUser(parseInt(this.props.params.id));
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  _userChanged: function () {
    this.setState(this.getStateFromStore());
  },


  render: function () {
    if (!this.state.user) {
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
    return (
      <div className="user-container">
        <div className="user-info">
          {thumbnail}
          <br/>
          <h2>{thisUser.username}</h2>
          {profileProps}
          <br/><br/>
          <Star key={thisUser.id} user={thisUser} currentUser={this.state.current_user}/>
        </div>
        <footer id="footer">
          <a className="nav-button" href="#">Back</a>
        </footer>
      </div>
    );
  }
});

module.exports = UserShow;
