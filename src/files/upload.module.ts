import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      dest: './uploads',
      limits: {
        fileSize: 1000000,
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
