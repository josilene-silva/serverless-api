# Serverless AWS Node.js API

## Description

This project was implemented as part of a challenge to count the number of hits to site X and allow a user to create an account.

## Requirements

- Create a route to print the number of accesses;
- Create a route to consult the number of accesses;
- Create a route to create a user;
- Create a route to view a user's information.

To count the accesses you should use the API [CountApi](https://countapi.xyz)

## Application online endpoints

- GET - https://ija7ql5r4e.execute-api.sa-east-1.amazonaws.com/dev/consultAccess
- POST - https://ija7ql5r4e.execute-api.sa-east-1.amazonaws.com/dev/increaseAccess
- POST - https://ija7ql5r4e.execute-api.sa-east-1.amazonaws.com/dev/createUser
- GET - https://ija7ql5r4e.execute-api.sa-east-1.amazonaws.com/dev/profileUser/{id}

See more details in the [API Documentation](https://app.swaggerhub.com/apis-docs/josilenesilva/serverless-api/1.0.0).

## Technologies used

- [Node14](https://nodejs.org/en/)
- [Serverless framework](https://www.serverless.com/) - Template `aws-nodejs-typescript`
- [DynamoDB](https://aws.amazon.com/pt/dynamodb/)
- [Jest](https://jestjs.io/pt-BR/)
- [Swagger](https://swagger.io/)

## Step by step

### 1 - Installation of dependencies

- Run `npm i` if you're using NPM
- Run `yarn` if you're using YARN

### 2 - Installing DynamoDB local

- Run `npm run dynamodb:install` if you're using NPM
- Run `yarn dynamodb:install` if you're using YARN

### 3 - Rodando o DynamoDB local

- Run `npm run dynamodb:start` if you're using NPM
- Run `yarn dynamodb:start` if you're using YARN

### 4 - Creating .env

Create a `.env` file from `.env.example`.

As the value of `COUNTAPI_NAMESPACE` use the same one informed to **CountApi** (preferably a website domain)

- GET - https://api.countapi.xyz/create?namespace=COUNTAPI_NAMESPACE

If successful, it will return:

```
{
    "namespace": COUNTAPI_NAMESPACE,
    "key": COUNTAPI_KEY,
    "value": 0
}
```

Use the value returned in the in `key` for the `COUNTAPI_KEY` in the `.env` file

As the value of `API_URL`, use `http://localhost:3000/dev/`, as generated in the next step


### 5 - Running the application offline

- Run `npm run dev` if you're using NPM
- Run `yarn dev` if you're using YARN

The generated routes should look like these:

- GET   - http://localhost:3000/dev/consultAccess
- POST  - http://localhost:3000/dev/increaseAccess
- POST  - http://localhost:3000/dev/createUser
- GET   - http://localhost:3000/dev/profileUser/{id}

</br>

## Tests

### Unitary

This application use Jest to run its tests.

- Run `npm run test` if you're using NPM
- Run `yarn test` if you're using YARN

> Run `yarn dev` and `yarn dynamodb:start` before

### Integration with Serverless Framework

- To run it, you need to have `aws_access_key_id` and `aws_secret_access_key` configured on the machine used and run `serverless` to configure your `service` and `application`

> serverless config credentials --provider aws --key=YOU_AWS_KEY --secret YOU_AWS_SECRET

- Run `serverless test` to run integration tests in this application

</br>

## Project structure

The unit tests for the functions are in the `__tests__` folder.

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for this lambda functions
- `database` - containing the dynamodb database configuration

```
.
├── __tests__
│   ├── consultAccess.test.ts   # `consultAccess.test.ts` tests source code
│   ├── createUser.test.ts      # `createUser.test.ts` tests source code
│   ├── increaseAccess.test.ts  # `increaseAccess.test.ts` tests source code
│   └── profileUser.test.ts     # `profileUser.test.ts` tests source code
|
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── consultAccess.ts    # `consultAccess` lambda source code
│   │   ├── createUser.ts       # `createUser` lambda source code
│   │   ├── increaseAccess.ts   # `increaseAccess` lambda source code
│   │   └── profileUser.ts      # `profileUser` lambda source code
|   |
│   └── database                # Database configuration
│       └── dynamodbClient.ts   # DynamoDB configurations
│
├── package.json
├── jest.config.js              # Jest config file
├── serverless.yml              # Serverless service file
├── serverless.test.yml         # Serverless integration tests
├── swagger.json                # API documentation with Swagger
└── tsconfig.json               # Typescript compiler configuration

```