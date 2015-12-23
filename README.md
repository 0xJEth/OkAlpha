# OkAlpha

[heroku]: https://okalpha.herokuapp.com/

## Minimum Viable Product

OkAlpha is a dating and match-making web application for the Alpha Quadrant.
It is inspired by OkCupid and built with Ruby on Rails and React. With OkAlpha,
members of the Alpha Quadrant can:

- [x] Create an account
- [x] Log in / Log out
- [ ] Guest account
- [x] Create and edit their user profile
- [x] Browse profiles of other users
- [x] Search for users explicitly
- [ ] Search for users with keywords from their profile
- [ ] Have a match-making AI that will pair people with similar interests
- [ ] Let users select people they "like" and see who has "liked" them
- [ ] Send in-app messages

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Rails Backend (2 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). After signup/signin users will be redirected to the root view. I will
then create user show pages (profiles) with an option to edit if it's your
account.

[Details][phase-one]

### Phase 2: Flux Architecture Frontend, User Store (2 days)

In phase 2, I'll set up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a User store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Next, I'll create React
views for the root page.

[Details][phase-two]

### Phase 3: Search Bar (2 days)

In phase 3, I want to get the search functionality working. You can search for
usernames, and hopefully I'll be able to implement searching for keywords
that match users' interests or bio.

[Details][phase-three]

### Phase 4: Likes (2 day)

In phase 4, I'll start working on the "like" functionality. Users will be able
to like other people. There will be an index view of all people you like, all
people who have liked you, and an index of mutual likes.

[Details][phase-four]

### Phase 5: AI Recommended Matches (2 day)

In phase 5, I'll work on a feature that will search through the database and
find people with any matching interests.

[Details][phase-five]

### Phase 6: Messaging (2 days)

In phase 6, I'll implement the final feature which is in-app messages. There
will be functionality to compose new messages and see your received messages.

[Details][phase-six]

### Phase 7: Make it pretty (2 day)

CSS, fine tune views with jbuilder

### Bonus Features (TBD)
* Save draft messages
* A fancy side scroller for the root page
* Dismiss AI matches that you're not interested it
* Whatever I skipped over the first time through because I had no idea how
  complicated it would all be

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
