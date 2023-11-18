import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto | any) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['uuid', 'name'],
      nullSort: 'last',
      defaultSortBy: [['uuid', 'DESC']],
      searchableColumns: ['email', 'name'],
      select: ['uuid', 'name'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        age: true,
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
      select: ['id', 'name', 'email', 'password'],
    });
  }
}
