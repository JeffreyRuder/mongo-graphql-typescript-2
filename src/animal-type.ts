import { GraphQLObjectType, GraphQLString } from "graphql/type";

export const AnimalType = new GraphQLObjectType({
    name: "AnimalType",
    description: "this GraphQL type represents an animal",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        noise: {
            type: GraphQLString
        }
    })
})