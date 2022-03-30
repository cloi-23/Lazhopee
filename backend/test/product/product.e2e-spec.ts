import { Test, TestingModule } from '@nestjs/testing';
import { ProductModule } from '../../src/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CreateProductDto } from '../../src/product/dto/create-product.dto';
import { CreateManagerDto } from '../../src/manager/dto/create-manager.dto';
import { ManagerModule } from '../../src/manager/manager.module';
    
    describe('Product (e2e)', () => {
      const product  = {
        _id:'6231713578d90e97429eb917',
        name: 'prod2',
        storeId: '123 prod1 street',
        category:"category",
        image:"image.png",
        description:"this is description",
        sellingPrice:1000
      }
      const manager  = {
        name:'dawdwaas1',
        contact:'312321',
        username: 'dwadwadwas1',
        password: 'dawdwad'
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
            .send({name:'updated-test'})
            .expect(HttpStatus.OK)
          })
    
        describe( 'failed', () => {
          it('Create Post [POST /] checking duplicate status 409 conflict', () => {
               request(app.getHttpServer())
                .post('/product/add')
                .set('Authorization', 'Bearer ' + token)
                .send(product as CreateProductDto)
          })

          it('Create Post [POST /] checking duplicate status 409 conflict', () => {
            request(app.getHttpServer())
             .post('/product/add')
             .set('Authorization', 'Bearer ' + token)
             .send(product as CreateProductDto)
       })
    
          it('findOne [GET /] status will be 401 unauthorized', () => {
              return request(app.getHttpServer())
                .get('/product/1')
                .expect(HttpStatus.UNAUTHORIZED)
                 })

          it('findOne [GET /] object if not exist status will be 404 not found', () => {
               return request(app.getHttpServer())
                .get('/product/1')
                .set('Authorization', 'Bearer ' + token)
                .expect(HttpStatus.NOT_FOUND)
                 })

          describe('delete', () => {
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
        })    
      })
      afterAll(async () => {
        await app.close()
      })
    })
    
