import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      limits: {
        fileSize: 1000000,
      },
    }),
  ],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
