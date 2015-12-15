# Phase 5: AI Recommended Matches

## Rails
### Models
* Messages

### Controllers
* Api::MessagesController (create, index, destroy)

### Views
* Messages

## Flux
### Views (React Components)
* ReceivedMessages
* SentMessages
* SideBar

### Stores
* Messages

### Actions
* ApiActions.receiveAllReceivedMessages -> triggered by ApiUtil
* LikeActions.fetchAllReceivedMessages -> triggers ApiUtil
* ApiActions.receiveSingleReceivedMessage -> triggered by ApiUtil
* LikeActions.fetchSingleReceivedMessage -> triggers ApiUtil
* ApiActions.receiveAllSentMessages -> triggered by ApiUtil
* LikeActions.fetchAllSentMessages -> triggers ApiUtil
* ApiActions.receiveSingleSentMessage -> triggered by ApiUtil
* LikeActions.fetchSingleSentMessage -> triggers ApiUtil

### ApiUtil
* ApiUtil.fetchAllReceivedMessages
* ApiUtil.fetchSingleReceivedMessage
* ApiUtil.fetchAllSentMessages
* ApiUtil.fetchSingleSentMessage

## Gems/Libraries
