var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');

var ApiInterestUtil = {

  receiveInterests: function(interests) {
    AppDispatcher.dispatch({
      actionType: Constants.INTERESTS_RECEIVED,
      interests: interests
    });
  },

  receiveInterest: function(interest) {
    console.log(interest);
    AppDispatcher.dispatch({
      actionType: Constants.INTEREST_RECEIVED,
      interest: interest
    });
  },

  removeInterest: function(interest) {
    AppDispatcher.dispatch({
      actionType: Constants.INTEREST_REMOVED,
      interest: interest
    });
  }
}

module.exports = ApiInterestUtil;
