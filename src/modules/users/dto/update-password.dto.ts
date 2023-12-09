import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdatePasswordDto {
  @ApiProperty({
    type: String,
    default: 'Aa12345*',
    description: 'User password',
    minLength: 8,
    maxLength: 15,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(15, { message: 'Password cannot be longer than 15 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character',
    },
  )
  password: string;
}
