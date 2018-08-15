import { GraphQLObjectType, GraphQLBoolean, GraphQLInt } from 'graphql/type'

export const AcknowledgeType = new GraphQLObjectType({
  name: 'AcknowledgeType',
  description: 'this GraphQL type represents the MongoDB acknowledgement response to an insert, update, or delete operation',
  fields: () => ({
    ok: { type: GraphQLBoolean },
    n: { type: GraphQLInt },
    nModified: { type: GraphQLInt }
  })
})