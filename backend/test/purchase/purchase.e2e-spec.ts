import { UpdatePurchaseDto } from './../../src/purchase/dto/update-purchase.dto';
import { CreatePurchaseDto } from './../../src/purchase/dto/create-purchase.dto';
import { PurchaseModule } from './../../src/purchase/purchase.module';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { ManagerModule } from '../../src/manager/manager.module';
import { faker } from '@faker-js/faker'
    
    describe('purchase (e2e)', () => {
      const purchase  = {
        dateOfPurchase:new Date(),
        storeId:faker.datatype.uuid(),
        totalAmount:Number(faker.commerce.price(1000, 10000)),
        articles:[{
            productId:faker.datatype.uuid(),
            unitCost:Number(faker.commerce.price(100, 1000)),
            quantity:Number(faker.datatype.number(100))
        }]
      }
      const manager  = {
        name:faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
        contact:faker.phone.phoneNumber('!## ### #####!'),
        username: `purchasemanager${faker.datatype.number(100)}`,
        password: 'pass'
      }
      const updatPurchase  = {
        storeId:faker.datatype.uuid(), 
      }
   
      
      let params = { id: null }
      let app: INestApplication;
      let user = { id: null}
      let token = null
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [PurchaseModule,
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
          //login manager
        it('Create sample user for login', async() => {
           await request(app.getHttpServer())
          .post('/manager')
          .send(manager)
          .expect(HttpStatus.CREATED).then(({ body }) => 
          user = { id: body._id})
       })
        //create token
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
        //add purchase with  token
          it('Create Post [POST /]', () => {
              return request(app.getHttpServer())
              .post('/purchase/add')
              .send(purchase as CreatePurchaseDto)
              .set('Authorization', 'Bearer ' + token)
              .expect(HttpStatus.CREATED)        
              .then(({body}) => {
                params = {
                  id:body._id,
                }
              })  
          })
        //find purchase with  token 
          it('findOne [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/purchase/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })

          it('update [PATCH /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .patch(`/purchase/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .send(updatPurchase as UpdatePurchaseDto)
            .expect(HttpStatus.OK)
          })

        })


        describe( 'failed', () => {
          it('Create Post [POST /] checking duplicate status 409 conflict', () => {
            request(app.getHttpServer())
             .post('/purchase/add')
             .set('Authorization', 'Bearer ' + token)
             .send(purchase as CreatePurchaseDto)
           })

          it('findOne [GET /] object if not exist status will be 404 not found', () => {
               request(app.getHttpServer())
                .get('/purchase/1')
                .set('Authorization', 'Bearer ' + token)
                .expect(HttpStatus.NOT_FOUND)
          })
  
          it('findOne [GET /] status will be 401 unauthorized', () => {
            request(app.getHttpServer())
             .get('/purchase/1')
             .expect(HttpStatus.UNAUTHORIZED)
          })
          it('update [PATCH /]  if productId is not exist status will be 404 not found', () => {
            return request(app.getHttpServer())
            .patch(`/purchase/2`)
            .set('Authorization', 'Bearer ' + token)
            .send(updatPurchase as UpdatePurchaseDto)
            .expect(HttpStatus.NOT_FOUND)
            })   

          it('update [PATCH /] status will be 401 unauthorized', () => {
              return request(app.getHttpServer())
              .patch(`/purchase/2`)
              .send(updatPurchase as UpdatePurchaseDto)
              .expect(HttpStatus.UNAUTHORIZED)
             })   
        
          it(' [DELETE /]  if productId is not exist status will be 404 not found', () => {
            return request(app.getHttpServer())
            .delete(`/purchase/1`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.NOT_FOUND)
          })
          it(' [DELETE /]  status will be 401 unauthorized', () => {
            return request(app.getHttpServer())
            .delete(`/purchase/1`)
            .expect(HttpStatus.UNAUTHORIZED)
          })
            
      })    
    
      describe( 'Drop All Record', () => {
        it(' [DELETE /] purchase it should 200 ok', () => {
          return request(app.getHttpServer())
          .delete(`/purchase/${params.id}`)
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
    

