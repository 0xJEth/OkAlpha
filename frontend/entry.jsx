var ReactRouter = require('react-router'),
    ReactDOM = require('react-dom'),
    React = require('react'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    UserForm = require('./components/UserForm'),
    UserShow = require('./components/UserShow'),
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
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("root");
  ReactDOM.render(<Router>{routes}</Router>, root);

  var profile = document.getElementById('user_form');
  profile.addEventListener("click", function () {
    ReactDOM.render(<UserForm users={this.state}/>, root);
  })
});
