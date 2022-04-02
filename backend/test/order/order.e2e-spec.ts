import { ProductModule } from './../../src/product/product.module';
import { CustomerModule } from './../../src/customer/customer.module';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderModule } from '../../src/order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { CreateOrderDto } from '../../src/order/dto/create-order.dto';
import { ManagerModule } from '../../src/manager/manager.module';
import { faker } from '@faker-js/faker'
import { CreateProductDto } from 'src/product/dto/create-product.dto';
    
    describe('Order (e2e)', () => {

      const product  = {
        name:faker.commerce.product(),
        storeId: faker.datatype.uuid(),
        category:faker.commerce.productAdjective(),
        image:faker.image.avatar(),
        description:faker.commerce.productDescription(),
        sellingPrice:Number(faker.commerce.price(100, 1000) )
      }

      const customer  = {
        name:faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
        contact:faker.phone.phoneNumber('!## ### #####!'),
        address:faker.address.streetAddress(),
        username: `customerorder${faker.datatype.number(100)}`,
        password: 'pass',
        email:faker.internet.email(),
        status:'Active',
      }

      const manager  = {
        name:faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
        contact:faker.phone.phoneNumber('!## ### #####!'),
        username: `ordermanager${faker.datatype.number(100)}`,
        password: 'pass'
      }

    
      let params = { id: null }
      let app: INestApplication;
      let user = { id: null}
      let customerId = null
      let productId ={ id: null, sellingPrice:null}
      let token = null

  
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [OrderModule,CustomerModule,ProductModule,
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
       it('Create sample customer for customer login', async() => {
        await request(app.getHttpServer())
       .post('/customer')
       .send(customer)
       .expect(HttpStatus.CREATED)
    })

    it('login [POST /] object it should 201 created then get a JWT', async() => {                
      const res = await request(app.getHttpServer())
      .post('/customer/login')
      .send({
        username: customer.username,
        password: customer.password
      })
      .expect(HttpStatus.CREATED)
      .then(({body}) => {
       customerId=body.id
       })
    
  })
        it('login [POST /] object it should get token', async() => {
          const res = await request(app.getHttpServer())
          .post('/manager/login')
          .send({
            username: manager.username,
            password:manager.password
          })
          .expect(HttpStatus.CREATED)
          token = res.body.access_token
        }) 
           
        it('Create sample product for productId', () => {
          return request(app.getHttpServer())
          .post('/product/add')
          .set('Authorization', 'Bearer ' + token)
          .send(product as CreateProductDto)
          .expect(HttpStatus.CREATED).then(({ body }) => 
          productId = { 
            id: body._id,
            sellingPrice: body.sellingPrice
          })
      })
          it('Create Post [POST /]', () => {
            const order  = {
              customerId: customerId,
              articles:[{
                productId:productId.id,
                sellingPrice:productId.sellingPrice,
                quantity:Number(faker.datatype.number(100)),
                remark:faker.commerce.productAdjective()
              }],
              status:'Pending',
            }
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
       
          it('findAll [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/order`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)   
          })
          it('findOne [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/order/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })
   
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
      afterAll(async () => {
        await app.close()
      })
    })
    
