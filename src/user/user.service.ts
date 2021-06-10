import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async save(options) {
    console.info('New Regitered user!');
    return this.userRepository.save(options);
  }

  async findOne(options) {
    return await this.userRepository.findOne(options);
  }

  async update(id, options) {
    return await this.userRepository.update(id, options);
  }
}
