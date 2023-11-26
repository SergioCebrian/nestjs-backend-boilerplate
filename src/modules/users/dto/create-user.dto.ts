import {
  IsBoolean,
  IsBooleanString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { RoleEnum } from '@roles/role.enum';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    default: 'testName',
    description: 'Name of the user',
    minLength: 3,
    required: true,
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Length(3, 20)
  name: string;

  @ApiProperty({ default: 'test@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

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

  @ApiProperty({
    type: String,
    default: 'es',
    description: 'Country of the user',
    minLength: 1,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2, { message: 'Country must have exactly 2 digits' })
  country: string;

  @ApiProperty({
    type: Boolean,
    description: 'Whether the user has premium status',
    default: false,
  })
  @IsBoolean()
  @IsBooleanString()
  premium: boolean;

  @ApiProperty({
    type: String,
    description: 'Photo of the user',
    default: null,
  })
  photo: string | null;

  @ApiProperty({
    type: Number,
    default: 1,
    description:
      'Current level of the user (1 for beginner, 2 for intermediate, 3 for advanced)',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  level: number;

  @ApiProperty({
    type: Number,
    default: 2,
    enum: RoleEnum,
    description: 'Current role of the user (1 for admin, 2 for user)',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  @IsEnum(RoleEnum, {
    message: 'Invalid role. Valid roles are: 1 for admin, 2 for user',
  })
  role: number;
}
