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
* ApiUserActions.receiveAllReceivedMessages -> triggered by ApiUserUtil
* LikeActions.fetchAllReceivedMessages -> triggers ApiUserUtil
* ApiUserActions.receiveSingleReceivedMessage -> triggered by ApiUserUtil
* LikeActions.fetchSingleReceivedMessage -> triggers ApiUserUtil
* ApiUserActions.receiveAllSentMessages -> triggered by ApiUserUtil
* LikeActions.fetchAllSentMessages -> triggers ApiUserUtil
* ApiUserActions.receiveSingleSentMessage -> triggered by ApiUserUtil
* LikeActions.fetchSingleSentMessage -> triggers ApiUserUtil

### ApiUserUtil
* ApiUserUtil.fetchAllReceivedMessages
* ApiUserUtil.fetchSingleReceivedMessage
* ApiUserUtil.fetchAllSentMessages
* ApiUserUtil.fetchSingleSentMessage

## Gems/Libraries
