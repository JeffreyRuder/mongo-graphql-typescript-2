import express from 'express';
import { Database } from './database';
import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { getMongoDbQueryResolver, getGraphQLFilterType, getGraphQLSortType, GraphQLPaginationType } from 'graphql-to-mongodb'
import { AnimalType } from './animal-type';
import expressgraphql from 'express-graphql';
import { MongoDbOptions } from '../node_modules/graphql-to-mongodb/lib/src/queryResolver';
import { MongoDbProjection } from '../node_modules/graphql-to-mongodb/lib/src/mongoDbProjection';

class App {
    public app: express.Application;
    constructor() {
        this.app = express();
    }
}

const graphQLschema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            animals: {
                type: new GraphQLList(AnimalType),
                args: {
                    filter: { type: getGraphQLFilterType(AnimalType) },
                    sort: { type: getGraphQLSortType(AnimalType) },
                    pagination: { type: GraphQLPaginationType }
                },
                resolve: getMongoDbQueryResolver(AnimalType, 
                    async (filter, projection: MongoDbProjection, options: MongoDbOptions, obj, args, context) => {
                        options.projection = projection;
                        return await context.db.collection('animals').find(filter, options).toArray();
                    }
                )
            }
        }
    })
})

function main() {
    const DB: Database = new Database("mongodb://localhost:27017", "poc_test");

    const app = new App().app
    app.use('/graphql', (req: express.Request, res: express.Response) => {
        expressgraphql({
            schema: graphQLschema,
            context: {
                db: DB.database
            },
            graphiql: true
        })(req, res);
    });

    app.listen(3000, () => {
        console.log('express server running on port 3000');
    });
}

main();