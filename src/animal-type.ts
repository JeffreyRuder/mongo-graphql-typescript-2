import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql/type'

export const AnimalType = new GraphQLObjectType({
  name: 'AnimalType',
  description: 'this GraphQL type represents an animal',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "the animal's unique identifier"
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "the animal's name"
    },
    noise: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the noise the animal makes'
    }
  })
})