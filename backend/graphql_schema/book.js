const graphql = require('graphql')
const book = require('../model/book')

const BookSchema = new graphql.GraphQLObjectType({
  name: 'book',
  description: 'Books in the library',
  fields: {
    _id: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    year: { type: graphql.GraphQLInt },
    publisher: { type: graphql.GraphQLString },
    author: { type: graphql.GraphQLString },
    isbn: { type: graphql.GraphQLString },
  },
})
const query = new graphql.GraphQLObjectType({
  name: 'getBooks',
  fields: {
    book: {
      type: new graphql.GraphQLList(BookSchema),
      args: {
        _id: { type: graphql.GraphQLString },
        title: { type: graphql.GraphQLString },
        author: { type: graphql.GraphQLString },
        isbn: { type: graphql.GraphQLString },
      },
      resolve: (_, { _id, title, isbn, author }) => {
        let where
        if (_id) {
          where = { _id }
        } else if (title) {
          where = { title: `/.*${title}.*/` }
        } else if (author) {
          where = { author: `/.*${author}.*/` }
        } else if (isbn) {
          where = { isbn }
        } else {
          where = {}
        }
        return book.find(where)
      },
    },
    getByCapacity: {
      type: new graphql.GraphQLList(BookSchema),
      args: {
        capacity: { type: graphql.GraphQLInt },
      },
      resolve: (_, { capacity }) => {
        let where
        if (capacity) {
          where = { engineCapacity: { $lt: capacity } }
        } else {
          where = {}
        }
        return book.find(where)
      },
    },
  },
})
const mutation = new graphql.GraphQLObjectType({
  name: 'bookMutations',
  fields: {
    create: {
      type: BookSchema,
      args: {
        title: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        year: { type: graphql.GraphQLInt },
        publisher: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        author: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        isbn: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        year: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve: (_, { title, year, author, publisher, isbn }) => {
        let v = new book({ title, year, author, publisher, isbn })
        return v.save()
      },
    },
    delete: {
      type: BookSchema,
      args: {
        _id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      resolve: (_, { _id }) => {
        return book.findOneAndRemove(_id)
      },
    },
  },
})

module.exports = new graphql.GraphQLSchema({
  query,
  mutation,
})
