import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getCurrentEnv(): string {
    const dbUser = this.configService.get<string>('DB_NAME');
    console.log('Test Env: ', dbUser);
    return dbUser;
  }
}
