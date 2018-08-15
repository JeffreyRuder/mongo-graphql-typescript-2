import mongodb from 'mongodb'

export class Database {
  public connection?: mongodb.MongoClient
  public database?: mongodb.Db

  constructor (uri: string, db: string) {
    this.connect(uri, db)
  }

  private async connect (uri: string, db: string) {
    this.connection = await mongodb.connect(uri)
    this.database = this.connection.db(db)
    console.log(`connected to ${db} at ${uri}`)
  }
}
