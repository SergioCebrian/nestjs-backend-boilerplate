import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@users/users.service';
import { LoginDto } from '../dto/login.dto';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Email is wrong.');
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong.');
    }

    const payload = { email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.generateRefreshToken(payload);

    return {
      access_token,
      refresh_token,
      email,
      uuid: user.uuid,
    };
  }

  private async generateRefreshToken(user: any): Promise<string> {
    const payload = { email: user.email, role: user.role };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
