import { ApiProperty } from '@nestjs/swagger';

export class UploadErrorDto {
  @ApiProperty({
    example: 413,
  })
  statusCode: number;

  @ApiProperty({
    example: '00:00:00',
  })
  timestamp: string;

  @ApiProperty({
    example: '/path-to-file.ext',
  })
  path: string;

  @ApiProperty({
    example: 'File too large',
  })
  message: string;
}
