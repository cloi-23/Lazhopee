import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';
import { Driver } from './entities/drivers.entity';
import { Model } from 'mongoose'

type MockRepository<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;
describe('DriverService', () => {
  let service: DriverService;
  let driverModel: MockRepository<Driver>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverService,
        {
          provide:getModelToken(Driver.name), useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
     
    }).compile();

    service = module.get<DriverService>(DriverService);
    driverModel = module.get<MockRepository>(getModelToken(Driver.name))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('driver model shoud be defined', () => {
    expect(driverModel).toBeDefined()
  })

  describe('create user', () => {
    it('should create a new driver with encoded password', async() => {
      await service.create({
        username: 'aaa',
        password: 'aaa',
        name:'dawdwa',
        address:'dawdwdwad',
        contact:'312321',
        device: 'dawdaw'
      })
    })
  })
});
