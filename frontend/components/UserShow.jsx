var React = require('react'),
    ReactRouter = require('react-router'),
    ApiUtil = require('../util/app_util'),
    UserStore = require('../stores/users');

var UserShow = React.createClass({

  getStateFromStore: function () {
    return { user: UserStore.find(parseInt(this.props.params.id)) };
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchUser(parseInt(newProps.params.id));
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._userChanged);
    ApiUtil.fetchUser(parseInt(this.props.params.id));
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
    // var thisUser = this.state.user;
    // debugger
    var thisId = parseInt(this.props.routeParams.id);
    // console.log(this)
    var thisUser = UserStore.find(parseInt(thisId));
    // console.log(thisUser)
    var profileProps = [];
    if (thisUser.image_url) {
      var thumbnail = <img className="profile" src={thisUser.image_url}/>
    } else {
      var thumbnail = <img className="blank" src={"http://www.gl-assessment.ie/sites/gl/files/images/1414510022_user-128.png"}/>
    }
    if (thisUser.email) {
      profileProps.push(<li>Email: {thisUser.email}</li>)
    }
    if (thisUser.gender) {
      profileProps.push(<li>Gender: {thisUser.gender}</li>)
    }
    if (thisUser.preferred_gender) {
      profileProps.push(<li>Interested in: {thisUser.preferred_gender}</li>)
    }
    if (thisUser.bio) {
      profileProps.push(<div><br/><br/><li>About me:</li><li>{thisUser.bio}</li></div>)
    }
    if (profileProps.length < 1) {
      profileProps.push(<li>Nothing here yet</li>)
    }
    return (
      <div>
        <div className="user-info">
          {thumbnail}
          <br/>
          <h2>{thisUser.username}</h2>
          {profileProps}
        </div>
        <footer id="footer">
          <a className="nav-button" href="#">Back</a>
        </footer>
      </div>
    );
  }
});

// String.prototype.insertPictureParams = function() {
//   var pos = this.indexOf("upload/") + 7;
//   return [this.slice(0,pos), "w_150,h_150,r_max/",this.slice(pos)].join("");
// }

module.exports = UserShow;
