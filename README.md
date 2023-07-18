# nosh-backend-interview

## Challenge:

Design a basic bank versioned API with the ability to sign up, sign in, and initiate transfers
between accounts with ExpressJS (Node.js Framework); your API should utilize a refresh
token mechanism for re-authenticating users using Redis, and the persistent storage should be
MongoDB, while your cache storage should be Redis (not mandatory to implement a caching
system), with at least one route(s) requiring authentication, and another requiring
authorisation (2 role types definition should do) implemented.

## Takeaways:

- API versioning
- Rate limiting mechanism
- Role base authentication/authorization
- Refresh token re-authentication mechanism

---

## To Start Project

- **Install dependencies**

Using npm package manager

`npm install`

- **Create .env file in project root directory**

Reference .env.sample file to see required variables

- **Run server in development**

`npm run dev`

- **Run server in production**

`npm start`

## Project features

- Used typescript (partially)
- No test
- API Versioning [BASE_URL/v1/${resource}]
- Restful convention
- Rate limiting mechanism
- Role base authentication/authorization [admin, support, user]
- Refresh token re-authentication mechanism
- Redis for caching
- Cache All user Data when fetched for the first time, and clear cache when a new user is created
- Mongo DB for persistent storage

## Available routes

- POST - [BASE_URL/v1/auth] - Authenticate User
- POST - [BASE_URL/v1/auth/refresh] - Give user new refresh token
- GET - [BASE_URL/v1/users] - Get all users (elevated authorization required)[admin, support]
- POST - [BASE_URL/v1/users] - Create a new user
- GET - [BASE_URL/v1/users/${userId}] - Get a user by id (authorization required)[user]
- GET - [BASE_URL/v1/transaction/transfer] - Transfer money to another user (authorization required)[user]
