const dotenv = require('dotenv');
const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser')
const cors = require('cors');
const {get} = require('./services/apiService')

console.log(get)

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './.env' });

const app = express();
const port = process?.env?.PORT || 5000;
const server = new ApolloServer({
    typeDefs: `
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
        }

        type Query {
            getTodos: [Todo]
        }
    `,
    resolvers: {
        Query: {
            getTodos: async () => (await get({url: 'https://jsonplaceholder.typicode.com/todos', params: {}})).data        }
    },
})

app.use(bodyParser.json())
app.use(cors())

server.start().then(() => {
    app.use('/graphql', expressMiddleware(server))
})

app.listen(port, () => console.log(`Server started at port ${port}`))

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});