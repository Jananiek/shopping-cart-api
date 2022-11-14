# Shopping cart API 🛡️

This is a rest API repository to perform queries related to shopping cart.
## Build With
This project is build with Node.js, PostgreSQL.
Other specific libraries used:
- Joi : Object validations [Read more here](https://joi.dev/api/?v=17.7.0#defaultsmodifierr)
-  typeorm : ORM that can run in NodeJS [Read more here](https://typeorm.io/)
-  passport : Authentication middleware for NodeJS. [Read more about passport-local & passport-jwt here ](https://www.passportjs.org/packages/)
- winston : For logging purposes [Read more here](https://www.npmjs.com/package/winston)
## Development

We use `node` version `16.17.0`

```
nvm install 16.17.0
```

```
nvm use 16.17.0
```

The first time, you will need to run

```
yarn
```

Then just start the server with

```
yarn run start
```

It uses nodemon for livereloading :peace-fingers:

## Setting up Dev

### Project setup

- clone the `shopping-cart-api` repo.
- install the dependencies.
- run `cp .env.example development.env`.
- configure database credentials with yours in ` development.env` file
- to run with nodemon `yarn run start:dev` or to run in locally `yarn run start`.
### Run in different environment:
- run `cp .env.example production.env`
- configure database credentials with yours in ` production.env` file
- run `yarn run start:prod`.

**Example error**

```json
{
 "success": false,
 "data": {
   "errorMessage": "Missing User ID"
 }
}
````

**Example Success**

```json
{
  "success": true,
  "data": {},
  "message": null
}
```
# Api Reference
- After running the project go to `(http://localhost:8000/v1/api/apidoc)` to view API documentation
- Can check on heroku `(https://jkshoppingcartnodejs.herokuapp.com/v1/api/apidoc)` to test APIs paths.

# Database
- Used PostgreSQL along with TypeORM as ORM.

# FAQ
