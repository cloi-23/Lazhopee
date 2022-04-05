import { CreateExpenseDto } from './../../src/expense/dto/create-expense.dto';
import { IncomeStatementModule } from './../../src/income-statement/income-statement.module';
import { ExpenseModule } from './../../src/expense/expense.module';
import { PurchaseModule } from './../../src/purchase/purchase.module';
import { OrderModule } from './../../src/order/order.module';
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
      const expense  = {
        name:faker.company.companyName(),
        date: new Date(),
        cost:Number(faker.commerce.price(1000, 10000))
      }
      const startDate = '01/31/2021'
      const endDate = '01/31/2023'

      let expenseId = null
      let purchaseId = null
      let app: INestApplication;
      let user = { id: null}
      let token = null
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [IncomeStatementModule,OrderModule,PurchaseModule,ExpenseModule,
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
        it('Create sample expense ', () => {
            return request(app.getHttpServer())
            .post('/expense/add')
            .set('Authorization', 'Bearer ' + token)
            .send(expense as CreateExpenseDto)
            .expect(HttpStatus.CREATED)
            .then(({body})=>{
              expenseId = body._id
            })
        })
        it('Create sample purchase', async() => {
            await request(app.getHttpServer())
           .post('/purchase/add')
           .set('Authorization', 'Bearer ' + token)
           .send(purchase)
           .expect(HttpStatus.CREATED)
           .then(({body})=>{
            purchaseId = body._id
          })
        })


          it('findAll [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/incomeStatement/?startDate=${startDate}&endDate=${endDate}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK) 
          })
     
      })    
    
      describe('failed', () => {
        it('findAll [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/incomeStatement/?startDate=1222&endDate=12`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK) 
          })
      
    })
    describe( 'Drop All Record', () => {

   
      it(' [DELETE /] expense it should 200 ok', () => {
        return request(app.getHttpServer())
        .delete(`/expense/${expenseId}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(HttpStatus.OK)
      })
        it(' [DELETE /] purchase it should 200 ok', () => {
          return request(app.getHttpServer())
          .delete(`/manager/${purchaseId}`)
      })
    }) 

      afterAll(async () => {
        await app.close()
      })
    })
    

