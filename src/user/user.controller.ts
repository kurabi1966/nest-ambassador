import { ClassSerializerInterceptor } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';

import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admin/ambassador')
  ambassadors() {
    return this.userService.find({ is_ambassador: true });
  }
}
