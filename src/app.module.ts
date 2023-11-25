import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from '@database/database.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@auth/auth/auth.module';
import { AuthGoogleModule } from '@auth/auth-google/auth-google.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, AuthGoogleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
