import { getUser, signUp } from "../../helper/user";

let cookies:string;

describe('Tour', () =>{
    it('create tour', async ()=>{
        const userImport = getUser('admin');
        console.log(userImport, 'userImport');
        await signUp(userImport).then(res=>{
            expect(res.status).toBe(201);
            expect(res.body.data.user.email).toBe(userImport.email.toLocaleLowerCase())
            cookies = res.header['set-cookie']
        })
        await request
        .post('/tours')
        .set('Cookie', cookies)
        .send({
        "name": "TourForn702",
        "duration": 10,
        "description": "Could be",
        "maxGroupSize": 10,
        "summary": "Test tour",
        "difficulty": "easy",
        "price": 100,
        "rating": 4.8,
        "imageCover": "tour-3-cover.jpg",
        "ratingsAverage": 4.9,
        "guides": [],
        "startDates": ["2024-04-04"],
        "startLocation": {
         "type": "Point",
         "coordinates": [-74.005974, 40.712776]
         },
        "locations": {
         "type": "Point",
         "coordinates": [-74.005974, 40.712776]
        }
        })
        .then(res=>{
            console.log(res.body, 'create tour response')
            expect(res.status).toBe(201);
            expect(res.body.data.name).toBe('TourForn702')
        })
    })
})