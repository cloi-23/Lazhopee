import { UpdateCustomerDto } from './../../src/customer/dto/update-customer.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerModule } from '../../src/customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';


import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CreateCustomerDto } from '../../src/customer/dto/create-customer.dto';
import { faker } from '@faker-js/faker'
describe('Customer (e2e)', () => {
  let customer  = {
    name:faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    contact:faker.phone.phoneNumber('!## ### #####!'),
    address:faker.address.streetAddress(),
    username: `customer${faker.datatype.number(100)}`,
    password: 'pass',
    email:faker.internet.email(),
    status:'Active',
  }
  const updateCustomer  = {
    username: faker.internet.userName(),
    password: faker.internet.password()
  }
  let customerId = null 
  let app: INestApplication;
  let token = null
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule,
        MongooseModule.forRoot('mongodb://localhost:27017/TestLazhopee'),
        ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
          whitelist:true,
          transform: true,
          forbidNonWhitelisted:true,
          transformOptions:{
            enableImplicitConversion:true
          }
        })
      )
    await app.init();
  });
  describe('success', () => {
      it('Create Post [POST /] if no duplicate status 201 created', async () => {
          return request(app.getHttpServer())
          .post('/customer')
          .send(customer as CreateCustomerDto)
          .expect(HttpStatus.CREATED)
      })
      it('login [POST /] object it should 201 created then get a JWT', async() => {                
          const res = await request(app.getHttpServer())
          .post('/customer/login')
          .send({
            username: customer.username,
            password: customer.password
          })
          .expect(HttpStatus.CREATED)
          .then(({body}) => {
           token = body.access_token;
           customerId=body.id
           })
        
      })
        
      it('findOne [GET /] object it should 200 ok', () => {
       
        
        return request(app.getHttpServer())
        .get(`/customer/${customerId}`)
        .expect(HttpStatus.OK)
      })

      it('findAll [GET /] object it should 200 ok', () => {
        return request(app.getHttpServer())
        .get(`/customer`)
        .set('Authorization', 'Bearer ' + token)
        .expect(HttpStatus.OK)
      })

      it('update [PATCH /] object it should 200 ok', () => {
        return request(app.getHttpServer())
        .patch(`/customer/${customerId}`)
        .send({name:'updated-test'})
        .expect(HttpStatus.OK)
      })
      it(' [DELETE /] customer it should 200 ok', () => {
        return request(app.getHttpServer())
        .delete(`/customer/${customerId}`)
        .expect(HttpStatus.OK)
      })
     
})

describe( 'failed', () => {

  it('findOne [GET /] object if not exist status will be 404 not found', () => {
    try {
      return request(app.getHttpServer())
        .get('/customer/1')
        .send(customer as CreateCustomerDto)
        } catch (error) {
        expect(error.status).toEqual(404)
        expect(error.message).toEqual(`Customer not exist!`)
       }
  })

  it('login [POST /] object it should 401 unauthorized', () => {
    return request(app.getHttpServer())
    .post('/customer/login')
    .send(updateCustomer)
    .expect(HttpStatus.UNAUTHORIZED)
})

})    

  afterAll(async () => {
    await app.close()
  })
})
