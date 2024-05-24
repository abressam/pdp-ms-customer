import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class PutCustomerReqDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  cpf?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  zipcode?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  number?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  neighbourhood?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  state?: string;
}
