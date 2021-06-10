import { IsDecimal, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @Column()
  title: string;

  @IsNotEmpty()
  @Column()
  description: string;

  @Column()
  image: string;

  @IsNotEmpty()
  @Column()
  @IsDecimal()
  price: number;
}
