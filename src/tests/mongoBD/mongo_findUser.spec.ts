import { MongoClient, ObjectId } from "mongodb"
import { getUser, signUp } from "../../../helper/user";
import { exec } from "@faker-js/faker/modules/helpers/unique";

const dotenv = require('dotenv');
dotenv.config();

describe('mongodb connection and operation', () => {
    let connection
    let db
    let res
    beforeAll(async () =>{
        try {
            connection = await MongoClient.connect(process.env.DATABASE_URL); 
            db = await connection.db()
        } catch (error) {
            console.log(error)
            throw error;
        }
    })
    afterAll(async () =>{
        await connection.close();
    })
    it('find user using mongodb query', async () =>{
        const users = db.collection('users')
        console.log(users, 'users collection')
        const user = await users.findOne({name:"Denis123"})
        console.log(user, 'found user')
        expect(user.name).toBe('Denis123')
    })
    it('create new user with imported data', async () =>{
        const userImport = getUser('admin')
        console.log(userImport, 'userImport data')

        try {
            const res = await signUp(userImport);
            expect(res.status).toBe(201)
            console.log(res.body, 'signup response')
            const users = db.collection('users')
            const userData = await users.findOne({name: userImport.name})
            console.log(userData, 'userdata form db')
            if (!userData) {
                throw new Error("user not found in db");
                
            }
            expect(userData.name).toBe(userImport.name)
            expect(userData.email).toBe(userImport.email.toLocaleLowerCase())
            expect(userData.role).toBe("admin")
            expect(userData._id.toString()).toEqual(res.body.data.user._id)
            let deleteData = await users.deleteOne({_id: new ObjectId(userData._id)})
            console.log(deleteData, 'delete data')
            let findUser = await users.findOne({_id:userData._id})
            console.log(findUser, 'find users after delete')
            expect(findUser).toBeNull()
        } catch (error) {
            throw new Error(`Error during user creation test: ${error}`);
            
        }
    })
})
