import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql/type'

export const AnimalType = new GraphQLObjectType({
  name: 'AnimalType',
  description: 'this GraphQL type represents an animal',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: "the animal's unique identifier"
    },
    name: {
      type: GraphQLString,
      description: "the animal's name"
    },
    noise: {
      type: GraphQLString,
      description: 'the noise the animal makes'
    }
  })
})
