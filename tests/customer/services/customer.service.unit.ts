import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { CustomerService } from '@app/modules/customer/services/customer.service';
import {
  mockAddress,
  mockCustomer,
  mockCustomerId,
  mockPutCustomerReq,
  mockDeleteCustomerRes,
  mockGetCustomerRes,
} from '../mocks/customer-mock';
import { Customer } from '@app/modules/customer/models/customer.model';
import { Address } from '@app/modules/address/models/address.model';

describe('CustomerService', () => {
  let customerService: CustomerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        CustomerService,
        {
          provide: getModelToken(Customer),
          useValue: {
            findByPk: jest.fn((customerId) => {
              return customerId
                ? customerId === 2
                  ? { fk_Address_id: null }
                  : mockCustomer
                : false;
            }),
            create: jest.fn(() => mockCustomer),
            update: jest.fn(),
          },
        },
        {
          provide: getModelToken(Address),
          useValue: {
            findByPk: jest.fn((addressId) => {
              return addressId ? mockAddress : false;
            }),
            create: jest.fn(() => mockAddress),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    customerService = moduleRef.get(CustomerService);
  });

  describe('getCustomer', () => {
    it('should return success', async () => {
      const customer = await customerService.getCustomer(mockCustomerId);

      expect(customer).toStrictEqual(mockGetCustomerRes);
    });

    it('should throw an invalid customer', async () => {
      await customerService.getCustomer(undefined).catch((error) => {
        expect(error.message).toBe('No customer found');
      });
    });

    it('should throw an invalid address', async () => {
      await customerService.getCustomer(2).catch((error) => {
        expect(error.message).toBe('No address found');
      });
    });
  });

  describe('putCustomer', () => {
    it('should return success - update', async () => {
      expect(
        await customerService.putCustomer(mockCustomerId, mockPutCustomerReq),
      ).toStrictEqual(mockGetCustomerRes);
    });

    it('should return success - create', async () => {
      expect(
        await customerService.putCustomer(undefined, mockPutCustomerReq),
      ).toStrictEqual(mockGetCustomerRes);
    });

    it('should throw an error', async () => {
      await customerService.putCustomer(undefined, [] as any).catch((error) => {
        expect(error.message).toBe('Cannot insert empty fields');
      });
    });
  });

  describe('deleteCustomer', () => {
    it('should return success', async () => {
      expect(
        await customerService.deleteCustomer(mockCustomerId),
      ).toStrictEqual(mockDeleteCustomerRes);
    });
  });
});
