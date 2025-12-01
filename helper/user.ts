import { faker } from "@faker-js/faker"
import * as supertest from "supertest"
import { User } from "./interface";
const request = supertest('http://localhost:8001/api/v1/users');


export function signUp(user:string | object | undefined){
    return request.post('/signup').send(user)
}

export function login(user:{
    email: string,
    password: string,
}){
    return request.post('/login').send({
        email: user.email,
        password: user.password
    })
}


export function getUser(role:string){
    const randomUser = createRandomUser();
    const password = 'Test1234!!'
    return{
        name: randomUser.username,
        email: randomUser.email,
        password: password,
        passwordConfirm: password,
        role: role
    }
}

export function createRandomUser(){
    return{
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
}

export function deleteUser(cookie:string){
    return request.delete('/deleteMe').set('Cookie', cookie)
}

export async function updateUser(updateData: Partial<User>,token:string){
    const res = await request
    .patch("/updateMe")
    .set("Authorization", `Bearer ${token}`)
    .send(updateData)

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    return res.body.data.user
}

export async function uploadUserPhoto(filePath:string, token:string) {
    const res = await request
    .patch("/updateMe")
    .set('Authorization', `Bearer ${token}`)
    .attach('photo', filePath);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    return res.body.data.user.photo;
}