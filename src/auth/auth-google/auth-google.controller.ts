import {
  Controller,
  Get,
  UseGuards,
  Request,
  Res,
  Req,
  UnauthorizedException,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

import { API_URL } from '@commons/config/api.config';
import { AuthGoogleService } from './auth-google.service';
import { CheckTokenExpiryGuard } from './auth-google.guard';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@ApiTags('Auth Google')
@Controller('auth-google')
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Request() req, @Res() res: Response) {
    const googleToken = req.user.accessToken;
    const googleRefreshToken = req.user.refreshToken;

    res.cookie('access_token', googleToken, { httpOnly: true });
    res.cookie('refresh_token', googleRefreshToken, {
      httpOnly: true,
    });

    res.redirect(`${API_URL}/auth/profile`);
  }

  @UseGuards(CheckTokenExpiryGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const accessToken = req.cookies['access_token'];
    if (accessToken) {
      return (await this.authGoogleService.getProfile(accessToken)).data;
    }
    throw new UnauthorizedException('No access token');
  }

  // https://blog.logrocket.com/implement-secure-single-sign-on-nestjs-google/
  @Post('/login')
  async login(@Body('token') token): Promise<void> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    // log the ticket payload in the console to see what we have
    console.log('Google Login: ', ticket.getPayload());
    // const userData = ticket.getPayload();
    // return await this.usersService.create(userData, 'google');
  }

  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    this.authGoogleService.revokeGoogleToken(refreshToken);
    res.redirect(`${API_URL}/`);
  }
}
