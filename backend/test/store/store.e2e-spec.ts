import { StoreModule } from './../../src/store/store.module';
import { CreateStoreDto } from '../../src/store/dto/create-store.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { ManagerModule } from '../../src/manager/manager.module';
import { faker } from '@faker-js/faker'
import { UpdateStoreDto } from 'src/store/dto/update-store.dto';
    
    describe('store (e2e)', () => {
      const store  = {
        name: faker.company.companyName(),
        contact:faker.phone.phoneNumber('!## ### #####!'),
        address:faker.address.streetAddress(),
        image:faker.image.avatar()
      }
      const manager  = {
        name:faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
        contact:faker.phone.phoneNumber('!## ### #####!'),
        username: `storemanager${faker.datatype.number(100)}`,
        password: 'pass'
      }

      const updateStore  = {
        name: faker.company.companyName(),
        contact:faker.phone.phoneNumber('!## ### #####!'),
      }
      let params = { id: null }
      let app: INestApplication;
      let user = { id: null}
      let token = null
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [StoreModule,
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
        //add store with  token
          it('Create Post [POST /]', () => {
              return request(app.getHttpServer())
              .post('/store/add')
              .send(store as CreateStoreDto)
              .set('Authorization', 'Bearer ' + token)
              .expect(HttpStatus.CREATED)        
              .then(({body}) => {
                params = {
                  id:body._id,
                }
              })  
          })
        //find store with  token 
          it('findOne [GET /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .get(`/store/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK)
          })

          it('update [PATCH /] object it should 200 ok', () => {
            return request(app.getHttpServer())
            .patch(`/store/${params.id}`)
            .set('Authorization', 'Bearer ' + token)
            .send(updateStore as UpdateStoreDto)
            .expect(HttpStatus.OK)
          })
          it(' [DELETE /] store it should 200 ok', () => {
            return request(app.getHttpServer())
            .delete(`/store/${params.id}`)
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
             .post('/store/add')
             .set('Authorization', 'Bearer ' + token)
             .send(store as CreateStoreDto)
           })

          it('findOne [GET /] object if not exist status will be 404 not found', () => {
               request(app.getHttpServer())
                .get('/store/1')
                .set('Authorization', 'Bearer ' + token)
                .expect(HttpStatus.NOT_FOUND)
          })
  
          it('findOne [GET /] status will be 401 unauthorized', () => {
            request(app.getHttpServer())
             .get('/store/1')
             .expect(HttpStatus.UNAUTHORIZED)
          })
          it('update [PATCH /]  if productId is not exist status will be 404 not found', () => {
            return request(app.getHttpServer())
            .patch(`/store/2`)
            .set('Authorization', 'Bearer ' + token)
            .send(updateStore as UpdateStoreDto)
            .expect(HttpStatus.NOT_FOUND)
            })   

          it('update [PATCH /] status will be 401 unauthorized', () => {
              return request(app.getHttpServer())
              .patch(`/store/2`)
              .send(updateStore as UpdateStoreDto)
              .expect(HttpStatus.UNAUTHORIZED)
             })   
        
          it(' [DELETE /]  if productId is not exist status will be 404 not found', () => {
            return request(app.getHttpServer())
            .delete(`/store/1`)
            .set('Authorization', 'Bearer ' + token)
            .expect(HttpStatus.NOT_FOUND)
          })
          it(' [DELETE /]  status will be 401 unauthorized', () => {
            return request(app.getHttpServer())
            .delete(`/store/1`)
            .expect(HttpStatus.UNAUTHORIZED)
          })
              

        
      })    
    
      afterAll(async () => {
        await app.close()
      })
    })
    

