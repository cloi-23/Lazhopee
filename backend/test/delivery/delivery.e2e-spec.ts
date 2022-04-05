import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryModule } from '../../src/delivery/delivery.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CreateManagerDto } from '../../src/manager/dto/create-manager.dto';
import request from 'supertest';
import { ManagerModule } from '../../src/manager/manager.module';
import { faker } from '@faker-js/faker'

    describe('Delivery (e2e)', () => {
      const manager  = {
        name:faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
        contact:faker.phone.phoneNumber('!## ### #####!'),
        username: `deliverymanager${faker.datatype.number(100)}`,
        password: 'pass'
      }
      const delivery  = {
        orderId:faker.datatype.uuid(),
        driverId:faker.datatype.uuid(),
      }
      let app: INestApplication;
      let params = { id: null}
      let user = { id: null}
      let token = null
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [DeliveryModule,
            ManagerModule,
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
        it('Create sample user for login', () => {
          return request(app.getHttpServer())
          .post('/manager')
          .send(manager as CreateManagerDto)
          .expect(HttpStatus.CREATED).then(({ body }) => 
          user = { id: body._id})
      })
  
        it('login [POST /] object it should get token', async() => {
          const res = await request(app.getHttpServer())
          .post('/manager/login')
          .send({
            username: manager.username,
            password: manager.password
          })
          .expect(HttpStatus.CREATED)
          token = res.body.access_token
      })  
        
          it('Create Post [POST /] should get status 201 created', async () => {
              await request(app.getHttpServer())
              .post('/delivery')
              .send(delivery)
              .set('Authorization', 'Bearer ' + token)
              .expect(HttpStatus.CREATED).then(({ body }) => {
                params = {
                  id:body._id
                }
              })
          })              
          it('findOne [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/delivery/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })
    
          it('update [PATCH /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .patch(`/delivery/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .send({status:'Shipping'})
            .expect(HttpStatus.OK)
          })
          
      it(' [DELETE /] delivery it should 200 ok', () => {
        return request(app.getHttpServer())
        .delete(`/delivery/${params.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(HttpStatus.OK)
      })
        it(' [DELETE /] manager it should 200 ok', () => {
          return request(app.getHttpServer())
          .delete(`/manager/${user.id}`)
      })
    
        describe( 'failed unauthorized', () => {   
          it('findOne [GET /] status will be 401 unauthorized', () => {
               request(app.getHttpServer())
                .get('/delivery/1')
                .expect(HttpStatus.UNAUTHORIZED)
          })

          it('findOne [GET /] object if not exist status will be 404 not found', () => {
            try {
              return request(app.getHttpServer())
                .get('/delivery/1')
                .set('Authorization', 'Bearer ' + token)
              } catch (error) {
                expect(error.status).toEqual(404)
                expect(error.message).toEqual(`Delivery not exist!`)
              }
          })  
        })  
    })

    describe( 'Drop All Record', () => {

      it(' [DELETE /] delivery it should 200 ok', () => {
        return request(app.getHttpServer())
        .delete(`/delivery/${params.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(HttpStatus.OK)
      })
        it(' [DELETE /] manager it should 200 ok', () => {
          return request(app.getHttpServer())
          .delete(`/manager/${user.id}`)
      })
    })   
     
      afterAll(async () => {
        await app.close()
      })
    })
    
