import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @IsEmail()
  email: string;

  @IsNumber()
  @Type(() => Number)
  age: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  country?: string;
}
