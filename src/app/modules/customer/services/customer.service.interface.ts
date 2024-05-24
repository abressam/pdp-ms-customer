import { DeleteCustomerResDto } from '@app/modules/customer/dtos/responses/delete-customer-res.dto';
import { GetCustomerResDto } from '@app/modules/customer/dtos/responses/get-customer-res.dto';
import { PutCustomerReqDto } from '@app/modules/customer/dtos/requests/put-customer-req.dto';

export interface CustomerServiceInterface {
  getCustomer(userId: number): Promise<GetCustomerResDto>;
  putCustomer(
    userId: number,
    body: PutCustomerReqDto,
  ): Promise<GetCustomerResDto>;
  deleteCustomer(userId: number): Promise<DeleteCustomerResDto>;
}
