import { Test, TestingModule } from '@nestjs/testing';
import { CustomerModule } from '../../src/customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CreateCustomerDto } from '../../src/customer/dto/create-customer.dto';

describe('Customer (e2e)', () => {
  const customer  = {
    name:'dawdwaas1',
    address:'dawdwdwad',
    contact:'312321',
    username: 'dwadwadwas1',
    password: 'dawdwad'
  }
  let params = { id: null }
  let app: INestApplication;
  let token = null
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule,
        MongooseModule.forRoot('mongodb://localhost:27019/TestLazhopee'),
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
          .expect(HttpStatus.CREATED).then(({body}) => {
            params = {
              id:body._id,}
          })
      })
      it('login [POST /] object it should 201 created then get a JWT', async() => {                
          const res = await request(app.getHttpServer())
          .post('/customer/login')
          .send({
            username: 'dwadwadwas1',
            password: 'dawdwad'
          })
          .expect(HttpStatus.CREATED)

           token = res.body.access_token;
      })
        
      it('findOne [GET /] object it should 200 ok', () => {
        return request(app.getHttpServer())
        .get(`/customer/${params.id}`)
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
        .patch(`/customer/${params.id}`)
        .send({name:'updated-test'})
        .expect(HttpStatus.OK)
      })

    describe( 'failed', () => {
      it('Create Post [POST /] if username exist status 409 conflict', () => {
        return request(app.getHttpServer())
        .post('/customer')
        .send(customer as CreateCustomerDto)
        .expect(HttpStatus.CONFLICT)
        })

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
        .send({
          username: 'sadaw',
          password: 'sadaw'
        })
        .expect(HttpStatus.UNAUTHORIZED)
    })

    describe('delete',()=>{
      it(' [DELETE /] customer it should 200 ok', () => {
        return request(app.getHttpServer())
        .delete(`/customer/${params.id}`)
        .expect(HttpStatus.OK)
      })
    })
   })    
})

  afterAll(async () => {
    await app.close()
  })
})
