import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CustomerController } from '@app/modules/customer/controllers/customer.controller';
import { CustomerService } from '@app/modules/customer/services/customer.service';
import {
  mockCustomerReq,
  mockPutCustomerReq,
  mockDeleteCustomerRes,
  mockGetCustomerRes,
} from '../mocks/customer-mock';
import { Customer } from '@app/modules/customer/models/customer.model';
import { Address } from '@app/modules/address/models/address.model';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;

  let loggerInfo: jest.SpyInstance;
  let loggerError: jest.SpyInstance;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [CustomerController],
      providers: [
        CustomerService,
        {
          provide: getModelToken(Customer),
          useValue: {},
        },
        {
          provide: getModelToken(Address),
          useValue: {},
        },
      ],
    }).compile();

    customerController = moduleRef.get(CustomerController);
    customerService = moduleRef.get(CustomerService);

    loggerInfo = jest.spyOn(Logger.prototype, 'log').mockImplementation();
    loggerError = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  describe('getCustomer', () => {
    it('should return success', async () => {
      jest
        .spyOn(customerService, 'getCustomer')
        .mockResolvedValue(mockGetCustomerRes);

      expect(await customerController.getCustomer(mockCustomerReq)).toBe(
        mockGetCustomerRes,
      );
      expect(loggerInfo).toHaveBeenCalledWith('getCustomer()');
    });

    it('should throw an error', async () => {
      jest.spyOn(customerService, 'getCustomer').mockImplementationOnce(() => {
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
      });

      await expect(
        customerController.getCustomer(mockCustomerReq),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('putCustomer', () => {
    it('should return success', async () => {
      jest
        .spyOn(customerService, 'putCustomer')
        .mockResolvedValue(mockGetCustomerRes);

      expect(
        await customerController.putCustomer(
          mockPutCustomerReq,
          mockCustomerReq,
        ),
      ).toBe(mockGetCustomerRes);
      expect(loggerInfo).toHaveBeenCalledWith('putCustomer()');
    });

    it('should throw an error', async () => {
      jest.spyOn(customerService, 'putCustomer').mockImplementationOnce(() => {
        throw new HttpException('putCustomer', HttpStatus.BAD_REQUEST);
      });

      await expect(
        customerController.putCustomer(mockPutCustomerReq, mockCustomerReq),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('deleteCustomer', () => {
    it('should return success', async () => {
      jest
        .spyOn(customerService, 'deleteCustomer')
        .mockResolvedValue(mockDeleteCustomerRes);

      expect(await customerController.deleteCustomer(mockCustomerReq)).toBe(
        mockDeleteCustomerRes,
      );
      expect(loggerInfo).toHaveBeenCalledWith('deleteCustomer()');
    });

    it('should throw an error', async () => {
      jest
        .spyOn(customerService, 'deleteCustomer')
        .mockImplementationOnce(() => {
          throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
        });

      await expect(
        customerController.deleteCustomer(mockCustomerReq),
      ).rejects.toThrow(HttpException);
      expect(loggerError).toBeCalledTimes(1);
    });
  });
});
