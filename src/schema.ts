import { GraphQLObjectType, GraphQLList } from 'graphql'
import { getMongoDbQueryResolver, getGraphQLFilterType, getGraphQLSortType, GraphQLPaginationType, getGraphQLInsertType } from 'graphql-to-mongodb'
import { AnimalType } from './animal-type'
import { AcknowledgeType } from './acknowedge-type';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    animals: {
      description: 'this query uses MongoDB query operators to get information about animals',
      type: new GraphQLList(AnimalType),
      args: {
        filter: { type: getGraphQLFilterType(AnimalType) },
        sort: { type: getGraphQLSortType(AnimalType) },
        pagination: { type: GraphQLPaginationType }
      },
      resolve: getMongoDbQueryResolver(AnimalType,
                async (filter, projection, options, obj, args, context) => {
                  options.projection = projection
                  return context.db.collection('animals').find(filter, options).toArray()
                }
            )
    }
  }
})

export const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    create: {
      type: AcknowledgeType,
      description: 'create a new animal',
      args: {
        animal: {type: getGraphQLInsertType(AnimalType)}
      },
      resolve: async (object, args, context, info) => {
        return (await context.db.collection('animals').insertOne(args.animal)).result;
      }
  }}
})
