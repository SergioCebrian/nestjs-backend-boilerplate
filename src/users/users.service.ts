import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

import { encodePassword } from '@utils/bcrypt/bcrypt.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('User already exists.');
    }
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['name'],
      defaultSortBy: [['name', 'DESC']],
      searchableColumns: ['email', 'name'],
      select: ['uuid', 'name', 'email'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
    /*
    return this.userRepository.find({
      relations: {
        // role: true,
      },
    });
    */
  }

  findOne(uuid: FindOneOptions<User> | any): Promise<User> {
    return this.userRepository.findOne({ where: { uuid } });
  }

  update(uuid: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const updateUser = this.userRepository.create(updateUserDto);
    return this.userRepository.update({ uuid }, updateUser);
  }

  updatePassword(
    uuid: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UpdateResult> {
    const updateUser = this.userRepository.findOne({ where: { uuid } });
    if (!updateUser) {
      throw new BadRequestException('User doesn´t exists.');
    }
    const password = encodePassword(updatePasswordDto.password);
    return this.userRepository.update({ uuid }, { password });
  }

  async remove(uuid: FindOptionsWhere<User> | any): Promise<void> {
    await this.userRepository.delete({ uuid });
  }

  getByUsername(username: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: ['uuid', 'name', 'email', 'password'],
    });
  }
}
