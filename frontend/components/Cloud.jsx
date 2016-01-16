var React = require('react'),
    ReactDOM = require('react-dom'),
    UploadButton = require("./UploadButton"),
    History = require('react-router').History,
    Picture = require('./Image'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    UserStore = require('../stores/users'),
    ApiUserUtil = require('../util/api_user_util');

var Cloud = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { user: UserStore.find(parseInt(this.props.user.id)) };
  },

  postImage: function (image) {
    this.state.user.image_url = image.url;
    ApiUserUtil.updateProfile(this.state.user, function (id) {
      this.history.pushState(null, "/user/" + id, {});
    }.bind(this));
  },

  render: function () {
    return (
      <div className="cloud">
        <Picture key={this.props.user.id} user={this.props.user}/>
        <UploadButton postImage={this.postImage}/>
      </div>
    );
  }
});

module.exports = Cloud;
