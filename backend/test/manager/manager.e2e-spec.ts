import { Test, TestingModule } from '@nestjs/testing';
import { ManagerModule } from '../../src/manager/manager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CreateManagerDto } from '../../src/manager/dto/create-manager.dto';
import { faker } from '@faker-js/faker'

describe('Manager (e2e)', () => {
  const manager  = {
    name:faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    contact:faker.phone.phoneNumber('!## ### #####!'),
    username: `manager${faker.datatype.number(100)}`,
    password: 'pass'
  }
  let app: INestApplication;
  let params = { id: null }
  let token = null
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ManagerModule,
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
          .post('/manager')
          .send(manager as CreateManagerDto)
          .expect(HttpStatus.CREATED).then(({ body }) => 
          params = { id: body._id})
      })

      it('login [POST /] object it should 201 created', async() => {
          const res = await request(app.getHttpServer())
          .post('/manager/login')
          .send({
            username: manager.username,
            password:manager.password
          })
          .expect(HttpStatus.CREATED)
          token = res.body.access_token
      })
        
      it('findOne [GET /] object it should 200 ok', () => {
        return request(app.getHttpServer())
        .get(`/manager/${params.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(HttpStatus.OK)
      })

      it('findAll [GET /] object it should 200 ok', () => {
        return request(app.getHttpServer())
        .get(`/manager/`)
        .expect(HttpStatus.OK)
      })

      it('update [PATCH /] object it should 200 ok', () => {
        return request(app.getHttpServer())
        .patch(`/manager/${params.id}`)
        .send({name:'updated-test'})
        .expect(HttpStatus.OK)
      })

    describe( 'failed', () => {
      it('Create Post [POST /] if no duplicate status 201 created', () => {
        return request(app.getHttpServer())
        .post('/manager')
        .send(manager as CreateManagerDto)
        .expect(HttpStatus.CONFLICT)
    })

      it('findOne [GET /] object if not exist status will be 404 not found', () => {
        try {
          return request(app.getHttpServer())
            .get('/manager/1')
            .send(manager as CreateManagerDto)
          } catch (error) {
            expect(error.status).toEqual(404)
            expect(error.message).toEqual(`Manager not exist!`)
           }
      })

      it('login [POST /] object it should 401 unauthorized', () => {
        return request(app.getHttpServer())
        .post('/manager/login')
        .send({
          username: 'sadaw',
          password: 'sadaw'
        })
        .expect(HttpStatus.UNAUTHORIZED)
      })

    })    
})
describe( 'Drop All Record', () => {
  it(' [DELETE /] manager it should 200 ok', () => {
    return request(app.getHttpServer())
    .delete(`/manager/${params.id}`)
    .expect(HttpStatus.OK)
  })
}) 
  afterAll(async () => {
    await app.close()
  })
})
