import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
export abstract class AbstractService {
  constructor(protected readonly repository: Repository<any>) {}

  async save(options) {
    return this.repository.save(options);
  }

  async find(options) {
    return await this.repository.find(options);
  }

  async findOne(options) {
    const obj = await this.repository.findOne(options);
    if (!obj) {
      throw new NotFoundException();
    }
    return obj;
  }

  async update(id: number, options) {
    return await this.repository.update(id, options);
  }

  async delete(id: number) {
    const obj = await this.repository.findOne(id);

    if (!obj) {
      throw new NotFoundException();
    }
    await this.repository.delete(id);
  }
}
