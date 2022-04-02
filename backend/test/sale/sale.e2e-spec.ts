import { ProductModule } from './../../src/product/product.module';
import { CustomerModule } from './../../src/customer/customer.module';
import { OrderModule } from './../../src/order/order.module';
import { SaleModule } from './../../src/sale/sale.module';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { ManagerModule } from '../../src/manager/manager.module';
import { faker } from '@faker-js/faker'
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

    
    describe('store (e2e)', () => {
      const manager  = {
        name:faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
        contact:faker.phone.phoneNumber('!## ### #####!'),
        username: `salemanager${faker.datatype.number(100)}`,
        password: 'pass'
      }
      
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
        username:  `salecustomer${faker.datatype.number(100)}`,
        password: 'pass',
        email:faker.internet.email(),
        status:'Active',
      }
      const startDate = '01/31/2021'
      const endDate = '01/31/2023'

      let params = { id: null }
      let app: INestApplication;
      let user = { id: null}
      let customerId = null
      let productId ={ id: null, sellingPrice:null}
      let token = null
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [SaleModule,OrderModule,CustomerModule,ProductModule,
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
        it('Create sample product for productId', () => {
            return request(app.getHttpServer())
            .post('/product/add')
            .set('Authorization', 'Bearer ' + token)
            .send(product as CreateProductDto)
            .expect(HttpStatus.CREATED).then(({ body }) => 
            {
            productId = { 
              id: body._id,
              sellingPrice: body.sellingPrice
            }
          }
            )
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
        it('Create Post [POST /]', () => {
            const order  = {
              customerId: customerId,
              articles:[{
                productId:productId.id,
                sellingPrice:productId.sellingPrice,
                quantity:Number(faker.datatype.number(100)),
                remark:faker.commerce.productAdjective()
              }],
              status: 'Success',
              date:new Date() 
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

          it('findAll Order [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/order`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)  
          })

          it('findAll Daily Sale [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/sale/daily/?startDate=${startDate}&endDate=${endDate}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK) 
          })
          it('findAll Monthly Sale [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/sale/monthly/?startDate=${startDate}&endDate=${endDate}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })

          it('findAll Yearly Sale [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/sale/yearly/?startDate=${startDate}&endDate=${endDate}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })

          it('findAll Product Sale [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/sale/product/?startDate=2022-03-01&endDate=2022-04-31`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })
      })    
    
      describe('failed', () => {
        it('Daily Sale should [GET /] status will be 404 Not Found if query is not date format', () => {
          return request(app.getHttpServer())
          .get(`/sale/daily/?startDate=01/31/2022&endDate=ASDA`)
          .set('Authorization', 'Bearer ' + token)
          .expect(HttpStatus.NOT_FOUND)
           
        })
        it('Monthly Sale should [GET /] status will be 404 Not Found if query is not date format', () => {
          return request(app.getHttpServer())
          .get(`/sale/monthly/?startDate=sadas`)
          .set('Authorization', 'Bearer ' + token)
          .expect(HttpStatus.NOT_FOUND)
        
        })

        it('Yearly Sale should [GET /] status will be 404 Not Found if query is not date format', () => {
          return request(app.getHttpServer())
          .get(`/sale/yearly/?startDate=123322&endDate=ASDA`)
          .set('Authorization', 'Bearer ' + token)
          .expect(HttpStatus.NOT_FOUND)  
        })

        it('Product Sale should [GET /] status will be 404 Not Found if query is not date format', () => {
          return request(app.getHttpServer())
          .get(`/sale/yearly/?startDate=123322&endDate=ASDA`)
          .set('Authorization', 'Bearer ' + token)
          .expect(HttpStatus.NOT_FOUND)  
        })
    })

      afterAll(async () => {
        await app.close()
      })
    })
    

