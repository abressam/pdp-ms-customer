import { DeleteCustomerResDto } from '@app/modules/customer/dtos/responses/delete-customer-res.dto';
import { GetCustomerResDto } from '@app/modules/customer/dtos/responses/get-customer-res.dto';
import { PutCustomerReqDto } from '@app/modules/customer/dtos/requests/put-customer-req.dto';

export interface CustomerControllerInterface {
  getCustomer(req: Request): Promise<GetCustomerResDto>;
  putCustomer(
    body: PutCustomerReqDto,
    req: Request,
  ): Promise<GetCustomerResDto>;
  deleteCustomer(req: Request): Promise<DeleteCustomerResDto>;
}
