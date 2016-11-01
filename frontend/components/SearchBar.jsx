var React = require("react"),
    UserItem = require('./UserItem'),
    UserStore = require('../stores/users'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    ApiUserUtil = require("../util/api_user_util");

var SearchBar = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState:function(){
    return { search: "" }
  },

  search: function () {
    var string = this.state.search;
    var results = UserStore.findUsername(string, false);
    return results;
  },

  makeList: function(results) {
    results.sort(function(a, b) {
      var nameA = a.username.toUpperCase();
      var nameB = b.username.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    console.log(results);

    var list = [];
    {results.map(function (user) {
      if (user.id != this.props.currentUser.id) {
        list.push(<UserItem key={user.id} user={user}/>)
      }
    }.bind(this))}
    return list;
  },

  allUsers: function(event) {
    event.preventDefault();
    var results = UserStore.all();
    var list = this.makeList(results);
    this.setState({search: ""});
  },

  render: function () {
    if (this.state.search != "") {
      var list = this.makeList(this.search(this.state.search));
      var browseAll = "enabled";
    } else {
      var list = this.makeList(UserStore.all());
      var browseAll = "disabled";
    }

    if (list.length === 0) {
      var searchClassName = "none";
      list.push(<div key={-1} className="no-search-results">No results</div>)
    } else {
      var searchClassName = "search-results"
    }

    return (
      <div className="search-div">
        <div className="search-bar">
          <input
            className="search-text-field"
            type="text"
            valueLink={this.linkState("search")}
            placeholder="Search Users"
          />
        <button className={browseAll} onClick={this.allUsers}>Browse All Users</button>
        </div>
        <ul className={searchClassName}>{list}</ul>
      </div>
    );
  }
});

module.exports = SearchBar;
