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
import { RoleEnum } from 'src/roles/role.enum';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    default: 'testName',
    description: 'Name of the user',
    minLength: 3,
  })
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
  })
  @IsString()
  @IsNotEmpty()
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
  premium: boolean = false;

  @ApiProperty({
    type: Number,
    default: 1,
    description:
      'Current level of the user (1 for beginner, 2 for intermediate, 3 for advanced)',
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
  })
  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  @IsEnum(RoleEnum, {
    message: 'Invalid role. Valid roles are: 1 for admin, 2 for user',
  })
  role: number;

  /*
  @ApiProperty({
    type: Number,
    default: 1,
    description:
      'Current level of the user (1 for beginner, 2 for intermediate, 3 for advanced)',
    enum: LevelConstants,
  })
  @IsNotEmpty()
  @IsInt()
  @IsIn(LevelConstants, { message: 'Current level must be 1, 2, or 3' })
  @IsNumber()
  level: number;

  @ApiProperty({
    type: Number,
    default: 4,
    description:
      'Current role of the user (1 for gold, 2 for silver, 3 for bronze, 4 for none)',
    enum: RoleConstants,
  })
  @IsNotEmpty()
  @IsInt()
  @IsIn(RoleConstants, { message: 'Current role must be 1, 2, 3 or 4' })
  @IsNumber()
  role: number;
  */
}
