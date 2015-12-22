# Flux Architecture Frontend, User Store

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* Header
* SideScroll
* UserSquares

### Stores
* Users

### Actions
* ApiUserActions.receiveAllUsers -> triggered by ApiUserUtil
* ApiUserActions.receiveSingleUser
* UserActions.fetchAllUsers -> triggers ApiUserUtil
* UserActions.fetchSingleUser
* UserActions.createUser
* UserActions.editUser

### ApiUserUtil
* ApiUserUtil.fetchAllUsers
* ApiUserUtil.fetchSingleUser
* ApiUserUtil.createUser
* ApiUserUtil.editUser

## Gems/Libraries
* Flux Dispatcher (npm)
