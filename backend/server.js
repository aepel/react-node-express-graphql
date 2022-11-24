const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express()
const mongoose = require('mongoose')
const schema = require('./graphql_schema/book')
const cors = require('cors')

app.get('/', (req, res) => {
  res.end("Epel's store backend is running on 3000 port...")
})
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)
app.listen('3000', () => {
  console.log('Server is starting on 3000 port...')
  mongoose.connect(`mongodb://127.0.0.1/bookdb`)
  mongoose.connection.on('error', err => console.error('FAILED to connect to mongodb instance.', err))
  mongoose.connection.once('open', () => console.log('Connected to mongodb instance.'))
})
