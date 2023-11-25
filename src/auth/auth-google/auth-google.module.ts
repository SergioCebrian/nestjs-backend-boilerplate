import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthGoogleService } from './auth-google.service';
import { GoogleStrategy } from './google.strategy';
import { AuthGoogleController } from './auth-google.controller';

@Module({
  imports: [PassportModule],
  providers: [AuthGoogleService, GoogleStrategy],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
