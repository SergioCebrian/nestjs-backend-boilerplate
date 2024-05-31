import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserSuccessDto {
  @ApiProperty({
    type: String,
    default: '550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsString()
  uuid: string;
}
