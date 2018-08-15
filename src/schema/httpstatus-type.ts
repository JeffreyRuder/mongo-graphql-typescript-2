import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql/type'
import { AnimalType } from './animal-type';

export const HTTPStatusType = new GraphQLObjectType({
  name: 'HTTPStatusType',
  description: 'this GraphQL type represents a HTTP status',
  fields: () => ({
    url: {
      type: GraphQLString,
      description: 'the url that the POST request was made to'
    },
    animal: {
      type: AnimalType,
      description: 'the animal that was posted'
    },
    statusCode: { type: GraphQLInt },
    status: { type: GraphQLString }
  })
})
