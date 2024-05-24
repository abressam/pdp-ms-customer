import { CustomerService } from '@app/modules/customer/services/customer.service';
import { CustomerControllerInterface } from '@app/modules/customer/controllers/customer.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { DeleteCustomerResDto } from '@app/modules/customer/dtos/responses/delete-customer-res.dto';
import { GetCustomerResDto } from '@app/modules/customer/dtos/responses/get-customer-res.dto';
import { PutCustomerReqDto } from '@app/modules/customer/dtos/requests/put-customer-req.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Put,
  Delete,
  Request,
  Body,
  HttpCode,
  HttpException,
  Logger,
} from '@nestjs/common';

@ApiTags('customer')
@Controller('customer')
export class CustomerController implements CustomerControllerInterface {
  constructor(private readonly customerService: CustomerService) {}

  @Get('info')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the customer data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the customer data',
    type: GetCustomerResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getCustomer(@Request() req: Request) {
    const logger = new Logger(CustomerController.name);

    try {
      const userId = req['userId'];
      logger.log('getCustomer()');
      return await this.customerService.getCustomer(userId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Put('insert')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Put the customer data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the customer data',
    type: GetCustomerResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async putCustomer(@Body() body: PutCustomerReqDto, @Request() req: Request) {
    const logger = new Logger(CustomerController.name);

    try {
      const userId = req['userId'];
      logger.log('putCustomer()');
      return await this.customerService.putCustomer(userId, body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Delete('remove')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Delete the customer data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the customer status',
    type: DeleteCustomerResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async deleteCustomer(@Request() req: Request) {
    const logger = new Logger(CustomerController.name);

    try {
      const userId = req['userId'];
      logger.log('deleteCustomer()');
      return await this.customerService.deleteCustomer(userId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
