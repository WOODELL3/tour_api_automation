import { getUser, signUp, login } from "../../helper/user"

import * as supertest from "supertest"
const request = supertest('http://localhost:8001/api/v1/users');

interface User{
    userId?: string;
    username?: string;
    name: string;
    email: string;
    role?: string;
    password: string;
    passwordConfirm: string;

}

function deleteUser(cookie:string){
    return request.delete('/deleteMe').set('Cookie', cookie)
}

describe('LOGIN', () => {
    const user: User = getUser("admin")
    let cookie: string;

    it('should sign up, and login', async() =>{
        try{
        //Sign up the user
        const res = await signUp(user);
        expect(res.status).toBe(201);
        const loginRes = await login(user);
        expect(loginRes.status).toBe(200);
        console.log(loginRes.body);
        cookie = loginRes.headers['set-cookie'][0].split(',')[0];
        //delete user
        const deleteRes = await deleteUser(cookie);
        expect(deleteRes.status).toBe(200);
        const loginResAfterDelete = await login(user);
        expect(loginResAfterDelete.status).toBe(401);
        }catch (error) {
            console.error(error);
            throw error;
        }
       

    })
    it('should sign up, and login .then()', () =>{
        //Sign up the user
        return signUp(user)
        .then(res =>{
            console.log(res.body);
            expect(res.status).toBe(201);
            expect(res.body.data.user.email).toBe(user.email.toLowerCase());
            expect(res.body.status).toBe('success');
            return login(user);
        })
        .then(loginRes => {
            console.log(loginRes.body, 'login')
            expect(loginRes.status).toBe(200);
            expect(loginRes.body.data.user.email).toBe(user.email.toLowerCase());
            expect(loginRes.body.status).toBe('success');
            cookie = loginRes.headers['set-cookie'][0].split(',')[0];
            return deleteUser(cookie)
        })
        .then((deleteRes) => {;
            expect(deleteRes.statusCode).toBe(200)
            expect(deleteRes.body.message).toBe('User deleted successfully');
            return login(user)
        })
        .then((loginResAfterDelete) => {;
            expect(loginResAfterDelete.status).toBe(401)
            expect(loginResAfterDelete.body.message).toBe('Incorrect email or password');
            
        })
       

    })
    it.only('should sign up, and login .end()', (done) =>{
        //Sign up the user
        signUp(user).end((err,res) =>{
            if(err) return done(err)
                expect(res.body.data.user.email).toBe(user.email.toLowerCase());
                expect(res.body.status).toBe('success');
                login(user)
                .end((err,res) =>{
                    if(err) return done(err);
                    expect(res.body.data.user.email).toBe(user.email.toLowerCase());
                    expect(res.body.status).toBe('success');
                    cookie = res.header['set-cookie'][0].split(',')[0];
                    return deleteUser(cookie).end((err, deleteRes) =>{
                        if (err) return done(err);
                        expect(deleteRes.status).toBe(200);
                        expect(deleteRes.body.message).toBe('User deleted successfully');
                        return login(user).end((err, loginResAfterDelete)=>{
                            expect(loginResAfterDelete.status).toBe(401);
                            expect(loginResAfterDelete.body.message).toBe('Incorrect email or password');
                            done();
                        })
                    })
                })
                
       

    })
    
})
})