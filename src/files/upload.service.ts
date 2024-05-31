import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async update(uuid: string, file: string): Promise<any> {
    console.log(uuid, file);
    const user = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      return 'User not found';
    }
    user.photo = file;
    await this.userRepository.save(user);
    return { user };
  }

  async remove(uuid: FindOptionsWhere<User> | any): Promise<any> {
    const user = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      return 'User not found';
    }
    user.photo = null;
    await this.userRepository.save(user);
    return { user };
  }
}
