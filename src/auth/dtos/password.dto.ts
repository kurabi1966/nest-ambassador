import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { Match } from './match.decorator';

export class PasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Match('password', { message: 'Password confirm should match Password' })
  password_confirm: string;
}
