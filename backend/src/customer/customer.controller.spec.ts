import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService,
        {
          provide:getModelToken('Customer'),useValue: createMockRepository()
        },
      ],
     
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    controller = module.get<CustomerController>(getModelToken('Customer'))
  });

  describe('findAll', () => {
    it('should return an array of customer', async () => {
      const result = ['test'];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toBe(result);
    });
  });
});