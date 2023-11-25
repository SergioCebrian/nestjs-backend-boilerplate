import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginSuccessDto {
  @ApiResponseProperty({
    example: 'da9b9f51-23b8-4642-97f7-52537b3cf53b',
    format: 'v4',
  })
  public uuid: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'eyJhbGciOkpXVCJ9.eyJlbWIjoiOjE3MDA2Mz',
  })
  @IsNotEmpty()
  access_token: string;

  @ApiProperty({
    example: 'eyLqyGpeEkpXRCJ7.eyVlbMIjoiOjA7MDA4Jc',
  })
  @IsNotEmpty()
  refresh_token: string;
}
