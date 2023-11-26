import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { User } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { LoginSuccessDto } from '../dto/login-success.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'Get the new user data',
    type: CreateUserDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User has been login successfully',
    type: LoginSuccessDto,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /*
  @Get('logout')
  logout(@Req() req: Request): void {
    this.authService.logout(req.user['sub']);
  }
  */

  /*
  @Get('profile')
  @Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveInterface) {
    console.log(user);
    return this.authService.profile(user);
  }
  */
}
