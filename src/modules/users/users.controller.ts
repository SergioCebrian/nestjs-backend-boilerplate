import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

import { PAGINATION_CONFIG } from '@commons/config/pagination.config';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User[]> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkPaginatedResponse(CreateUserDto, PAGINATION_CONFIG)
  @ApiPaginationQuery(PAGINATION_CONFIG)
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return await this.usersService.findAll(query);
  }

  @Get(':uuid')
  @ApiParam({
    name: 'uuid',
    description: 'Add the User UUID',
  })
  async findOne(@Param('uuid') uuid: string): Promise<User> {
    return await this.usersService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiParam({
    name: 'uuid',
    description: 'Add the User UUID',
  })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @ApiParam({
    name: 'uuid',
    description: 'Add the User UUID',
  })
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return await this.usersService.remove(uuid);
  }
}
