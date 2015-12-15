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
* ApiActions.receiveAllYourLikes -> triggered by ApiUtil
* LikeActions.fetchAllYourLikes -> triggers ApiUtil
* ApiActions.receiveAllLikesYou -> triggered by ApiUtil
* LikeActions.fetchAllLikesYou -> triggers ApiUtil
* ApiActions.receiveAllMutualLikes -> triggered by ApiUtil
* LikeActions.fetchAllMutualLikes -> triggers ApiUtil

### ApiUtil
* ApiUtil.fetchAllYourLikes
* ApiUtil.fetchAllLikesYou
* ApiUtil.fetchAllMutualLikes

## Gems/Libraries
