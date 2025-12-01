import { getUser, signUp } from "../../helper/user";
import { faker } from "@faker-js/faker";


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
  name: faker.lorem.words(2),

  duration: faker.datatype.number({ min: 5, max: 14 }),
  description: faker.lorem.sentence(),
  maxGroupSize: faker.datatype.number({ min: 5, max: 25 }),
  summary: faker.lorem.words(3),
  difficulty: faker.helpers.arrayElement(['easy', 'medium', 'difficult']),

  price: faker.datatype.number({ min: 50, max: 500 }),
  rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
  imageCover: faker.image.imageUrl(), // вместо faker.image.url()
  ratingsAverage: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),

  guides: [],
  startDates: [faker.date.soon().toISOString().slice(0, 10)],

  startLocation: {
    type: 'Point',
    coordinates: [
      parseFloat(faker.address.longitude()),
      parseFloat(faker.address.latitude()),
    ],
  },

  locations: {
    type: 'Point',
    coordinates: [
      parseFloat(faker.address.longitude()),
      parseFloat(faker.address.latitude()),
    ],
  },
})


  .then(res => {
      console.log(res.body, 'create tour response');
      expect(res.status).toBe(201);
      expect(typeof res.body.data.name).toBe('string');
  });

    })
})