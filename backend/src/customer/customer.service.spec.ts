import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Model } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose';
import { Customer } from './entities/customer.entity';

type MockRepository<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T>  => ({
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('CustomerService', () => {
  let service: CustomerService;
  let customerModel:MockRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService,
        {
          provide:getModelToken(Customer.name), useValue: createMockRepository()
        },
      ],
     
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    customerModel = module.get<MockRepository>(getModelToken(Customer.name))
  });

  describe('FindOne', () => {
    //let service: CofeesService;
    describe('when customer with ID exists',()=>{
      it('should return the customer object', async () => {
         const customerId = "1"
         const expectOutput={}
  
         customerModel.findOne.mockReturnValue(expectOutput)
         const customer = await service.findOne(customerId)         
         expect(customer).toEqual(expectOutput)
      })
    })
    describe('otherwise',()=>{
      it('should throw the "HttpException" with status of 404',
        async () => {
        const customerId = "1"
        try {
          await service.findOne(customerId)
        } catch (error) {
          console.log(error.message);    
          expect(error.status).toEqual(404)
          expect(error.message).toEqual(`Customer #${customerId} not found`)
        }
      })
    })

    describe('Create', () => {
      //let service: CofeesService;
      describe('when customer user not exists',()=>{
        it('should return the customer object', async () => {

           const expectOutput={}
           const data = {
             name:'dawdwa',
             address:'dawdwdwad',
             contact:'312321',
             username: 'dwadwadwa',
             password: 'dawdwad'
           }
           const customer = await service.create(data)         
           expect(customer).toEqual(expectOutput)
        })
      })
      describe('otherwise',()=>{
        it('should throw the "HttpException" with status of 409',
          async () => {
            const data = {
              name:'dawdwa',
              address:'dawdwdwad',
              contact:'312321',
              username: 'dwadwadwa',
              password: 'dawdwad'
            }
          try {
            await service.create(data)
          } catch (error) {
            console.log(error.message);    
            expect(error.status).toEqual(409)
            expect(error.message).toEqual(`Customer username already exist!`)
          }
        })
      })
  });
});
});
