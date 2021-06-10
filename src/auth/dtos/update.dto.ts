import { IsEmail, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  first_name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
