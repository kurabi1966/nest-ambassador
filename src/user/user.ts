import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  // to execlude the password when we serlize the use data to front-end. Note that we installed reflect-metadata & class-transformer
  @Exclude()
  @Column()
  password: string;

  @Column({ default: true })
  is_ambassador: boolean;
}
