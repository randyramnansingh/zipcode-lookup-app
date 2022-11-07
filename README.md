# zipcode-lookup-app
An app built using `create-react-app` and Apollo GraphQL Server that interfaces with [Zippopotam](https://www.zippopotam.us/) that provides the ability to perform zipcode lookups from supported countries.

## Running
Node v18.12.0 (Hydrogen LTS) is required.

To get things running, clone this repo and follow the steps below:

1. In a terminal window, install and run the GraphQL server:
```
cd app
npm install
npm start
```

2. In a separate terminal window, install and run the React front-end:
```
cd web
npm install
npm start
```

3. Go to [http://localhost:3000](http://localhost:3000) to use the app!

## Testing
There is only 1 unit test defined for the backend that ensures the GraphQL API is behaving as expected. To test run `npm run test` in the `app` directory.

