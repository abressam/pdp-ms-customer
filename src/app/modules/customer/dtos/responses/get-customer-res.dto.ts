import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { CustomerDto } from '@app/modules/customer/dtos/customer.dto';

export class GetCustomerResDto {
  @ApiProperty()
  @IsNotEmptyObject({ nullable: false })
  customer: CustomerDto;
}
