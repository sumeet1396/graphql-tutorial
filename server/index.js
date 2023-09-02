const dotenv = require('dotenv');
const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser')
const cors = require('cors');

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    // console.log({err})
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
    resolvers: {},
})

app.use(bodyParser.json())
app.use(cors())

server.start()

app.listen(port, () => console.log("SERVER START"))

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});