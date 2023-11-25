import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

import { PAGINATION_CONFIG } from '@commons/config/pagination.config';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@auth/guard/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkPaginatedResponse(CreateUserDto, PAGINATION_CONFIG)
  @ApiPaginationQuery(PAGINATION_CONFIG)
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return await this.usersService.findAll(query);
  }

  @Get(':uuid')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'uuid',
    description: 'Add the User UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'Get the user data',
    type: CreateUserDto,
  })
  async findOne(@Param('uuid') uuid: string): Promise<User> {
    return await this.usersService.findOne(uuid);
  }

  @Patch(':uuid')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'uuid',
    description: 'Add the User UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'Get the updated user data',
    type: CreateUserDto,
  })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'uuid',
    description: 'Add the User UUID',
  })
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return await this.usersService.remove(uuid);
  }
}
