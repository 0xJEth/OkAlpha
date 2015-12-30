var ApiInterestActions = require('../actions/api_interest_actions');

var ApiInterestUtil = {
  fetchInterests: function(){
    $.ajax({
      url: "api/interests",
      success: function (interests) {
        ApiInterestActions.receiveInterests(interests);
      },
      error: function(message) {
        console.log(message);
      }
    })
  },

  updateInterest: function (interest, callback) {
    $.ajax({
      url: "api/interests/",
      type: "POST",
      data: {interest: interest},
      success: function (interest) {
        ApiInterestActions.receiveInterest(interest);
        callback && callback(interest);
      },
      error: function (message) {
        console.log(message);
      }
    });
  },

  deleteInterest: function (interest) {
    $.ajax({
      url: "api/interests/" + interest.id,
      type: "DELETE",
      success: function () {
        ApiInterestActions.removeInterest();
      },
      error: function (message) {
        console.log(message);
      }
    });
  }

};

module.exports = ApiInterestUtil;
