var ReactRouter = require('react-router'),
    ReactDOM = require('react-dom'),
    React = require('react'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    UserForm = require('./components/UserForm'),
    UserShow = require('./components/UserShow'),
    Likes = require('./components/Likes'),
    Header = require('./components/Header'),
    Messages = require('./components/Messages'),
    User = require('./components/User'),
    UserStore = require('./stores/users'),
    MessageStore = require('./stores/messages'),
    ApiUserUtil = require('./util/api_user_util');

var App = React.createClass({

  getStateFromStore: function() {
    var current_user = UserStore.currentUser();
    if (current_user) {
      var myMessages = MessageStore.allMyReceivedMessages(current_user.id);
      return ({
        current_user: current_user,
        current_user_id: parseInt(current_user.id),
        messageCount: 2
      })
    }
  },

  getInitialState: function () {
    ApiUserUtil.fetchCurrentUser();
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._currentUserChanged);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  _currentUserChanged: function () {
    this.setState(this.getStateFromStore());
  },

  render: function(){
    if (!this.state.current_user_id) {
      return (<div></div>)
    } else {
      return (
        <div className="router">
          <Header currentUserId={this.state.current_user_id} unreadCount={this.state.messageCount}></Header>
          {this.props.children}
        </div>
      );
    }
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={User}/>
    <Route path="profile/:id" component={UserForm}/>
    <Route path="user/:id" component={UserShow}/>
    <Route path="likes/:id" component={Likes}/>
    <Route path="messages/:id" component={Messages}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("root");
  ReactDOM.render(<Router>{routes}</Router>, root);
});
