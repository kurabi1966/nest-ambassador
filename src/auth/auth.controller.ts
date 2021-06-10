import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from './auth.guard';
import { UpdateDto } from './dtos/update.dto';
import { PasswordDto } from './dtos/password.dto';


@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('admin/register')
  async register(@Body() body: RegisterDto) {
    const { password_confirm, ...data } = body;
    data.password = await bcrypt.hash(data.password, 12);

    return this.userService.save({ ...data, is_ambassador: false });
  }

  @Post('admin/login')
  async login(
    @Body() credential: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = credential;
    console.log(email, password);

    // find the user
    const user = await this.userService.findOne({ email });
    if (!user) {
      console.error(`User <${email}> not exist`);
      throw new BadRequestException('Incorrect Email or password');
    }

    // return jwt if the password is match
    if (!(await bcrypt.compare(password, user.password))) {
      console.error(`Password of the user <${email}> is not correct`);
      throw new BadRequestException('Incorrect Email or password');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'success',
    };
  }

  @UseGuards(AuthGuard)
  @Post('admin/logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'success' };
  }
  // to execlude the password when we serlize the use data to front-end. Note that we installed reflect-metadata & class-transformer

  @UseGuards(AuthGuard)
  @Get('admin/user')
  async user(@Req() request: Request) {
    const user = await this.userService.findOne(request.user); // request.user = { id: ???}. Added by the AuthGuard

    if (!user) {
      throw new ForbiddenException();
    }

    return user;
  }

  @UseGuards(AuthGuard)
  @Put('admin/users/info')
  async updateInfo(@Body() updateDto: UpdateDto, @Req() request: Request) {
    // expect to recive new first name and/or new last name and/or new email
    const user = await this.userService.findOne(request.user); // request.user = { id: ???}. Added by the AuthGuard

    if (!user) {
      throw new ForbiddenException();
    }

    await this.userService.update(user.id, updateDto);

    return await this.userService.findOne(request.user);
  }

  @UseGuards(AuthGuard)
  @Put('admin/users/password')
  async updatePassword(
    @Body() passwordDto: PasswordDto,
    @Req() request: Request,
  ) {
    // expect to recive new password and password_confirm
    const user = await this.userService.findOne(request.user); // request.user = { id: ???}. Added by the AuthGuard

    if (!user) {
      throw new ForbiddenException();
    }

    const password = await bcrypt.hash(passwordDto.password, 12);
    await this.userService.update(user.id, { password });

    return { message: 'success' };
  }
}
