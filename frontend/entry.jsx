var ReactRouter = require('react-router'),
    ReactDOM = require('react-dom'),
    React = require('react'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    UserForm = require('./components/User'),
    UserShow = require('./components/User'),
    User = require('./components/User');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <header><h1>Entry</h1></header>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={User}/>
    <Route path="user/new" component={UserForm}/>
    <Route path="user/:userId" component={UserShow}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("root");
  ReactDOM.render(<Router>{routes}</Router>, root);
});
