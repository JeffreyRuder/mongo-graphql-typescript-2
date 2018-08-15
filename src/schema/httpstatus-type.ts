import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql/type'

export const HTTPStatusType = new GraphQLObjectType({
  name: 'HTTPStatusType',
  description: 'this GraphQL type represents a HTTP status',
  fields: () => ({
    url: {
      type: GraphQLString,
      description: 'the url that the POST request was made to'
    },
    statusCode: { type: GraphQLInt },
    status: { type: GraphQLString }
  })
})
