import { UpdateProductDto } from './../../src/product/dto/update-product-dto';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductModule } from '../../src/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CreateProductDto } from '../../src/product/dto/create-product.dto';
import { ManagerModule } from '../../src/manager/manager.module';
import { faker } from '@faker-js/faker'
    
    describe('Product (e2e)', () => {
      const product  = {
        name:faker.commerce.product(),
        storeId: faker.datatype.uuid(),
        category:faker.commerce.productAdjective(),
        image:faker.image.avatar(),
        description:faker.commerce.productDescription(),
        sellingPrice:Number(faker.commerce.price(100, 1000) )
      }
      const manager  = {
        name:faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
        contact:faker.phone.phoneNumber('!## ### #####!'),
        username: `productmanager${faker.datatype.number(100)}`,
        password: 'pass'
      }
      const updateProduct  = {
        name:faker.commerce.product(),
        description:faker.commerce.productDescription(),
        sellingPrice:Number(faker.commerce.price(100, 1000) )
      }
      
      let app: INestApplication;
      let params = { id: null }
      let user = { id: null}
      let token = null
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [ProductModule,
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
         .expect(HttpStatus.CREATED).then(({ body }) => {
         user = { id: body._id}
        })
         
         
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
          it('Create Post [POST /] if no duplicate status 201 created', () => {
              return request(app.getHttpServer())
              .post('/product/add')
              .set('Authorization', 'Bearer ' + token)
              .send(product as CreateProductDto)
              .expect(HttpStatus.CREATED).then(({ body }) => 
              params = { id: body['_id']})
          })
            
          it('findOne [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/product/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })
    
          it('update [PATCH /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .patch(`/product/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .send(updateProduct as UpdateProductDto)
            .expect(HttpStatus.OK)
          })
          it(' [DELETE /] product it should 200 ok', () => {
            return request(app.getHttpServer())
            .delete(`/product/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })

          it(' [DELETE /] manager it should 200 ok', () => {
            return request(app.getHttpServer())
            .delete(`/manager/${user.id}`)
        })
          
        })
      describe( 'failed', () => {
          it('Create Post [POST /] checking duplicate status 409 conflict', () => {
               request(app.getHttpServer())
                .post('/product/add')
                .set('Authorization', 'Bearer ' + token)
                .send(product as CreateProductDto)
                .expect(HttpStatus.CONFLICT)
          })

          it('Create Post [POST /] status will be 401 unauthorized', () => {
            request(app.getHttpServer())
             .post('/product/add')
             .send(product as CreateProductDto)
             .expect(HttpStatus.UNAUTHORIZED)
       })

    
          it('findOne [GET /] status will be 401 unauthorized', () => {
              return request(app.getHttpServer())
                .get('/product/1')
                .expect(HttpStatus.UNAUTHORIZED)
                 })

          it('findOne [GET /] if productId is not exist status will be 404 not found', () => {
               return request(app.getHttpServer())
                .get('/product/1')
                .set('Authorization', 'Bearer ' + token)
                .expect(HttpStatus.NOT_FOUND)
                 })

          it('update [PATCH /]  if productId is not exist status will be 404 not found', () => {
                  return request(app.getHttpServer())
                  .patch(`/product/2`)
                  .set('Authorization', 'Bearer ' + token)
                  .send(updateProduct as UpdateProductDto)
                  .expect(HttpStatus.NOT_FOUND)
             })   
          it('update [PATCH /] status will be 401 unauthorized', () => {
              return request(app.getHttpServer())
              .patch(`/product/2`)
              .send(updateProduct as UpdateProductDto)
              .expect(HttpStatus.UNAUTHORIZED)
         })   
         
         it(' [DELETE /]  if productId is not exist status will be 404 not found', () => {
          return request(app.getHttpServer())
          .delete(`/product/1`)
          .set('Authorization', 'Bearer ' + token)
          .expect(HttpStatus.NOT_FOUND)
        })
        it(' [DELETE /]  status will be 401 unauthorized', () => {
          return request(app.getHttpServer())
          .delete(`/product/1`)
          .expect(HttpStatus.UNAUTHORIZED)
        })
     
      }) 
      afterAll(async () => {
        await app.close()
      })
    })
    
