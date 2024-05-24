import { CustomerServiceInterface } from '@app/modules/customer/services/customer.service.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeleteCustomerResDto } from '@app/modules/customer/dtos/responses/delete-customer-res.dto';
import { GetCustomerResDto } from '@app/modules/customer/dtos/responses/get-customer-res.dto';
import { PutCustomerReqDto } from '@app/modules/customer/dtos/requests/put-customer-req.dto';
import { Customer } from '@app/modules/customer/models/customer.model';
import { Address } from '@app/modules/address/models/address.model';

@Injectable()
export class CustomerService implements CustomerServiceInterface {
  constructor(
    @InjectModel(Address)
    private addressModel: typeof Address,
    @InjectModel(Customer)
    private customerModel: typeof Customer,
  ) {}

  async getCustomer(userId: number): Promise<GetCustomerResDto> {
    const customer = await this.customerModel.findByPk(userId);
    this.validateCustomer(customer);

    const address = await this.addressModel.findByPk(customer.fk_Address_id);
    this.validateAddress(address);

    return {
      customer: {
        cpf: customer.cpf,
        phone: customer.phone,
        zipcode: address.zipcode,
        city: address.city,
        complement: address.complement,
        street: address.street,
        number: address.number,
        neighbourhood: address.neighbourhood,
        state: address.state,
      },
    };
  }

  async putCustomer(
    userId: number,
    body: PutCustomerReqDto,
  ): Promise<GetCustomerResDto> {
    const customerOld = await this.customerModel.findByPk(userId);

    let customerNew: Customer;
    let addressNew: Address;

    if (customerOld) {
      const addressOld = await this.addressModel.findByPk(
        customerOld.fk_Address_id,
      );

      customerNew = Object.assign({}, customerOld.dataValues, body);
      addressNew = Object.assign({}, addressOld.dataValues, body);

      await this.customerModel.update(
        {
          cpf: customerNew.cpf,
          phone: customerNew.phone,
        },
        {
          where: {
            id: userId,
          },
        },
      );

      await this.addressModel.update(
        {
          zipcode: addressNew.zipcode,
          city: addressNew.city,
          complement: addressNew.complement,
          street: addressNew.street,
          number: addressNew.number,
          neighbourhood: addressNew.neighbourhood,
          state: addressNew.state,
        },
        {
          where: {
            id: customerOld.fk_Address_id,
          },
        },
      );
    } else {
      this.validateInsert(body);

      addressNew = await this.addressModel.create({
        zipcode: body.zipcode,
        city: body.city,
        complement: body.complement,
        street: body.street,
        number: body.number,
        neighbourhood: body.neighbourhood,
        state: body.state,
      });

      customerNew = await this.customerModel.create({
        id: userId,
        cpf: body.cpf,
        phone: body.phone,
        fk_Address_id: addressNew.id,
      });
    }

    return {
      customer: {
        cpf: customerNew.cpf,
        phone: customerNew.phone,
        zipcode: addressNew.zipcode,
        city: addressNew.city,
        complement: addressNew.complement,
        street: addressNew.street,
        number: addressNew.number,
        neighbourhood: addressNew.neighbourhood,
        state: addressNew.state,
      },
    };
  }

  async deleteCustomer(userId: number): Promise<DeleteCustomerResDto> {
    const customer = await this.customerModel.findByPk(userId);
    const address = await this.addressModel.findByPk(customer.fk_Address_id);

    this.validateCustomer(customer);
    this.validateAddress(address);

    await customer.destroy();
    await address.destroy();

    return {
      statusCode: 200,
      message: 'Customer successfully deleted',
    };
  }

  private validateInsert(body: PutCustomerReqDto) {
    const emptyFields = Object.keys(body).length !== 9;

    if (emptyFields) {
      throw new HttpException(
        'Cannot insert empty fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateCustomer(customer: Customer) {
    if (!customer) {
      throw new HttpException('No customer found', HttpStatus.NOT_FOUND);
    }
  }

  private validateAddress(address: Address) {
    if (!address) {
      throw new HttpException('No address found', HttpStatus.NOT_FOUND);
    }
  }
}
