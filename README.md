## GraphQL MongoDB TypeScript Example 1

This example demonstrates use of:
* TypeScript
* Native mongodb client
* `graphql-to-mongodb` to allow use of most of the mongo db query operators via GraphQL HTTP

Assumes the existence of a local mongo database called `poc_test`, with a collection `animals` that has data structured as follows:

```javascript
/* 1 */
{
    "_id" : ObjectId("5b6b40a0d8b5291f8b69df8f"),
    "name" : "dog",
    "noise" : "bark"
}

/* 2 */
{
    "_id" : ObjectId("5b6b40bbd8b5291f8b69df9b"),
    "name" : "cat",
    "noise" : "meow"
}

/* 3 */
{
    "_id" : ObjectId("5b6b698ed8b5291f8b69e533"),
    "name" : "sea lion",
    "noise" : "bark"
}
```
### Build and Run

This project uses yarn. `brew install yarn` if you don't have it.

* `yarn install` to load dependencies.
* `yarn start` to compile and run - this project uses ts-node for one-step compile and run.
* `yarn dev` to compile, run, and automatically reload with nodemon.
* `yarn build` to compile .js files in the dist/ directory.
* `yarn run-build` to run from the dist/ directory.

### Interactive UI

To use the `graphiql` interactive UI for development, navigate to `http://localhost:3000/graphql` with a web browser.


![screenshot of postman](./screenshot.png)
