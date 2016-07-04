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
    var list = [];
    {results.map(function (user) {
      if (user.id != this.props.currentUser.id) {
        list.push(<UserItem key={user.id} user={user}/>)
      }
    }.bind(this))}
    if (list.length === 0) {
      list.push(<p key={-1} className="search-results">No results</p>)
    }
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
    } else {
      var list = this.makeList(UserStore.all());
    }

    return (
      <div className="search-div">
        <div className="search-bar">
          <input
            className="search-text-field"
            type="text"
            valueLink={this.linkState("search")}
            placeholder="Search"
          />
          <button className="all-button" onClick={this.allUsers}>Browse All Users</button>
        </div>
        <ul className="search-results">{list}</ul>
      </div>
    );
  }
});

module.exports = SearchBar;
