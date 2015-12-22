# Phase 4: Likes

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* LikesIndex

### Stores
* LikesStore

### Actions
* ApiUserActions.receiveAllYourLikes -> triggered by ApiUserUtil
* LikeActions.fetchAllYourLikes -> triggers ApiUserUtil
* ApiUserActions.receiveAllLikesYou -> triggered by ApiUserUtil
* LikeActions.fetchAllLikesYou -> triggers ApiUserUtil
* ApiUserActions.receiveAllMutualLikes -> triggered by ApiUserUtil
* LikeActions.fetchAllMutualLikes -> triggers ApiUserUtil

### ApiUserUtil
* ApiUserUtil.fetchAllYourLikes
* ApiUserUtil.fetchAllLikesYou
* ApiUserUtil.fetchAllMutualLikes

## Gems/Libraries
