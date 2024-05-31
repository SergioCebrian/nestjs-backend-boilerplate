import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from '@database/database.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth/auth.module';
import { UploadModule } from './files/upload.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, UploadModule, ThrottlerModule.forRoot([
    {
      ttl: 60000,
      limit: 10,
    },
  ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
