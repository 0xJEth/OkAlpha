var React = require("react"),
    cloudinary = require('cloudinary');

var UploadButton = React.createClass({
  upload: function (event) {
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, results){
      if(!error){
        this.props.postImage(results[0]);
      }
    }.bind(this));
  },

  render: function () {
    return (
      <div className="upload-form">
        <button className="upload-button" onClick={this.upload}>Upload Profile Picture</button>
      </div>
    );
  }
});

module.exports = UploadButton;
