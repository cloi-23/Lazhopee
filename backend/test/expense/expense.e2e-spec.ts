import { UpdateExpenseDto } from './../../src/expense/dto/update-expense.dto';
import { ExpenseModule } from './../../src/expense/expense.module';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { ManagerModule } from '../../src/manager/manager.module';
import { faker } from '@faker-js/faker'
import { CreateExpenseDto } from '../../src/expense/dto/create-expense.dto';
    
    describe('expense (e2e)', () => {
      const expense  = {
        name:faker.company.companyName(),
        date: new Date(),
        cost:Number(faker.commerce.price(1000, 10000))
      }
      const manager  = {
        name:faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
        contact:faker.phone.phoneNumber('!## ### #####!'),
        username: `expensemanager${faker.datatype.number(100)}`,
        password: 'pass'
      }
      const updateexpense  = {
        name:faker.company.companyName() ,
        cost:Number(faker.commerce.price(1000, 10000)),
      }
      
      let app: INestApplication;
      let params = { id: null }
      let user = { id: null}
      let token = null
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [ExpenseModule,
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
              .post('/expense/add')
              .set('Authorization', 'Bearer ' + token)
              .send(expense as CreateExpenseDto)
              .expect(HttpStatus.CREATED)
              .then(({ body }) => 
              params = { id: body['_id']})
          })
          it('findAll [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/expense`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })
            
          it('findOne [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/expense/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })
    
          it('update [PATCH /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .patch(`/expense/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .send(updateexpense as UpdateExpenseDto)
            .expect(HttpStatus.OK)
          })
          it(' [DELETE /] expense it should 200 ok', () => {
            return request(app.getHttpServer())
            .delete(`/expense/${params.id}`)
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
                .post('/expense/add')
                .set('Authorization', 'Bearer ' + token)
                .send(expense as CreateExpenseDto)
          })

          it('Create Post [POST /] status will be 401 unauthorized', () => {
            request(app.getHttpServer())
             .post('/expense/add')
             .send(expense as CreateExpenseDto)
             .expect(HttpStatus.UNAUTHORIZED)
       })

    
          it('findOne [GET /] status will be 401 unauthorized', () => {
              return request(app.getHttpServer())
                .get('/expense/1')
                .expect(HttpStatus.UNAUTHORIZED)
                 })

          it('findOne [GET /] if expenseId is not exist status will be 404 not found', () => {
               return request(app.getHttpServer())
                .get('/expense/1')
                .set('Authorization', 'Bearer ' + token)
                .expect(HttpStatus.NOT_FOUND)
                 })

          it('update [PATCH /]  if expenseId is not exist status will be 404 not found', () => {
                  return request(app.getHttpServer())
                  .patch(`/expense/2`)
                  .set('Authorization', 'Bearer ' + token)
                  .send(updateexpense as UpdateExpenseDto)
                  .expect(HttpStatus.NOT_FOUND)
             })   
          it('update [PATCH /] status will be 401 unauthorized', () => {
              return request(app.getHttpServer())
              .patch(`/expense/2`)
              .send(updateexpense as UpdateExpenseDto)
              .expect(HttpStatus.UNAUTHORIZED)
         })   
         
         it(' [DELETE /]  if expenseId is not exist status will be 404 not found', () => {
          return request(app.getHttpServer())
          .delete(`/expense/1`)
          .set('Authorization', 'Bearer ' + token)
          .expect(HttpStatus.NOT_FOUND)
        })
        it(' [DELETE /]  status will be 401 unauthorized', () => {
          return request(app.getHttpServer())
          .delete(`/expense/1`)
          .expect(HttpStatus.UNAUTHORIZED)
        })
     
      }) 
      afterAll(async () => {
        await app.close()
      })
    })
    
