# Phase 4: Likes

## Rails
### Models

### Controllers
* Api::LikesController (create, destroy, index)

### Views
* Likes

## Flux
### Views (React Components)
* YourLikes
* LikesYou
* MutualLikes

### Stores

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
