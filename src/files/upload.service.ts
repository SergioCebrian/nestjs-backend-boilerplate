import { Injectable } from '@nestjs/common';
//import { InjectRepository } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
//import { User } from '@modules/users/entities/user.entity';

@Injectable()
export class UploadService {
  constructor() {}
  /*
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  */

  async update(uuid: string, file: Express.Multer.File): Promise<any> {
    console.log(uuid, file);
    /*
    const photo = await this.userRepository.findOne({ where: { uuid } });
    if (!photo) {
      return 'Foto no encontrada';
    }

    // Actualizar el campo 'photo' con los nuevos datos
    photo.photo = file;

    // Guardar los cambios en la base de datos
    await this.userRepository.save(photo);
    return 'Foto actualizada correctamente';
    */
  }
}
