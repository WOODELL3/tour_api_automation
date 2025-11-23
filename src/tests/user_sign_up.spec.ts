import * as supertest from 'supertest';
import { faker } from "@faker-js/faker"
import { Response } from 'superagent'
const request = supertest('http://localhost:8001/api/v1/users');

interface UserData {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

describe('User Sign Up',() =>{
    it('should create a new user succsessfully', async () => {
        const userData: UserData = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: "Pass1234",
            passwordConfirm: "Pass1234"
        }
        console.log(userData,"userdata");
        try{
            const res: Response = await request.post('/signup').send(userData)
            console.log(res.body,"respone");
            expect(res.status).toBe(201);
            expect(res.body.status).toBe('success');
            expect(res.body.data.user.name).toBe(userData.name);
            expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
            expect(typeof res.body.data.user.name).toBe('string');
            expect(typeof res.body.data.user.email).toBe('string');
            expect(res.body.token).toBeDefined();

        }catch(err){
            console.log("Error during user sign up:", err)
            throw err;
        }
    })
    it('should create a new user using .then() syntax', () => {
        const userData = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: "Pass1234",
            passwordConfirm: "Pass1234"
        }
        console.log(userData,'userdata')
        return request.post('/signup').send(userData).expect(201).then((response: Response)=>{
            console.log(response.body,'expect');
            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.data.user.name).toBe(userData.name);
            expect(response.body.data.user.email).toBe(userData.email.toLowerCase());
            expect(typeof response.body.data.user.name).toBe('string');
            expect(typeof response.body.data.user.email).toBe('string');
            expect(response.body.token).toBeDefined();
        })
        .catch(err=>{
            console.log('Error during user sign up:', err);
            throw err;
        })
    })

    it('should create a new user using .end() syntax', (done) => {
        const userData: UserData = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: "Pass1234",
            passwordConfirm: "Pass1234"
        }
        console.log(userData,'userdata')
        request.post('/signup').send(userData).end((err: Error | null, res: Response)=>{
            if(err){
                console.log('Error during user sign up:', err);
                return done(err);
            }
            expect(res.status).toBe(201);
            expect(res.body.status).toBe('success');
            expect(res.body.data.user.name).toBe(userData.name);
            expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
            expect(typeof res.body.data.user.name).toBe('string');
            expect(typeof res.body.data.user.email).toBe('string');
            expect(res.body.token).toBeDefined();
            done();
        })
    })

})