import { Test, TestingModule } from '@nestjs/testing';
import { OrderModule } from '../../src/order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CreateOrderDto } from '../../src/order/dto/create-order.dto';
import { ManagerModule } from '../../src/manager/manager.module';
    
    describe('Order (e2e)', () => {
      const order  = {
        customerId: 'dawdwadwa',
        articles:[{productId:'dawwaddwa',sellingPrice:23,quantity:2,remark:'asdawdwa'}],
        status:'wdsadaw'
      }
      const manager  = {
        name:'dawdwaas1',
        contact:'312321',
        username: 'dwadwadwas1',
        password: 'dawdwad'
      }
      let params = { id: null }
      let app: INestApplication;
      let user = { id: null}
      let token = null
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [OrderModule,
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
        it('Create sample user for login', async() => {
           await request(app.getHttpServer())
          .post('/manager')
          .send(manager)
          .expect(HttpStatus.CREATED).then(({ body }) => 
          user = { id: body._id})
       })
  
        it('login [POST /] object it should get token', async() => {
          const res = await request(app.getHttpServer())
          .post('/manager/login')
          .send({
            username: 'dwadwadwas1',
            password: 'dawdwad'
          })
          .expect(HttpStatus.CREATED)
          token = res.body.access_token
        })    
          it('Create Post [POST /]', () => {
              return request(app.getHttpServer())
              .post('/order')
              .send(order as CreateOrderDto)
              .set('Authorization', 'Bearer ' + token)
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
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })

    
        describe( 'failed', () => {
          it('findOne [GET /] object if not exist status will be 404 not found', () => {
               request(app.getHttpServer())
                .get('/order/1')
                .set('Authorization', 'Bearer ' + token)
                .expect(HttpStatus.NOT_FOUND)
          })
  
          it('findOne [GET /] status will be 401 unauthorized', () => {
            request(app.getHttpServer())
             .get('/order/1')
             .expect(HttpStatus.UNAUTHORIZED)
          })

          it(' [DELETE /] order it should 200 ok', () => {
            return request(app.getHttpServer())
            .delete(`/order/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })

          it(' [DELETE /] manager it should 200 ok', () => {
            return request(app.getHttpServer())
            .delete(`/manager/${user.id}`)
        })
      })    
    })
      afterAll(async () => {
        await app.close()
      })
    })
    
