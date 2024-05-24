import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from '@app/modules/address/models/address.model';
import { Customer } from '@app/modules/customer/models/customer.model';
import { CustomerService } from '@app/modules/customer/services/customer.service';
import { CustomerController } from '@app/modules/customer/controllers/customer.controller';

@Module({
  imports: [SequelizeModule.forFeature([Address, Customer])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
