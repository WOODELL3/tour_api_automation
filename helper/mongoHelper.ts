import { Db, MongoClient } from 'mongodb';


let client: MongoClient;
let db:Db;

async function connectDB() {
    if(!client){
       client = new MongoClient(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
       } as any);
       await client.connect();
       db = client.db()
    }
    return {client, db}
    
}