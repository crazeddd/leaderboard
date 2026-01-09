# leaderboard api

> [!NOTE]
> This api uses bearer auth so be sure to send the jwt in the authorization headers when needed: `Bearer <token>`. Routes which require auth are labled `auth` :)

### setup (dev):

- clone repo, install deps (`npm i`)
- create an .env file with a field called `JWT_SECRET`, assign a long random string to this
- then run using `npm run dev`

### routes:
- `POST` `/users/signup`: creates new user

    ```js
    POST body
    {
        username: <string>,
        password: <string>
    }
    ```
- `POST` `/users/login`: logs user in (expects same fields as signup)
- `auth` `GET` `/api/scores?amount=<n>`: gets n amount of scores for user in descending order, default is 10
- `auth` `POST` `/api/scores`: pushes a new score to the db

    ```js
    POST body
    {
        score: <number>
    }
    ```
- `GET` `/api/top-scores?amount=<n>`: gets n amount of the top scores for all users, default is 10