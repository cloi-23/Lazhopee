import { Test, TestingModule } from '@nestjs/testing';
import { ProductModule } from '../../src/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CreateProductDto } from '../../src/product/dto/create-product.dto';
    
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
      let app: INestApplication;
      let params = { id: null }
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [ProductModule,
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
              .post('/product/add')
              .send(product as CreateProductDto)
              .expect(HttpStatus.CREATED).then(({ body }) => 
              params = { id: body['_id']})
          })
            
          it('findOne [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/product/${params.id}`)
            .expect(HttpStatus.OK)
          })
    
          it('update [PATCH /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .patch(`/product/${params.id}`)
            .send({name:'updated-test'})
            .expect(HttpStatus.OK)
          })
    
        describe( 'failed', () => {
          it('Create Post [POST /] checking duplicate status 409 conflict', () => {
            try {
              return request(app.getHttpServer())
                .post('/product/add')
                .send(product as CreateProductDto)
                
              } catch (error) {
                expect(error.status).toEqual(409)
                expect(error.message).toEqual(`Product username already exist!`)
               }
          })
    
          it('findOne [GET /] object if not exist status will be 404 not found', () => {
            try {
              return request(app.getHttpServer())
                .get('/product/1')
                .send(product as CreateProductDto)
              } catch (error) {
                expect(error.status).toEqual(404)
                expect(error.message).toEqual(`Product not exist!`)
               }
          })
          describe('delete', () => {
            it(' [DELETE /] product it should 200 ok', () => {
              return request(app.getHttpServer())
              .delete(`/product/${params.id}`)
              .expect(HttpStatus.OK)
            })
          })
        })    
      })
      afterAll(async () => {
        await app.close()
      })
    })
    
