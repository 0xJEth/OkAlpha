var ReactRouter = require('react-router'),
    ReactDOM = require('react-dom'),
    React = require('react'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    UserForm = require('./components/UserForm'),
    UserShow = require('./components/UserShow'),
    Likes = require('./components/Likes'),
    Messages = require('./components/Messages'),
    User = require('./components/User');

var App = React.createClass({

  render: function(){
    return (
      <div>
        <header></header>
        {this.props.children}
      </div>
    );
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
