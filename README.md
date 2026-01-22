# leaderboard api

> [!NOTE]
> This api uses bearer auth so be sure to send the jwt in the authorization headers when needed as follows: `Bearer <token>`. Routes which require auth are labled `auth` :)

### about:
A simple api for storing and updating user scores. Uses express, jwt and sqlite.

### setup (dev):

- clone repo, install deps (`npm i`), make sure you're using the latest version of Node
- create an .env file (or rename the existing example) and edit the fields to your liking
- once you have the vars set, run the app using `npm run dev`

### routes:
- `POST` `/users/signup`: creates new user

    ```js
    POST body
    {
        username: <string>,
        password: <string>
    }
    ```
    ```js
    RES body
    {
        token: <string>
    }
    ```
- `POST` `/users/login`: logs user in (same post and res fields as signup)
- `auth | GET` `/api/scores?amount=<n>`: gets n amount of scores for user in descending order, default is 10
  ```js
    RES body
    {
        scores: [
            {
                id: <number>,
                user_id: <number>,
                score: <number>
            }
        ]
    }
    ```
- `auth | POST` `/api/scores`: pushes a new score to the db

    ```js
    POST body
    {
        score: <number>,
        track: <number>
    }
    ```
- `GET` `/api/top-scores?amount=<n>`: gets n amount of the top scores for all users, default is 10
    ```js
    RES body
    {
        scores: [
            {
                username: <string>,
                score: <number>,
                track: <number>
            }
        ]
    }
    ```
