# Sleep Tracker App

Sleep Tracker is a Node.js based server incorporated with MongoDB Database that let's user create sleep schedule.

## Installation

Use the package manager npm to install all the dependencies.

```bash
npm install
```

## How to start locally

```bash
node bin.js
```

## Input Types

```javascript
signup = {
   firstName: String,
   lastName: String,
   email: String (type email)
   password: String (minimum 6 digits)
}

login = {
   email: String (type email)
   password: String (min 6 digits)
}

SleepRecord = {
   timestamp : String (Default current date, optional)
   hours: Number
   userId: String
}
```

## Routes

#### If running locally (Default port 3000, 4000 in case of error), the api is:

http://localhost:3000/api/v1

#### To create user, i.e. signup, the route is:

http://localhost:3000/api/v1/user/signup

#### To Login, the route is:

http://localhost:3000/api/v1/user/login

#### To create sleep record, the route is:

http://localhost:3000/api/v1/sleep

#### To get all the sleep records of a user, the route is:

http://localhost:3000/api/v1/sleep/:userId

#### To Delete the sleep record, the route is:

http://localhost:3000/api/v1/sleep/:recordId

## Extra features and how to use these

1. Used Bcrypt to hash the password to improvise additional security in database.

2. JWT token authentication, this is a feature that can be expanded easily by creating a cookie, session or maybe simply storing it in local Storage.

   Note: Middlewares for authentication is not created to keep the project simple as stated in the assignment but this can be easily added to make use of the tokens.

3. Zod has been used to make sure that the inputs provided are valid

4. Extra login and signup routes are created to make the project more fulfilling

5. MongoDB as a database is used instead of in-memory to give an "actual" touch of how things work in industries.

6. Tested using jest and verified by postman, the Api's are working.

   Note: I have removed the jest test files as in final stages I verified each api using postman too and the results were good, so to make a good file structure, I removed jest files.
