import { IsNotEmpty, IsPositive, MaxLength, MinLength } from "class-validator";

export class ProductCreateDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  title: string;

  @IsNotEmpty()
  @MaxLength(1024)
  description: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;
}
