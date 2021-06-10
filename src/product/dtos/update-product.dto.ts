import { IsPositive, MaxLength, MinLength, IsOptional } from 'class-validator';

export class ProductUpdateDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(128)
  title?: string;

  @IsOptional()
  @MaxLength(1024)
  description?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsPositive()
  price?: number;
}
