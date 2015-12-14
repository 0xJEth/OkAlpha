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
* ApiActions.receiveAllUsers -> triggered by ApiUtil
* ApiActions.receiveSingleUser
* UserActions.fetchAllUsers -> triggers ApiUtil
* UserActions.fetchSingleUser
* UserActions.createUser
* UserActions.editUser

### ApiUtil
* ApiUtil.fetchAllUsers
* ApiUtil.fetchSingleUser
* ApiUtil.createUser
* ApiUtil.editUser

## Gems/Libraries
* Flux Dispatcher (npm)
