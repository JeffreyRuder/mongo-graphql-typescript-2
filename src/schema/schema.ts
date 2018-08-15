import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql'
import { getMongoDbQueryResolver, getGraphQLFilterType, getGraphQLSortType, GraphQLPaginationType, getGraphQLInsertType } from 'graphql-to-mongodb'
import { AnimalType } from './animal-type'
import { AcknowledgeType } from './acknowedge-type'
import { HTTPStatusType } from './httpstatus-type'
import { ObjectId } from 'mongodb'
import * as request from 'request-promise-native'

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
    },
    postAnimalByID: {
      description: 'this query gets an animal by ID and posts it to the provided URL',
      type: HTTPStatusType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        url: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (filter, args, context, info) => {
        const objectID = new ObjectId(args._id)
        const animal = await context.db.collection('animals').findOne({ '_id': objectID })
        console.log(`posting ${animal.name} to ${args.url}`)
        const requestOptions: request.Options = {
          uri: args.url,
          body: animal,
          json: true,
          resolveWithFullResponse: true
        }
        const result = await request.post(requestOptions)
        return {
          url: result.request.href,
          animal: animal,
          status: result.statusMessage,
          statusCode: result.statusCode
        }
      }
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
        animal: { type: getGraphQLInsertType(AnimalType) }
      },
      resolve: async (object, args, context, info) => {
        return (await context.db.collection('animals').insertOne(args.animal)).result
      }
    }
  }
})
