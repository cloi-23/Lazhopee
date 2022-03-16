import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryModule } from '../../src/delivery/delivery.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
    
    describe('Delivery (e2e)', () => {
      const delivery  = {
        orderId:'dawdwadaw',
        driverId:'adwadwa',
        status:'dawdawdwa'
      }
      let app: INestApplication;
      let params = { id: 'dawdadwdwa'}
    
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [DeliveryModule,
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
              .post('/delivery')
              .send(delivery)
              .expect(HttpStatus.CREATED).then(({ body }) => {
                params = {
                  id:body._id
                }
              })
          })              
          it('findOne [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/delivery/${params.id}`)
            .expect(HttpStatus.OK)
          })
    
          it('update [PATCH /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .patch(`/delivery/${params.id}`)
            .send({status:'Shipping'})
            .expect(HttpStatus.OK)
          })
    
        describe( 'failed', () => {   
          it('findOne [GET /] object if not exist status will be 404 not found', () => {
            try {
              return request(app.getHttpServer())
                .get('/delivery/1')
                .send(delivery)
              } catch (error) {
                expect(error.status).toEqual(404)
                expect(error.message).toEqual(`Delivery not exist!`)
              }
          })
          describe('delete', () => {
            it(' [DELETE /] delivery it should 200 ok', () => {
              return request(app.getHttpServer())
              .delete(`/delivery/${params.id}`)
              .expect(HttpStatus.OK)
            })
          })
       })    
    })
      afterAll(async () => {
        await app.close()
      })
    })
    
