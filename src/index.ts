import express from 'express'
import { Database } from './database'
import { GraphQLSchema } from 'graphql'
import expressgraphql from 'express-graphql'
import { RootQuery, RootMutation } from './schema/schema'

const graphQLschema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

function main () {
  const DB: Database = new Database('mongodb://localhost:27017', 'poc_test')
  const App: express.Application = express()

  App.use('/graphql', (req: express.Request, res: express.Response) => {
    expressgraphql({
      schema: graphQLschema,
      context: {
        db: DB.database
      },
      graphiql: true
    })(req, res)
  })

  App.listen(3000, () => {
    console.log('express server running on port 3000')
  })
}

main()
