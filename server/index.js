const express = require('express');
const colors = require('colors');
const path = require("path");
const cors = require('cors')
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(port, console.log(`Server running on Port ${port}`));

