import { faker } from "@faker-js/faker";
import { deleteUser, getUser, login, signUp, updateUser, uploadUserPhoto } from "../../helper/user";
import * as path from "path"


let user
let cookie
let token



describe('PATCH / updateMe', () => {

    const newName = faker.name.fullName();
    const newEmail = faker.internet.email();

    beforeAll(async ()=>{
        // create a test user with Faker
        user = getUser('admin')

        // sigup user
        const signUpRes = await signUp(user)
        console.log(signUpRes.body)
        expect(signUpRes.statusCode).toBe(201);
        // log in to get token and cookie
        const loginRes = await login({
            email: user.email,
            password: user.password
        })
        expect(loginRes.statusCode).toBe(200);
        token = loginRes.body.token
        cookie = loginRes.headers['set-cookie'][0] 
    })
    afterAll(async ()=>{
        try {
            const res = await deleteUser(cookie);
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('User deleted successfully')
        } catch (error) {
            console.log(error)
            throw error;
        }
    })

    it('user update name and email', async () => {
        const updateUserAndEmail = await updateUser({
            name:newName,
            email:newEmail,
        },token);
        expect(updateUserAndEmail.name).toBe(newName);
        expect(updateUserAndEmail.email.toLowerCase()).toBe(newEmail.toLowerCase());
    })
    it('should update user photo upload', async () =>{
        const filePath = path.join(__dirname, "../../data/pasv.png")
        const photo = await uploadUserPhoto(filePath, token)
        expect(photo).toBeDefined();
        
    })
})


