import { Test, TestingModule } from '@nestjs/testing';
import { DriverModule } from '../../src/driver/driver.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CreateDriverDto } from '../../src/driver/dto/create-driver.dto';

describe('Driver (e2e)', () => {
  const driver  = {
    name:'dawdwaas',
    address:'dawdwdwad',
    contact:'312321',
    username: 'dwadwadwass',
    password: 'dawdwad',
    device: 'adawwa',
    photo: 'dwadawda'
  }
  let app: INestApplication;
  let params = { id: null}
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DriverModule,
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
      it('Create Post [POST /] if no duplicate status 201 created', () => {
          return request(app.getHttpServer())
          .post('/driver/add')
          .send(driver as CreateDriverDto)
          .expect(HttpStatus.CREATED).then(({ body }) => 
          params = { id: body['_id']})
      })

      it('login [POST /] object it should 201 created', () => {
          return request(app.getHttpServer())
          .post('/driver/login')
          .send({
            username: 'dwadwadwass',
            password: 'dawdwad',
          })
          .expect(HttpStatus.CREATED)
      })
        
      it('findOne [GET /] object it should 200 ok', () => {
        return request(app.getHttpServer())
        .get(`/driver/${params.id}`)
        .expect(HttpStatus.OK)
      })

      it('findAll [GET /] object it should 200 ok', () => {
        return request(app.getHttpServer())
        .get(`/driver/`)
        .expect(HttpStatus.OK)
      })

      it('update [PATCH /] object it should 200 ok', () => {
        return request(app.getHttpServer())
        .patch(`/driver/${params.id}`)
        .send({ name:'updated-test' })
        .expect(HttpStatus.OK)
      })

    describe( 'failed', () => {
      it('Create Post [POST /] checking duplicate status 409 conflict', () => {
        try {
          return request(app.getHttpServer())
            .post('/driver')
            .send(driver as CreateDriverDto)
            
          } catch (error) {
            expect(error.status).toEqual(409)
            expect(error.message).toEqual(`Driver username already exist!`)
           }
      })

      it('findOne [GET /] object if not exist status will be 404 not found', () => {
        try {
          return request(app.getHttpServer())
            .get('/driver/1')
            .send(driver as CreateDriverDto)
            
          } catch (error) {
            expect(error.status).toEqual(404)
            expect(error.message).toEqual(`Driver not exist!`)
           }
      })

      it('login [POST /] object it should 401 unauthorized', () => {
        return request(app.getHttpServer())
        .post('/driver/login')
        .send({
          username: 'dwadwadwas',
          password: 'dawdwads'
        })
        .expect(HttpStatus.UNAUTHORIZED)
    })
    describe('delete', () => {
      it(' [DELETE /] driver it should 200 ok', () => {
        return request(app.getHttpServer())
        .delete(`/driver/${params.id}`)
        .expect(HttpStatus.OK)
      })
    })
  })    
})

  afterAll(async () => {
    await app.close()
  })
})
