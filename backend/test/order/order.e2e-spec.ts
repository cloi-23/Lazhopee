import { Test, TestingModule } from '@nestjs/testing';
import { OrderModule } from '../../src/order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CreateOrderDto } from '../../src/order/dto/create-order.dto';
    
    describe('Order (e2e)', () => {
      const order  = {
        customerId: 'dawdwadwa',
        articles:[{productId:'dawwaddwa',sellingPrice:23,quantity:2,remark:'asdawdwa'}],
        status:'wdsadaw'
      }
      let params = { id: null }
      let app: INestApplication;
    
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [OrderModule,
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
          it('Create Post [POST /]', () => {
              return request(app.getHttpServer())
              .post('/order')
              .send(order as CreateOrderDto)
              .expect(HttpStatus.CREATED)        
              .then(({body}) => {
                params = {
                  id:body._id,
                }
              })  
          })
            
          it('findOne [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/order/${params.id}`)
            .expect(HttpStatus.OK)
          })

    
        describe( 'failed', () => {
    
          it('findOne [GET /] object if not exist status will be 404 not found', () => {
            try {
              return request(app.getHttpServer())
                .get('/order/1')
                .send(order)
              } catch (error) {
                expect(error.status).toEqual(404)
                expect(error.message).toEqual(`Order not exist!`)
              }
          })

          it(' [DELETE /] order it should 200 ok', () => {
            return request(app.getHttpServer())
            .delete(`/order/${params.id}`)
            .expect(HttpStatus.OK)
          })
      })    
    })
      afterAll(async () => {
        await app.close()
      })
    })
    
