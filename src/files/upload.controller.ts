import {
  BadRequestException,
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UploadErrorDto } from './dto/upload-error.dto';
import { UploadService } from './upload.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { AuthGuard } from '@auth/guard/auth.guard';

@ApiTags('Media')
@Controller('photo')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post(':uuid')
  @UseGuards(AuthGuard)
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
  @ApiResponse({ status: 413, type: UploadErrorDto })
  @ApiOkResponse({
    status: 200,
    description: 'Get the user data with photo uploaded',
    type: CreateUserDto,
  })
  async uploadFile(
    @Param('uuid') uuid: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    if (!file) {
      throw new BadRequestException('You must upload a file.');
    }
    return await this.uploadService.update(uuid, file.originalname);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'uuid',
    description: 'Add the User UUID',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get the user data without photo deleted',
    type: CreateUserDto,
  })
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return await this.uploadService.remove(uuid);
  }
}
