import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  @Post()
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('You must upload a file.');
    }
    /*
    const allowedExtensions = ['.jpg', '.png', '.pdf'];
    const fileExtension = extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException('The file must be JPG, PNG o PDF.');
    }
    */
    console.log(file);
    return 'File has been uploaded successfully.';
  }
}
