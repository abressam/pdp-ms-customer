import { PutCustomerReqDto } from '@app/modules/customer/dtos/requests/put-customer-req.dto';
import { DeleteCustomerResDto } from '@app/modules/customer/dtos/responses/delete-customer-res.dto';
import { GetCustomerResDto } from '@app/modules/customer/dtos/responses/get-customer-res.dto';
import { Customer } from '@app/modules/customer/models/customer.model';
import { Address } from '@app/modules/address/models/address.model';

export const mockCustomerId = 1;
export const mockAddressId = 1;

export const mockCustomerReq = {
  userId: mockCustomerId,
} as Request | any;

export const mockPutCustomerReq = {
  cpf: '123456789',
  phone: '99999999999',
  zipcode: '12345',
  city: 'Test',
  complement: 'Test',
  street: 'Test',
  number: 123,
  neighbourhood: 'Test',
  state: 'Test',
} as PutCustomerReqDto;

export const mockDeleteCustomerRes = {
  statusCode: 200,
  message: 'Customer successfully deleted',
} as DeleteCustomerResDto;

export const mockGetCustomerRes = {
  customer: {
    cpf: '123456789',
    phone: '99999999999',
    zipcode: '12345',
    city: 'Test',
    complement: 'Test',
    street: 'Test',
    number: 123,
    neighbourhood: 'Test',
    state: 'Test',
  },
} as GetCustomerResDto | any;

export const mockCustomer = {
  id: mockCustomerId,
  cpf: '123456789',
  phone: '99999999999',
  fk_Address_id: mockAddressId,
  destroy: () => {},
} as Customer;

export const mockAddress = {
  id: mockAddressId,
  zipcode: '12345',
  city: 'Test',
  complement: 'Test',
  street: 'Test',
  number: 123,
  neighbourhood: 'Test',
  state: 'Test',
  destroy: () => {},
} as Address;
