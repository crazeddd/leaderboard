# leaderboard api

### setup (dev):

- clone repo, install deps (`npm i`)
- create an .env file with a field called `JWT_SECRET`, assign a long random string to this
- then run using `npm run dev`

### routes:
- `POST` `/users/signup`: creates new user (expects {username: "idk", password: "231"} format)
- `POST` `/users/login`: logs user in (expects same thing as signup)
- `GET` `/api/scores?amount=<n>`: gets n amount of scores for user, default is 10
- `POST` `/api/scores`: pushes a new score to the db (expects something like {score: 123})
- `GET` `/api/top-scores?amount=<n>`: gets the top scores for all users, default is 10


