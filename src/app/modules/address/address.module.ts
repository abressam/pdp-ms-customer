import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from '@app/modules/address/models/address.model';

@Module({
  imports: [SequelizeModule.forFeature([Address])],
})
export class AddressModule {}
