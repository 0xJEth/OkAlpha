var React = require("react"),
    UserItem = require('./UserItem'),
    UserStore = require('../stores/users'),
    ApiUtil = require("../util/app_util");

var SearchBar = React.createClass({
  getInitialState:function(){
    return { matches: [] }
  },

  search: function (event) {
    event.preventDefault();
    var string = event.target.form.firstChild.value;
    string = string.split(" ");
    var users = UserStore.all();
    var results = [];
    for (var userIdx = 0; userIdx < users.length; userIdx++) {
      var name = users[userIdx].username.split(" ");
      for (var i = 0; i < name.length; i++) {
        for (var j = 0; j < string.length; j++) {
          if (name[i].toLowerCase() === string[j].toLowerCase()) {
            results.push(users[userIdx]);
          }
        }
      }
    }
    this.setState({ matches: results });
  },

  searchList: function() {
    var list = [];
    {this.state.matches.map(function (user) {
      list.push(<UserItem key={user.id} user={user}/>)
    })}
    if (list.length === 0) {
      list.push(<p className="search-results">No results</p>)
    }
    return list;
  },

  allUsers: function(event) {
    event.preventDefault();
    var results = UserStore.all();
    this.setState({ matches: results });
    // var list = [];
    // {UserStore.all().map(function (user) {
    //   list.push(<UserItem key={user.id} user={user}/>)
    // })}
    // if (list.length === 0) {
    //   list.push(<p className="search-results">No results</p>)
    // }
    // return list;
  },

  render: function () {
    var list = this.searchList();
    if (this.searchList().length === 0) {
      list = <p></p>
    }
    return (
      <div>
        <form className="search-bar">
          <input className="search-text-field" type="text" name="users[username]"></input>
          <button className="search-button" onClick={this.search}>Search Users</button>
          <button className="all-button" onClick={this.allUsers}>Browse All Users</button>
        </form>
        <ul className="search-results">{list}</ul>
      </div>
    );
  }
});

module.exports = SearchBar;
